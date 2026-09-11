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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink-950/90 backdrop-blur-md border-b border-bronze-700/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="font-serif text-lg tracking-wide text-parchment-100 transition-colors hover:text-bronze-400"
        >
          FILE MUSEUM
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium tracking-widest transition-colors ${
                location.pathname === link.to
                  ? "text-bronze-400"
                  : "text-parchment-400 hover:text-parchment-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/discover"
            className="border border-bronze-600/50 px-5 py-2 text-xs font-medium tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/10 hover:border-bronze-500"
          >
            DISCOVER ARTIFACT
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-px w-6 bg-parchment-200 transition-all ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-parchment-200 transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-parchment-200 transition-all ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-bronze-700/20 bg-ink-950/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm tracking-widest ${
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
              className="border border-bronze-600/50 px-5 py-2 text-center text-xs tracking-widest text-bronze-400"
            >
              DISCOVER ARTIFACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
