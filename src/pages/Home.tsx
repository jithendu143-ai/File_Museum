import { Link } from "react-router-dom";
import { useState } from "react";
import type { Artifact } from "../types";
import { getAllArtifacts, removeArtifact } from "../lib/storage";
import ArtifactCard from "../components/ArtifactCard";
import ArtifactDetails from "../components/ArtifactDetails";

/* Floating dust mote component */
function DustParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="dust-particle"
      style={style}
    />
  );
}

const DUST_PARTICLES = [
  { bottom: "10%", left: "15%", width: 2, height: 2, "--duration": "9s", "--delay": "0s", "--drift-y": "130px", "--drift-x": "25px", "--max-opacity": "0.45" },
  { bottom: "20%", left: "30%", width: 1.5, height: 1.5, "--duration": "12s", "--delay": "2s", "--drift-y": "110px", "--drift-x": "-20px", "--max-opacity": "0.35" },
  { bottom: "5%", left: "55%", width: 2, height: 2, "--duration": "8s", "--delay": "4s", "--drift-y": "150px", "--drift-x": "35px", "--max-opacity": "0.5" },
  { bottom: "15%", left: "70%", width: 1, height: 1, "--duration": "15s", "--delay": "1s", "--drift-y": "120px", "--drift-x": "-15px", "--max-opacity": "0.3" },
  { bottom: "8%", left: "85%", width: 1.5, height: 1.5, "--duration": "10s", "--delay": "6s", "--drift-y": "140px", "--drift-x": "20px", "--max-opacity": "0.4" },
  { bottom: "25%", left: "5%", width: 2, height: 2, "--duration": "11s", "--delay": "3s", "--drift-y": "100px", "--drift-x": "30px", "--max-opacity": "0.4" },
  { bottom: "12%", left: "45%", width: 1, height: 1, "--duration": "13s", "--delay": "7s", "--drift-y": "160px", "--drift-x": "-25px", "--max-opacity": "0.25" },
  { bottom: "30%", left: "65%", width: 2.5, height: 2.5, "--duration": "7s", "--delay": "5s", "--drift-y": "90px", "--drift-x": "15px", "--max-opacity": "0.55" },
];

export default function Home() {
  const [artifacts, setArtifacts] = useState<Artifact[]>(getAllArtifacts());
  const [selected, setSelected] = useState<Artifact | null>(null);
  const featured = artifacts.slice(0, 3);

  const handleDelete = (id: string) => {
    removeArtifact(id);
    setArtifacts(getAllArtifacts());
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════
          HERO — Cinematic Museum Entry Hall
      ═══════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
        {/* Deep dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(100,70,20,0.2) 0%, rgba(10,9,8,0) 55%), radial-gradient(ellipse at 50% 100%, rgba(30,15,5,0.5) 0%, rgba(10,9,8,0) 60%), #0a0908",
          }}
        />

        {/* Ambient grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,169,106,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,106,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Architectural pillar decorations */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bronze-700/20 to-transparent hidden lg:block" style={{ left: "6rem" }} />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-bronze-700/20 to-transparent hidden lg:block" style={{ right: "6rem" }} />
        {/* Pillar capitals */}
        <div className="absolute top-24 left-24 hidden lg:flex flex-col gap-1">
          <div className="h-px w-8 bg-bronze-700/30" />
          <div className="h-px w-6 bg-bronze-700/20" />
        </div>
        <div className="absolute top-24 right-24 hidden lg:flex flex-col gap-1 items-end">
          <div className="h-px w-8 bg-bronze-700/30" />
          <div className="h-px w-6 bg-bronze-700/20" />
        </div>

        {/* Overhead spotlight radial */}
        <div
          className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(201,169,106,0.14) 0%, rgba(201,169,106,0.04) 40%, transparent 70%)",
          }}
        />

        {/* Floating dust particles */}
        {DUST_PARTICLES.map((p, i) => (
          <DustParticle
            key={i}
            style={{
              bottom: p.bottom,
              left: p.left,
              width: p.width,
              height: p.height,
              "--duration": p["--duration"],
              "--delay": p["--delay"],
              "--drift-y": p["--drift-y"],
              "--drift-x": p["--drift-x"],
              "--max-opacity": p["--max-opacity"],
            } as React.CSSProperties}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Institution subtitle tag */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <span className="inline-flex items-center gap-3 border border-bronze-700/40 bg-ink-900/60 px-5 py-2 font-mono text-[9px] tracking-[0.4em] text-bronze-500">
              <span className="h-1 w-1 rounded-full bg-bronze-500" />
              THE DIGITAL ARCHIVES · EST. 2026
              <span className="h-1 w-1 rounded-full bg-bronze-500" />
            </span>
          </div>

          {/* Grand title */}
          <h1
            className="mb-4 animate-fade-in-up font-serif leading-[0.95] text-parchment-100 engraved-text"
            style={{
              animationDelay: "200ms",
              fontSize: "clamp(4rem, 13vw, 9rem)",
              letterSpacing: "0.06em",
            }}
          >
            UNFILED
            <br />
            <span className="text-bronze-400">RELIC</span>
          </h1>

          {/* Ornamental divider */}
          <div
            className="mx-auto mb-6 flex items-center gap-4 max-w-sm animate-fade-in"
            style={{ animationDelay: "350ms" }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/50" />
            <svg viewBox="0 0 24 12" className="w-5 text-bronze-700" fill="currentColor">
              <path d="M12 0L14 4H22L16 7L18 12L12 8L6 12L8 7L2 4H10L12 0Z" />
            </svg>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/50" />
          </div>

          {/* Tagline */}
          <p
            className="mb-3 animate-fade-in-up font-serif text-xl italic leading-relaxed text-parchment-300 lg:text-2xl"
            style={{ animationDelay: "400ms" }}
          >
            A museum for files humanity had absolutely no reason to preserve.
          </p>

          <p
            className="mx-auto mb-10 max-w-xl animate-fade-in-up text-sm leading-relaxed text-parchment-500 lg:text-base"
            style={{ animationDelay: "550ms" }}
          >
            Upload a forgotten file. Our digital archaeologists will determine its historical
            importance, cultural significance, and completely unnecessary existence.
          </p>

          {/* CTA Buttons — brass embossed style */}
          <div
            className="flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row"
            style={{ animationDelay: "750ms" }}
          >
            {/* Primary brass button */}
            <Link
              to="/discover"
              className="group relative w-full overflow-hidden sm:w-auto"
            >
              <div
                className="relative px-10 py-4 text-xs tracking-[0.25em] text-bronze-300 transition-all duration-300 group-hover:text-bronze-200"
                style={{
                  background: "linear-gradient(175deg, #2a1f10 0%, #1a1308 50%, #110d06 100%)",
                  border: "1px solid rgba(201,169,106,0.5)",
                  boxShadow:
                    "inset 0 1px 0 rgba(201,169,106,0.3), inset 0 -1px 0 rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.5)",
                }}
              >
                <span className="relative z-10">DISCOVER AN ARTIFACT</span>
                {/* Rivet corners */}
                <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
                <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
                <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
                <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bronze-400/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </div>
            </Link>

            {/* Secondary button */}
            <Link
              to="/museum"
              className="group relative w-full border border-parchment-600/20 px-10 py-4 text-xs tracking-[0.25em] text-parchment-400 transition-all duration-300 hover:border-parchment-500/40 hover:text-parchment-200 sm:w-auto"
              style={{ background: "rgba(10,9,8,0.5)" }}
            >
              ENTER THE MUSEUM
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in text-[8px] tracking-[0.3em] text-parchment-700 font-mono">
          <span>EST. 2026 · ALL ARTIFACTS FICTIONAL</span>
          {/* Scroll chevron */}
          <svg className="w-4 h-4 text-bronze-800 animate-bounce mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED ARTIFACTS — Gallery Wall Section
      ═══════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24 lg:px-10">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 gallery-wall opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-transparent to-ink-950/80" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-14 text-center">
            <span className="font-mono text-[9px] tracking-[0.4em] text-bronze-600 uppercase">
              Permanent Collection
            </span>

            {/* Ornamental double rule */}
            <div className="my-4 mx-auto max-w-xs">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/50 to-transparent" />
              <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />
            </div>

            <h2 className="font-serif text-4xl text-parchment-100 lg:text-5xl engraved-text">
              Featured Artifacts
            </h2>
            <p className="mt-3 font-serif text-base italic text-parchment-500">
              Selected from the permanent archives by our curators.
            </p>
          </div>

          {/* Gallery wall grid */}
          {featured.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((artifact, i) => (
                  <ArtifactCard
                    key={artifact.id}
                    artifact={artifact}
                    index={i}
                    onClick={() => setSelected(artifact)}
                  />
                ))}
              </div>

              <div className="mt-14 text-center">
                <Link
                  to="/museum"
                  className="group inline-flex items-center gap-3 border border-bronze-700/30 bg-ink-900/60 px-8 py-3.5 text-[10px] tracking-[0.25em] text-bronze-500 transition-all hover:border-bronze-500/50 hover:text-bronze-400 hover:shadow-[0_0_20px_rgba(201,169,106,0.1)]"
                >
                  VIEW FULL COLLECTION
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="font-serif italic text-parchment-500">
                No artifacts in the permanent collection yet.
              </p>
              <Link
                to="/discover"
                className="mt-6 inline-block border border-bronze-600/40 bg-bronze-900/20 px-8 py-3 text-[10px] tracking-[0.2em] text-bronze-400 transition-all hover:bg-bronze-900/40"
              >
                DISCOVER YOUR FIRST ARTIFACT
              </Link>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <ArtifactDetails
          artifact={selected}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
