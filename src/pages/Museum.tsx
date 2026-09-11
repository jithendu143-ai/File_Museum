import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Artifact } from "../types";
import { HALLS } from "../types";
import { getAllArtifacts, removeArtifact } from "../lib/storage";
import ArtifactCard from "../components/ArtifactCard";
import ArtifactDetails from "../components/ArtifactDetails";

type FilterValue = "ALL" | "I" | "II" | "III" | "IV" | "V";

export default function Museum() {
  const [artifacts, setArtifacts] = useState<Artifact[]>(getAllArtifacts());
  const [filter, setFilter] = useState<FilterValue>("ALL");
  const [selected, setSelected] = useState<Artifact | null>(null);

  const handleDelete = (id: string) => {
    removeArtifact(id);
    setArtifacts(getAllArtifacts());
  };

  const filtered = useMemo(() => {
    if (filter === "ALL") return artifacts;
    return artifacts.filter((a) => a.museumHall === filter);
  }, [artifacts, filter]);

  const isEmpty = artifacts.length === 0;
  const activeHall = filter !== "ALL" ? HALLS.find((h) => h.id === filter) : null;

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════
          MUSEUM HEADER — Wing Signage Board
      ═══════════════════════════════════════════════════ */}
      <div
        className="relative pt-32 pb-14 px-6 lg:px-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,9,8,0) 0%, rgba(10,9,8,0.95) 100%), radial-gradient(ellipse at 50% 0%, rgba(100,70,20,0.18) 0%, transparent 60%)",
        }}
      >
        {/* Top architectural line */}
        <div className="absolute top-24 left-0 right-0">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="mb-2 text-center animate-fade-in">
            <span className="font-mono text-[9px] tracking-[0.4em] text-bronze-600 uppercase">
              Permanent Collection
            </span>
          </div>

          {/* Main wing signage */}
          <div className="text-center animate-fade-in-up">
            {/* Double border panel */}
            <div className="inline-block relative px-12 py-6 border border-bronze-700/30"
              style={{ background: "linear-gradient(175deg, #141210 0%, #0d0b08 100%)" }}>
              <div className="absolute inset-2 border border-bronze-800/20 pointer-events-none" />
              {/* Corner accents */}
              <span className="absolute top-1.5 left-1.5 h-2 w-2 border-t border-l border-bronze-600/40" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 border-t border-r border-bronze-600/40" />
              <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-bronze-600/40" />
              <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-bronze-600/40" />

              <h1 className="font-serif text-4xl leading-tight text-parchment-100 lg:text-6xl engraved-text tracking-[0.06em]">
                THE DIGITAL ARCHIVES
              </h1>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-lg text-center font-serif text-base italic text-parchment-500 animate-fade-in">
            A growing collection of things that probably should have been deleted.
          </p>
        </div>
      </div>

      <div className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-7xl">

          {isEmpty ? (
            /* ─── Empty State — Gallery Closed placard ─── */
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in-up">
              <div className="relative mb-8 border border-bronze-700/30 p-10"
                style={{ background: "linear-gradient(175deg, #1a1612 0%, #0d0b08 100%)" }}>
                {/* Rivet corners */}
                <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-bronze-700/60 border border-bronze-500/20" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-bronze-700/60 border border-bronze-500/20" />
                <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-bronze-700/60 border border-bronze-500/20" />
                <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-bronze-700/60 border border-bronze-500/20" />

                <div className="mb-5 flex h-16 w-16 items-center justify-center border border-bronze-700/40 mx-auto">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-bronze-700">
                    <rect x="4" y="8" width="24" height="20" rx="1" stroke="currentColor" strokeWidth="1" />
                    <path d="M12 8V5h8v3" stroke="currentColor" strokeWidth="1" />
                    <path d="M4 16h24" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-parchment-100 tracking-[0.05em]">
                  GALLERY CURRENTLY EMPTY
                </h2>
                <div className="my-3 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />
                <p className="max-w-sm text-sm leading-relaxed text-parchment-500 font-serif italic">
                  Civilization has not yet donated anything sufficiently useless to our archives.
                </p>
              </div>

              <Link
                to="/discover"
                className="group relative overflow-hidden border border-bronze-600/50 bg-bronze-900/20 px-10 py-4 text-[10px] tracking-[0.25em] text-bronze-400 transition-all hover:bg-bronze-900/40 hover:shadow-[0_0_20px_rgba(201,169,106,0.12)]"
              >
                <span className="relative z-10">DISCOVER YOUR FIRST ARTIFACT</span>
                <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
              </Link>
            </div>
          ) : (
            <>
              {/* ─── Hall Filter — Gallery Room Door Plaques ─── */}
              <div className="mb-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
                <HallPlaque
                  active={filter === "ALL"}
                  onClick={() => setFilter("ALL")}
                  label="ALL HALLS"
                  roman="∞"
                />
                {HALLS.map((hall) => (
                  <HallPlaque
                    key={hall.id}
                    active={filter === hall.id}
                    onClick={() => setFilter(hall.id as FilterValue)}
                    label={`HALL ${hall.id}`}
                    roman={hall.id}
                  />
                ))}
              </div>

              {/* ─── Active Hall Description ─── */}
              {activeHall && (
                <div className="mb-10 mx-auto max-w-2xl animate-fade-in-up">
                  <div className="relative border border-bronze-700/25 p-6 text-center"
                    style={{ background: "linear-gradient(175deg, #1a1612 0%, #0d0b08 100%)" }}>
                    <div className="absolute top-2 left-2 h-2 w-2 border-t border-l border-bronze-700/30" />
                    <div className="absolute top-2 right-2 h-2 w-2 border-t border-r border-bronze-700/30" />
                    <div className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-bronze-700/30" />
                    <div className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-bronze-700/30" />

                    <span className="font-mono text-[8px] tracking-[0.3em] text-bronze-600">GALLERY WING {activeHall.id}</span>
                    <h3 className="mt-1 font-serif text-xl text-parchment-200">{activeHall.name}</h3>
                    <div className="mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />
                    <p className="text-xs text-parchment-500 leading-relaxed">{activeHall.description}</p>
                  </div>
                </div>
              )}

              {/* ─── Artifact Grid ─── */}
              {filtered.length === 0 ? (
                <div className="py-24 text-center animate-fade-in">
                  <p className="font-serif italic text-parchment-500">
                    No artifacts in this wing yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((artifact, i) => (
                    <ArtifactCard
                      key={artifact.id}
                      artifact={artifact}
                      index={i}
                      onClick={() => setSelected(artifact)}
                    />
                  ))}
                </div>
              )}

              {/* ─── CTA ─── */}
              <div className="mt-16 text-center">
                <Link
                  to="/discover"
                  className="group relative inline-flex items-center gap-3 overflow-hidden border border-bronze-600/50 bg-bronze-900/20 px-10 py-4 text-[10px] tracking-[0.25em] text-bronze-400 transition-all hover:bg-bronze-900/40 hover:shadow-[0_0_20px_rgba(201,169,106,0.12)]"
                >
                  <span className="relative z-10">DISCOVER A NEW ARTIFACT</span>
                  <span className="transition-transform group-hover:translate-x-1 text-bronze-500">→</span>
                  <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                  <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                  <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                  <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-700/60" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

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

/* ── Gallery Room Door Plaque Filter Button ── */
function HallPlaque({
  active,
  onClick,
  label,
  roman,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  roman: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative px-5 py-3 transition-all duration-300 ${
        active
          ? "shadow-[0_0_20px_rgba(201,169,106,0.15)]"
          : "hover:shadow-[0_0_12px_rgba(201,169,106,0.08)]"
      }`}
      style={{
        background: active
          ? "linear-gradient(175deg, #2a1f10 0%, #1a1308 100%)"
          : "linear-gradient(175deg, #161210 0%, #0d0b08 100%)",
        border: active
          ? "1px solid rgba(201,169,106,0.45)"
          : "1px solid rgba(110,82,35,0.2)",
        boxShadow: active
          ? "inset 0 1px 0 rgba(201,169,106,0.25), inset 0 -1px 0 rgba(0,0,0,0.5), 0 0 20px rgba(201,169,106,0.15)"
          : "inset 0 1px 0 rgba(201,169,106,0.06), inset 0 -1px 0 rgba(0,0,0,0.4)",
      }}
    >
      {/* Rivet corners when active */}
      {active && (
        <>
          <span className="absolute top-1 left-1 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-bronze-600/70" />
        </>
      )}
      <span
        className={`block font-mono text-[9px] tracking-[0.25em] uppercase transition-colors ${
          active ? "text-bronze-400" : "text-parchment-600 group-hover:text-parchment-400"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
