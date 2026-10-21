import { useEffect, useRef, useState } from "react";

const BASE = 21480.25;
const rand = (a, b) => a + Math.random() * (b - a);

function seedCandles(n, start, scale) {
  let price = start;
  let mom = 0;
  const out = [];
  for (let i = 0; i < n; i++) {
    const o = price;
    mom = mom * 0.85 + rand(-1.5, 1.5);
    const c = o + mom * 2 * scale + rand(-8, 8) * scale;
    out.push({
      o,
      h: Math.max(o, c) + rand(1, 9) * scale,
      l: Math.min(o, c) - rand(1, 9) * scale,
      c,
      v: rand(40, 160),
      t: Date.now() - (n - i) * 10000,
    });
    price = c;
  }
  return out;
}

/**
 * LiveChart
 *
 * Normal mode  (backdrop=false, default):
 *   Renders inside whatever container wraps it — use for inline chart panels.
 *
 * Backdrop mode (backdrop=true):
 *   Renders a full-viewport fixed canvas behind all page content.
 *   The canvas automatically reseeds when `seed` (price) changes.
 */
export default function LiveChart({
  symbol = "MNQ1!",
  seed = BASE,
  hideHeader = false,
  backdrop = false,
}) {
  const scale = seed / BASE;

  const canvasRef = useRef(null);
  const candles = useRef(null);
  const momentum = useRef(0);
  const hoverRef = useRef(null);
  const scaleRef = useRef(scale);
  const [quote, setQuote] = useState({ price: seed, dir: 0 });

  // Re-seed when the symbol/price changes
  useEffect(() => {
    scaleRef.current = seed / BASE;
    candles.current = seedCandles(80, seed, scaleRef.current);
    momentum.current = 0;
    setQuote({ price: seed, dir: 0 });
  }, [seed]);

  // Ensure initial seed on mount
  if (!candles.current) {
    candles.current = seedCandles(80, seed, scale);
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    let w, h;
    if (backdrop) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
    }
    if (!w || !h) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (backdrop) {
      // Vibrant dark gradient base keeping the chart punchy and clear
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(14,17,22,0.90)");
      grad.addColorStop(0.5, "rgba(14,17,22,0.72)");
      grad.addColorStop(1, "rgba(14,17,22,0.92)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    const rawArr = candles.current;
    if (!rawArr || rawArr.length === 0) return;

    // Responsive candle count: on phones (<480px), show ~28 candles so each candle has generous width and spacing
    const isMobile = w < 640;
    const isSmallMobile = w < 480;
    const visibleCount = isSmallMobile ? 28 : (isMobile ? 38 : (w < 1024 ? 54 : 80));
    const arr = rawArr.slice(-visibleCount);

    let min = Infinity, max = -Infinity, maxV = 0;
    arr.forEach((c) => {
      min = Math.min(min, c.l);
      max = Math.max(max, c.h);
      maxV = Math.max(maxV, c.v);
    });
    const pad = (max - min) * 0.15 || 1;
    min -= pad;
    max += pad;

    // Layout — price scale on right, time axis on bottom
    const priceScaleW = isMobile ? 54 : (backdrop ? 72 : 68);
    const timeAxisH  = backdrop ? 28 : 24;
    const volH       = isMobile ? 55 : (backdrop ? 75 : 60);

    const left   = backdrop ? 0 : 8;
    const right  = w - priceScaleW;
    const top    = backdrop ? 32 : 20;
    const bottom = h - timeAxisH - volH;
    const volTop    = h - timeAxisH - volH;
    const volBottom = h - timeAxisH;

    const y = (v) => bottom - ((v - min) / (max - min)) * (bottom - top);
    const cw = (right - left) / arr.length;

    ctx.font = isSmallMobile
      ? "9px 'JetBrains Mono', monospace"
      : (isMobile
        ? "10px 'JetBrains Mono', monospace"
        : (backdrop ? "11px 'JetBrains Mono', 'Courier New', monospace" : "10px 'JetBrains Mono', monospace"));

    // ── Horizontal grid + price scale ──────────────────────────────────────
    const gridLines = isMobile ? 4 : (backdrop ? 6 : 4);
    for (let i = 0; i <= gridLines; i++) {
      const gy = Math.round(top + ((bottom - top) * i) / gridLines) + 0.5;
      ctx.strokeStyle = backdrop ? "rgba(45,50,59,0.45)" : "rgba(45,50,59,0.7)";
      ctx.lineWidth = 1;
      ctx.setLineDash(backdrop ? [4, 6] : []);
      ctx.beginPath();
      ctx.moveTo(left, gy);
      ctx.lineTo(right, gy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = backdrop ? "rgba(125,133,147,0.6)" : "#7d8593";
      const val = max - ((max - min) * i) / gridLines;
      ctx.fillText(val.toFixed(isMobile ? 1 : 2), right + (isMobile ? 4 : 8), gy + 3);
    }

    // ── Vertical grid + time axis ───────────────────────────────────────────
    const step = isSmallMobile ? 5 : (isMobile ? 6 : (backdrop ? 6 : 8));
    for (let i = 0; i < arr.length; i += step) {
      const x = Math.round(left + cw * i + cw / 2) + 0.5;
      ctx.strokeStyle = backdrop ? "rgba(45,50,59,0.3)" : "rgba(45,50,59,0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash(backdrop ? [3, 5] : []);
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, volBottom);
      ctx.stroke();
      ctx.setLineDash([]);
      const t = new Date(arr[i].t);
      const hh = String(t.getHours()).padStart(2, "0");
      const mm = String(t.getMinutes()).padStart(2, "0");
      ctx.fillStyle = backdrop ? "rgba(125,133,147,0.5)" : "#7d8593";
      ctx.fillText(`${hh}:${mm}`, x - 14, h - 6);
    }

    // ── Volume bars ─────────────────────────────────────────────────────────
    arr.forEach((c, i) => {
      const x = left + cw * i + cw / 2;
      const up = c.c >= c.o;
      const vh = (c.v / maxV) * (volBottom - volTop);
      ctx.fillStyle = up
        ? (backdrop ? "rgba(196,255,97,0.20)" : "rgba(196,255,97,0.35)")
        : (backdrop ? "rgba(239,68,68,0.20)"  : "rgba(239,68,68,0.35)");
      ctx.fillRect(
        x - Math.max(1.5, cw * 0.3),
        volBottom - vh,
        Math.max(2, cw * 0.6),
        vh
      );
    });

    // ── Candles ──────────────────────────────────────────────────────────────
    const bw = Math.max(3, cw * 0.6);
    arr.forEach((c, i) => {
      const x = left + cw * i + cw / 2;
      const up = c.c >= c.o;
      ctx.globalAlpha = backdrop ? 0.65 : 1;
      ctx.strokeStyle = up ? "#C4FF61" : "#ef4444";
      ctx.fillStyle   = up ? "#C4FF61" : "#ef4444";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y(c.h));
      ctx.lineTo(x, y(c.l));
      ctx.stroke();
      const yo = y(c.o), yc = y(c.c);
      ctx.fillRect(
        x - bw / 2,
        Math.min(yo, yc),
        bw,
        Math.max(1.5, Math.abs(yc - yo))
      );
      ctx.globalAlpha = 1;
    });

    // ── Last-price dashed line + tag ─────────────────────────────────────────
    const last = arr[arr.length - 1];
    ctx.globalAlpha = backdrop ? 0.8 : 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "rgba(196,255,97,0.65)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, y(last.c));
    ctx.lineTo(right, y(last.c));
    ctx.stroke();
    ctx.setLineDash([]);
    // Tag box
    const tagW = isMobile ? 52 : 66;
    ctx.fillStyle = "#C4FF61";
    ctx.fillRect(right + 1, y(last.c) - 9, tagW, 18);
    ctx.fillStyle = "#0E1116";
    ctx.fillText(last.c.toFixed(isMobile ? 1 : 2), right + (isMobile ? 3 : 7), y(last.c) + 4);
    ctx.globalAlpha = 1;

    // ── OHLC readout (only in normal inline mode, avoid collision with navbar in backdrop) ──
    if (!backdrop) {
      ctx.fillStyle = "#7d8593";
      const lt = new Date(last.t);
      ctx.fillText(
        `${String(lt.getHours()).padStart(2,"0")}:${String(lt.getMinutes()).padStart(2,"0")}  O ${last.o.toFixed(2)}  H ${last.h.toFixed(2)}  L ${last.l.toFixed(2)}  C ${last.c.toFixed(2)}  VOL ${Math.round(last.v)}`,
        left + 4,
        12
      );
    }

    // ── Backdrop subtle label in right rail (hidden on small mobile) ──────────
    if (backdrop && !isMobile) {
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(196,255,97,0.3)";
      ctx.fillText(`FEED // ${symbol}`, right + 4, h - 10);
    }

    // ── Hover crosshair ──────────────────────────────────────────────────────
    const hv = hoverRef.current;
    if (hv && !backdrop && hv.x >= left && hv.x <= right && hv.y >= top && hv.y <= volBottom) {
      ctx.strokeStyle = "rgba(196,255,97,0.4)";
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(hv.x, top); ctx.lineTo(hv.x, volBottom); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, hv.y); ctx.lineTo(right, hv.y); ctx.stroke();
      ctx.setLineDash([]);
      if (hv.y <= bottom) {
        const price = min + ((bottom - hv.y) / (bottom - top)) * (max - min);
        ctx.fillStyle = "#C4FF61";
        ctx.fillRect(right + 2, hv.y - 9, 66, 18);
        ctx.fillStyle = "#0E1116";
        ctx.fillText(price.toFixed(2), right + 7, hv.y + 4);
      }
      const ci = Math.max(0, Math.min(arr.length - 1, Math.floor((hv.x - left) / cw)));
      const hc = arr[ci];
      const ht = new Date(hc.t);
      ctx.fillStyle = "#7d8593";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.fillText(
        `${String(ht.getHours()).padStart(2,"0")}:${String(ht.getMinutes()).padStart(2,"0")}  O ${hc.o.toFixed(2)}  H ${hc.h.toFixed(2)}  L ${hc.l.toFixed(2)}  C ${hc.c.toFixed(2)}  VOL ${Math.round(hc.v)}`,
        left + 4, 12
      );
    }
  }

  // Main tick loop
  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      const arr = candles.current;
      if (!arr || arr.length === 0) return;
      const sc = scaleRef.current;
      const last = arr[arr.length - 1];
      const prev = last.c;
      momentum.current = momentum.current * 0.85 + rand(-1.5, 1.5) + (Math.random() < 0.02 ? rand(-6, 6) : 0);
      const close = +(prev + momentum.current * 2 * sc + rand(-4, 4) * sc).toFixed(2);
      last.c = close;
      last.h = Math.max(last.h, close);
      last.l = Math.min(last.l, close);
      last.v += rand(2, 20);
      tick++;
      if (tick % 40 === 0) {
        arr.push({ o: close, h: close, l: close, c: close, v: rand(10, 50), t: Date.now() });
        if (arr.length > 80) arr.shift();
      }
      setQuote({ price: close, dir: close >= prev ? 1 : -1 });
      draw();
    }, 250);

    // Also handle resize for backdrop mode
    const onResize = backdrop ? () => draw() : null;
    if (onResize) window.addEventListener("resize", onResize);

    draw();
    return () => {
      clearInterval(id);
      if (onResize) window.removeEventListener("resize", onResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backdrop]);

  // ── Backdrop render ───────────────────────────────────────────────────────
  if (backdrop) {
    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          display: "block",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
    );
  }

  // ── Normal inline render ──────────────────────────────────────────────────
  return (
    <div className="w-full h-full">
      {!hideHeader && (
        <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm">{symbol}</span>
            <span className="text-[10px] text-muted-foreground tracking-widest">SIMULATED FEED</span>
          </div>
          <div className={`tabular-nums font-bold text-sm ${quote.dir >= 0 ? "text-primary" : "text-red-500"}`}>
            {quote.price.toFixed(2)}{" "}
            <span className="text-[10px]">{quote.dir >= 0 ? "▲" : "▼"}</span>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-72 md:h-full block"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          hoverRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          draw();
        }}
        onMouseLeave={() => { hoverRef.current = null; draw(); }}
      />
    </div>
  );
}