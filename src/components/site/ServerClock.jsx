import { useEffect, useState } from "react";

export default function ServerClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now.toISOString().slice(11, 19)} UTC</span>;
}