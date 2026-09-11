import type { Artifact } from "../types";
import { HALLS } from "../types";
import { formatDate } from "../lib/storage";
import UselessnessMeter from "./UselessnessMeter";

interface Props {
  artifact: Artifact;
  onClick: () => void;
  index?: number;
}

export default function ArtifactCard({ artifact, onClick, index = 0 }: Props) {
  const hall = HALLS.find((h) => h.id === artifact.museumHall);

  // File type iconic representation
  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("image") || t.includes("jpeg") || t.includes("png") || t.includes("gif") || t.includes("svg")) {
      return (
        <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (t.includes("pdf") || t.includes("doc") || t.includes("text") || t.includes("txt")) {
      return (
        <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    if (t.includes("app") || t.includes("exe") || t.includes("binary") || t.includes("dmg")) {
      return (
        <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    }
    if (t.includes("audio") || t.includes("mp3") || t.includes("wav")) {
      return (
        <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    }
    if (t.includes("video") || t.includes("mp4") || t.includes("mov")) {
      return (
        <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-bronze-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    );
  };

  const rarityColor =
    artifact.rarity === "Legendary" ? "text-gold-400 border-gold-600/60 bg-gold-900/20" :
    artifact.rarity === "Rare" ? "text-bronze-300 border-bronze-500/60 bg-bronze-900/30" :
    "text-parchment-400 border-bronze-700/40 bg-ink-800/60";

  return (
    <div
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group relative flex flex-col cursor-pointer animate-fade-in-up"
    >
      {/* Outer glass case frame */}
      <div className="absolute inset-0 border border-bronze-700/30 transition-all duration-500 group-hover:border-bronze-500/50 group-hover:shadow-[0_0_30px_rgba(201,169,106,0.08)]" />
      {/* Inner glass case */}
      <div className="relative flex flex-col h-full vitrine-glass bg-ink-900/95 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9),0_0_40px_-8px_rgba(201,169,106,0.12)]">

        {/* Top glass bevel line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-400/50 to-transparent" />

        {/* Overhead spotlight — intensifies on hover */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-bronze-400/15 via-bronze-500/4 to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />

        {/* ── Exhibit Header ── */}
        <div className="relative px-4 pt-4 pb-2 flex items-center justify-between border-b border-bronze-800/30">
          {/* Accession tag */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500 shadow-[0_0_6px_rgba(201,169,106,0.7)]" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-bronze-500/80">
              {artifact.accessionNumber}
            </span>
          </div>

          {/* Status label */}
          <span
            className={`px-2 py-0.5 text-[7px] font-mono tracking-widest uppercase border ${
              artifact.isSample
                ? "border-bronze-800/40 bg-ink-900/60 text-parchment-500"
                : "border-bronze-500/50 bg-bronze-900/30 text-bronze-300 shadow-[0_0_8px_rgba(201,169,106,0.15)]"
            }`}
          >
            {artifact.isSample ? "PERMANENT ARCHIVE" : "NEW ACQUISITION"}
          </span>
        </div>

        {/* ── Velvet Pedestal Stage ── */}
        <div className="relative flex flex-col items-center justify-center px-6 py-8 min-h-[150px] overflow-hidden">
          {/* Velvet platform */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full velvet-surface border border-bronze-700/30 transition-all duration-500 group-hover:scale-105 group-hover:border-bronze-500/50 group-hover:shadow-[0_0_24px_rgba(201,169,106,0.2)]">
            {/* Ambient inner glow ring */}
            <div className="absolute inset-0 rounded-full bg-bronze-500/5 blur-lg" />
            {/* Icon */}
            {getFileIcon(artifact.fileType)}
            {/* Dashed orbit ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-bronze-700/30 group-hover:rotate-[60deg] transition-transform duration-1000" />
            {/* Solid orbit ring */}
            <div className="absolute inset-4 rounded-full border border-bronze-800/20" />
          </div>

          {/* File type + size pill */}
          <div className="mt-4 relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-950/90 border border-bronze-800/40 text-[8px] font-mono text-parchment-500">
            <span>{artifact.fileType}</span>
            <span className="text-bronze-700">·</span>
            <span>{artifact.fileSize}</span>
          </div>
        </div>

        {/* ── Brass Name Plaque ── */}
        <div className="mx-3 mb-3 p-4 brass-plaque relative transition-colors duration-300">
          {/* Rivet corners */}
          <span className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-bronze-600/80 border border-bronze-400/30" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-bronze-600/80 border border-bronze-400/30" />
          <span className="absolute bottom-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-bronze-600/80 border border-bronze-400/30" />
          <span className="absolute bottom-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-bronze-600/80 border border-bronze-400/30" />

          {/* Artifact name */}
          <h3 className="font-serif text-base leading-snug text-parchment-100 transition-colors group-hover:text-bronze-300 text-center engraved-text">
            {artifact.artifactName}
          </h3>

          {/* Original filename */}
          <p
            className="mt-1 font-mono text-[9px] text-parchment-600 truncate text-center"
            title={artifact.originalFilename}
          >
            {artifact.originalFilename}
          </p>

          {/* Era + Rarity */}
          <div className="mt-2.5 pt-2 border-t border-bronze-800/40 flex items-center justify-between gap-2">
            <span className="font-serif text-[9px] italic text-parchment-500 truncate">{artifact.era}</span>
            <span className={`shrink-0 px-1.5 py-0.5 text-[7px] font-mono tracking-widest border rounded-sm ${rarityColor}`}>
              {artifact.rarity}
            </span>
          </div>
        </div>

        {/* ── Uselessness Gauge + Wayfinding ── */}
        <div className="px-4 pb-4 pt-1 space-y-3">
          <UselessnessMeter score={artifact.uselessnessScore} />

          <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-parchment-600 pt-2 border-t border-bronze-900/40">
            <span className="text-bronze-500">
              {hall ? `WING ${hall.id}` : "VAULT"}
            </span>
            <span className="group-hover:text-bronze-400 transition-colors flex items-center gap-1">
              INSPECT <span className="text-bronze-500">→</span>
            </span>
          </div>
        </div>

        {/* Bottom glass bevel */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />
      </div>
    </div>
  );
}
