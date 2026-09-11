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

  return (
    <div className="min-h-screen px-6 pt-32 pb-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center animate-fade-in">
          <span className="font-mono text-[10px] tracking-widest text-bronze-500">
            PERMANENT COLLECTION
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-parchment-100 lg:text-6xl">
            THE DIGITAL ARCHIVES
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg italic text-parchment-400">
            A growing collection of things that probably should have been
            deleted.
          </p>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in-up">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center border border-bronze-700/30">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-bronze-600">
                <rect x="6" y="10" width="28" height="24" rx="1" stroke="currentColor" strokeWidth="1" />
                <path d="M14 10V6h12v4" stroke="currentColor" strokeWidth="1" />
                <path d="M6 20h28" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <h2 className="mb-3 font-serif text-3xl text-parchment-100">
              THE MUSEUM IS EMPTY
            </h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-parchment-500">
              Civilization has not yet donated anything sufficiently useless.
            </p>
            <Link
              to="/discover"
              className="border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20"
            >
              DISCOVER YOUR FIRST ARTIFACT
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap items-center justify-center gap-2 animate-fade-in">
              <FilterButton
                active={filter === "ALL"}
                onClick={() => setFilter("ALL")}
                label="ALL HALLS"
              />
              {HALLS.map((hall) => (
                <FilterButton
                  key={hall.id}
                  active={filter === hall.id}
                  onClick={() => setFilter(hall.id as FilterValue)}
                  label={`HALL ${hall.id}`}
                />
              ))}
            </div>

            {filter !== "ALL" && (
              <div className="mb-8 max-w-2xl mx-auto text-center animate-fade-in">
                <h3 className="font-serif text-xl text-parchment-200">
                  {HALLS.find((h) => h.id === filter)?.name}
                </h3>
                <p className="mt-1 text-xs text-parchment-500">
                  {HALLS.find((h) => h.id === filter)?.description}
                </p>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="py-20 text-center animate-fade-in">
                <p className="text-sm text-parchment-500">
                  No artifacts in this hall yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

            <div className="mt-16 text-center">
              <Link
                to="/discover"
                className="border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20"
              >
                DISCOVER A NEW ARTIFACT
              </Link>
            </div>
          </>
        )}
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

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[10px] tracking-widest transition-all ${
        active
          ? "border-bronze-500 bg-bronze-600/15 text-bronze-400"
          : "border-bronze-700/20 text-parchment-500 hover:border-bronze-600/40 hover:text-parchment-300"
      } border`}
    >
      {label}
    </button>
  );
}
