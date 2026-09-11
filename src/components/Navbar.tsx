import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/museum", label: "MUSEUM" },
    { to: "/about", label: "ABOUT" },
  ];

  const tickerText =
    "EST. 2026 · HALL I–V OPEN · DIGITAL ARCHIVES ACTIVE · NEW ACQUISITIONS THIS WEEK · ALL ARTIFACTS FICTIONALLY SIGNIFICANT · DIGITAL ARCHAEOLOGY ONGOING · USELESSNESS CERTIFIED · EST. 2026 · HALL I–V OPEN · DIGITAL ARCHIVES ACTIVE · NEW ACQUISITIONS THIS WEEK · ALL ARTIFACTS FICTIONALLY SIGNIFICANT · DIGITAL ARCHAEOLOGY ONGOING · USELESSNESS CERTIFIED · ";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ink-950/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.8),0_1px_0_rgba(201,169,106,0.2)]"
          : "bg-transparent"
      }`}
    >
      {/* Main nav bar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        {/* Museum Seal + Logotype */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="File Museum Home"
        >
          {/* SVG Seal */}
          <div className="relative flex h-10 w-10 items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" className="absolute inset-0 h-full w-full text-bronze-500">
              <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="14.5" stroke="currentColor" strokeWidth="0.4" />
              <text
                x="20"
                y="24"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="11"
                fill="currentColor"
                letterSpacing="1"
              >
                FM
              </text>
            </svg>
          </div>

          {/* Logotype */}
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-base tracking-[0.2em] text-parchment-100 group-hover:text-bronze-400 transition-colors">
              FILE MUSEUM
            </span>
            <span className="font-mono text-[8px] tracking-[0.35em] text-bronze-600 uppercase">
              Digital Archives
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-[10px] font-medium tracking-[0.25em] transition-colors pb-1 ${
                location.pathname === link.to
                  ? "text-bronze-400"
                  : "text-parchment-400 hover:text-parchment-100"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-400 to-transparent shadow-[0_0_6px_rgba(201,169,106,0.8)]" />
              )}
            </Link>
          ))}

          {/* CTA Plaque Button */}
          <Link
            to="/discover"
            className="group relative overflow-hidden border border-bronze-600/60 bg-bronze-950/60 px-5 py-2.5 text-[10px] font-medium tracking-[0.2em] text-bronze-400 transition-all duration-300 hover:border-bronze-400 hover:bg-bronze-900/60 hover:shadow-[0_0_16px_rgba(201,169,106,0.25)]"
          >
            <span className="relative z-10">DISCOVER ARTIFACT</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bronze-400/8 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            {/* Rivet corners */}
            <span className="absolute top-1 left-1 h-1 w-1 rounded-full bg-bronze-700" />
            <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-bronze-700" />
            <span className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-bronze-700" />
            <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-bronze-700" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`h-px w-6 bg-parchment-200 transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-parchment-200 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-parchment-200 transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Architectural separator line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />

      {/* Ticker Strip */}
      <div className="ticker-wrap border-b border-bronze-800/30 bg-ink-950/80 py-1">
        <div className="ticker-inner font-mono text-[9px] tracking-widest text-bronze-700">
          {tickerText}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-bronze-700/20 bg-ink-950/98 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-[0.2em] transition-colors ${
                  location.pathname === link.to
                    ? "text-bronze-400"
                    : "text-parchment-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/discover"
              onClick={() => setMobileOpen(false)}
              className="border border-bronze-600/50 px-5 py-3 text-center text-[10px] tracking-[0.2em] text-bronze-400"
            >
              DISCOVER ARTIFACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
