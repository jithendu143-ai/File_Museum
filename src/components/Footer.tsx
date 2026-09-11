import { Link } from "react-router-dom";

function MuseumCrest() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="h-16 w-16 text-bronze-600">
      {/* Outer ring */}
      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.4" />
      {/* Greek column motif */}
      <rect x="22" y="24" width="6" height="24" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      <rect x="37" y="24" width="6" height="24" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      <rect x="52" y="24" width="6" height="24" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      {/* Entablature */}
      <rect x="18" y="20" width="44" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      {/* Pediment / base */}
      <rect x="18" y="48" width="44" height="3" rx="0.5" stroke="currentColor" strokeWidth="0.8" />
      {/* Stars */}
      <circle cx="40" cy="60" r="1.5" fill="currentColor" />
      <circle cx="34" cy="62" r="1" fill="currentColor" />
      <circle cx="46" cy="62" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-bronze-700/20 overflow-hidden">
      {/* Marble texture background */}
      <div className="absolute inset-0 marble-panel opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 to-ink-950/95" />

      {/* Decorative top edge */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-bronze-600/50 to-transparent" />
      <div className="relative mt-0.5 h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />

      <div className="relative px-6 py-16 lg:px-10">
        {/* Museum Crest */}
        <div className="flex flex-col items-center mb-10">
          <MuseumCrest />
          <div className="mt-4 font-serif text-2xl tracking-[0.15em] text-parchment-200 engraved-text">
            FILE MUSEUM
          </div>
          <div className="mt-1 font-mono text-[9px] tracking-[0.4em] text-bronze-600 uppercase">
            The Museum of Things You Never Needed
          </div>
          {/* Ornamental divider */}
          <div className="mt-6 flex items-center gap-3 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/40" />
            <svg viewBox="0 0 20 10" className="w-5 text-bronze-700" fill="currentColor">
              <path d="M10 0L12 4H20L13.5 6.5L16 10L10 7L4 10L6.5 6.5L0 4H8L10 0Z" />
            </svg>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/40" />
          </div>
        </div>

        {/* Three-column layout */}
        <div className="mx-auto max-w-5xl grid gap-10 sm:grid-cols-3 text-center sm:text-left">
          {/* Column 1 — About */}
          <div>
            <div className="mb-4 font-mono text-[9px] tracking-[0.35em] text-bronze-600 uppercase border-b border-bronze-800/40 pb-2">
              About the Institution
            </div>
            <p className="text-xs leading-relaxed text-parchment-500">
              A deliberately useless experiment in digital archaeology. We preserve what civilization forgot it had,
              and celebrate files that serve no purpose whatsoever.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="sm:text-center">
            <div className="mb-4 font-mono text-[9px] tracking-[0.35em] text-bronze-600 uppercase border-b border-bronze-800/40 pb-2">
              Navigation
            </div>
            <div className="flex flex-col gap-3">
              {[
                { to: "/", label: "HOME" },
                { to: "/museum", label: "MUSEUM" },
                { to: "/discover", label: "DISCOVER" },
                { to: "/about", label: "ABOUT" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[10px] tracking-[0.2em] text-parchment-500 transition-colors hover:text-bronze-400"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 — Archive info */}
          <div className="sm:text-right">
            <div className="mb-4 font-mono text-[9px] tracking-[0.35em] text-bronze-600 uppercase border-b border-bronze-800/40 pb-2">
              Archive Records
            </div>
            <div className="space-y-2 font-mono text-[9px] text-parchment-600">
              <p>ACCESSION · FM-2026</p>
              <p>CLASSIFICATION · FICTIONAL</p>
              <p>ACQUISITION · ONGOING</p>
              <p>CATALOGUE · OPEN ACCESS</p>
            </div>
          </div>
        </div>

        {/* Bottom seal bar */}
        <div className="mt-12 mx-auto max-w-5xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent mb-6" />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-mono text-[9px] tracking-[0.3em] text-parchment-700">
              EST. 2026 · DIGITAL ARCHIVES · ALL ARTIFACTS FICTIONAL · NO FILES WERE HARMED
            </p>
            <p className="font-mono text-[8px] tracking-widest text-parchment-800">
              © {new Date().getFullYear()} FILE MUSEUM — ACCESSION FM-2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
