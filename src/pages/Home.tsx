import { Link } from "react-router-dom";
import { useState } from "react";
import type { Artifact } from "../types";
import { getAllArtifacts, removeArtifact } from "../lib/storage";
import ArtifactCard from "../components/ArtifactCard";
import ArtifactDetails from "../components/ArtifactDetails";

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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-bronze-600/5 blur-[120px]" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,169,106,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,106,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div
            className="mb-6 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            <span className="inline-block border border-bronze-700/40 px-4 py-1.5 font-mono text-[10px] tracking-widest text-bronze-500">
              THE DIGITAL ARCHIVES
            </span>
          </div>

          <h1
            className="mb-6 animate-fade-in-up font-serif text-6xl leading-[1.05] text-parchment-100 lg:text-8xl"
            style={{ animationDelay: "200ms" }}
          >
            UNFILED RELIC
          </h1>

          <p
            className="mb-4 animate-fade-in-up font-serif text-xl italic leading-relaxed text-parchment-300 lg:text-2xl"
            style={{ animationDelay: "400ms" }}
          >
            A museum for files humanity had absolutely no reason to preserve.
          </p>

          <p
            className="mx-auto mb-10 max-w-xl animate-fade-in-up text-sm leading-relaxed text-parchment-500 lg:text-base"
            style={{ animationDelay: "600ms" }}
          >
            Upload a forgotten file. Our digital archaeologists will determine
            its historical importance, cultural significance, and completely
            unnecessary existence.
          </p>

          <div
            className="flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row"
            style={{ animationDelay: "800ms" }}
          >
            <Link
              to="/discover"
              className="group relative w-full overflow-hidden border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20 sm:w-auto"
            >
              <span className="relative z-10">DISCOVER AN ARTIFACT</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bronze-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
            <Link
              to="/museum"
              className="w-full border border-parchment-500/30 px-8 py-4 text-xs tracking-widest text-parchment-300 transition-all hover:border-parchment-400/60 hover:text-parchment-100 sm:w-auto"
            >
              ENTER THE MUSEUM
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in text-[9px] tracking-widest text-parchment-600">
          EST. 2026 · ALL ARTIFACTS FICTIONAL
        </div>
      </section>

      <section className="border-t border-bronze-700/20 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="font-mono text-[10px] tracking-widest text-bronze-500">
              PERMANENT COLLECTION
            </span>
            <h2 className="mt-2 font-serif text-3xl text-parchment-100 lg:text-4xl">
              Featured Artifacts
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((artifact, i) => (
              <ArtifactCard
                key={artifact.id}
                artifact={artifact}
                index={i}
                onClick={() => setSelected(artifact)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/museum"
              className="text-xs tracking-widest text-bronze-400 underline underline-offset-8 hover:text-bronze-300"
            >
              VIEW FULL COLLECTION →
            </Link>
          </div>
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
