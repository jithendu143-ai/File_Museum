import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════
          Stone Header Panel
      ═══════════════════════════════════════════════════ */}
      <div
        className="relative pt-32 pb-14 px-6 lg:px-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.9) 100%), radial-gradient(ellipse at 50% 0%, rgba(100,70,20,0.16) 0%, transparent 60%)",
        }}
      >
        {/* Architectural top line */}
        <div className="absolute top-24 left-0 right-0">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/30 to-transparent" />
        </div>

        <div className="animate-fade-in">
          <div className="font-mono text-[9px] tracking-[0.4em] text-bronze-600 uppercase">
            Curatorial Statement
          </div>

          {/* Stone-panel title */}
          <div className="mt-4 inline-block relative px-10 py-5 border border-bronze-700/25 mx-auto"
            style={{ background: "linear-gradient(175deg, #1a1612 0%, #0d0b08 100%)" }}>
            <div className="absolute inset-2 border border-bronze-800/15 pointer-events-none" />
            <span className="absolute top-1.5 left-1.5 h-2 w-2 border-t border-l border-bronze-700/40" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 border-t border-r border-bronze-700/40" />
            <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-bronze-700/40" />
            <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-bronze-700/40" />
            <h1 className="font-serif text-4xl leading-tight text-parchment-100 lg:text-5xl engraved-text tracking-[0.05em]">
              WHY DOES THIS EXIST?
            </h1>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          Manifesto Content
      ═══════════════════════════════════════════════════ */}
      <div className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-2xl">

          <div className="space-y-0 animate-fade-in-up" style={{ animationDelay: "100ms" }}>

            {/* Opening paragraph */}
            <div className="relative border-l border-bronze-700/20 pl-6 py-2 mb-8">
              <p className="font-serif text-xl leading-relaxed text-parchment-300">
                We all have files sitting on our devices that haven't been opened in years.
              </p>
            </div>

            <p className="text-sm leading-relaxed text-parchment-400 mb-4">
              Old assignments. Random screenshots. Files called{" "}
              <span className="font-mono text-parchment-300 bg-ink-800/60 px-1 py-0.5 text-xs border border-bronze-800/30">
                final_final_FINAL
              </span>
              . Things we downloaded and immediately forgot.
            </p>

            <p className="font-serif text-lg italic leading-relaxed text-parchment-300 mb-6">
              Instead of deleting them, we decided to give them the one thing they never deserved:
            </p>

            {/* The big pull-quote */}
            <div className="my-10 relative">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent mb-8" />
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/30" />
                <svg viewBox="0 0 24 12" className="w-5 text-bronze-700" fill="currentColor">
                  <path d="M12 0L14 4H22L16 7L18 12L12 8L6 12L8 7L2 4H10L12 0Z" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/30" />
              </div>
              <p className="text-center font-serif text-5xl text-bronze-400 engraved-text lg:text-6xl">
                A museum.
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />
            </div>

            {/* About section */}
            <div className="my-10 p-6 brass-plaque relative">
              <span className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
              <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
              <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />

              <p className="text-sm leading-relaxed text-parchment-400 mb-3">
                <span className="font-serif text-lg text-parchment-200">
                  The Museum of Things You Never Needed
                </span>{" "}
                is a deliberately useless experiment in digital archaeology.
              </p>

              {/* Manifesto list */}
              <div className="space-y-2 mt-4">
                {[
                  "It does not solve digital clutter.",
                  "It does not improve productivity.",
                  "It does not make your files more useful.",
                  "It simply gives them historical importance they absolutely do not deserve.",
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-parchment-500">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-bronze-700 shrink-0" />
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="my-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/30" />
                <svg viewBox="0 0 24 12" className="w-5 text-bronze-800" fill="currentColor">
                  <path d="M12 0L14 4H22L16 7L18 12L12 8L6 12L8 7L2 4H10L12 0Z" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/30" />
              </div>
              <p className="text-center font-serif text-2xl italic text-parchment-100 engraved-text">
                "Because not everything needs a purpose."
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <Link
              to="/discover"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-bronze-600/50 bg-bronze-900/20 px-10 py-4 text-[10px] tracking-[0.25em] text-bronze-400 transition-all hover:bg-bronze-900/40 hover:shadow-[0_0_20px_rgba(201,169,106,0.12)]"
            >
              <span className="relative z-10">DISCOVER AN ARTIFACT</span>
              <span className="transition-transform group-hover:translate-x-1 text-bronze-500">→</span>
              <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
              <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
              <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
              <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
