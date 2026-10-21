import { Outlet } from "react-router-dom";
import Ticker from "./Ticker";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Ticker />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}