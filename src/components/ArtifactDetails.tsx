import { useEffect } from "react";
import type { Artifact } from "../types";
import { HALLS } from "../types";
import { formatDate } from "../lib/storage";
import UselessnessMeter from "./UselessnessMeter";

interface Props {
  artifact: Artifact;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function ArtifactDetails({ artifact, onClose, onDelete }: Props) {
  const hall = HALLS.find((h) => h.id === artifact.museumHall);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={artifact.artifactName}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto px-4 py-8 animate-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(100,70,20,0.18) 0%, rgba(10,9,8,0.96) 65%), rgba(10,9,8,0.92)",
        backdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-3xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Architectural arch / lintel motif */}
        <div className="relative flex items-end justify-center mb-0">
          <svg viewBox="0 0 600 40" className="w-full text-bronze-700/40" fill="none">
            <path d="M0 40 L0 20 Q300 -10 600 20 L600 40 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M0 40 L0 22 Q300 -8 600 22 L600 40" stroke="currentColor" strokeWidth="0.8" />
            <path d="M60 40 L60 28 Q300 4 540 28 L540 40" stroke="currentColor" strokeWidth="0.4" />
            {/* Keystone */}
            <polygon points="295,2 305,2 308,12 292,12" fill="currentColor" fillOpacity="0.3" />
            <polygon points="295,2 305,2 308,12 292,12" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Main exhibit panel */}
        <div
          className="border border-bronze-700/50 bg-ink-900 shadow-[0_32px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(201,169,106,0.06)] lg:p-12 p-8"
          style={{
            background: "linear-gradient(175deg, #1a1612 0%, #110e0a 40%, #0d0b08 100%)",
          }}
        >
          {/* Top decorative double line */}
          <div className="mb-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-600/50 to-transparent" />
            <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />
          </div>

          {/* Close button — styled as brass disc */}
          <button
            onClick={onClose}
            className="absolute right-5 top-12 flex h-8 w-8 items-center justify-center rounded-full border border-bronze-700/40 bg-ink-800 text-parchment-500 text-xs transition-all hover:border-bronze-500 hover:text-bronze-400 hover:shadow-[0_0_12px_rgba(201,169,106,0.2)]"
            aria-label="Close exhibit"
          >
            ✕
          </button>

          {/* Label: Artifact Discovered */}
          <div className="mb-3 text-center">
            <span className="font-mono text-[9px] tracking-[0.35em] text-bronze-600 uppercase">
              Exhibit On Display
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-center font-serif text-3xl leading-tight text-parchment-100 lg:text-4xl engraved-text">
            {artifact.artifactName}
          </h2>

          {/* Hall badge */}
          {hall && (
            <div className="mb-6 text-center">
              <span className="inline-block font-mono text-[9px] tracking-[0.3em] text-bronze-500 border border-bronze-800/60 px-3 py-1 bg-ink-950/40">
                {hall.name.toUpperCase()} · HALL {hall.id}
              </span>
            </div>
          )}

          {/* Gold ornamental divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/40" />
            <svg viewBox="0 0 24 12" className="w-6 text-bronze-600" fill="currentColor">
              <path d="M12 0L14 4H22L16 7L18 12L12 8L6 12L8 7L2 4H10L12 0Z" />
            </svg>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/40" />
          </div>

          {/* Metadata grid — engraved plaque style */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 p-6 brass-plaque relative">
            {/* Rivet corners */}
            <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
            <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
            <span className="absolute bottom-2 right-2 h-2 w-2 rounded-full bg-bronze-600/70 border border-bronze-400/25" />

            <DetailField label="ERA" value={artifact.era} />
            <DetailField label="ARTIFACT TYPE" value={artifact.artifactType} />
            <DetailField label="ORIGIN" value={artifact.origin} />
            <DetailField label="RARITY" value={artifact.rarity} />
          </div>

          {/* Historical Significance — scroll/parchment style */}
          <div className="mb-8 relative">
            <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-bronze-600/50 to-transparent" />
            <h4 className="mb-3 text-[9px] tracking-[0.35em] text-bronze-500 uppercase font-mono">
              Historical Significance
            </h4>
            <div className="relative p-5 bg-walnut-900/80 border border-bronze-800/30"
              style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5), inset 0 -1px 4px rgba(0,0,0,0.3)" }}>
              <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-800/20 to-transparent" />
              <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
                {artifact.historicalSignificance}
              </p>
              <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze-800/20 to-transparent" />
            </div>
          </div>

          {/* Uselessness Meter */}
          <div className="mb-8 p-5 border border-bronze-800/30 bg-ink-950/50">
            <UselessnessMeter score={artifact.uselessnessScore} />
          </div>

          {/* Curator's Note — letterpress framed aside */}
          <div className="mb-8 relative border-l-2 border-bronze-600/40 pl-6">
            <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-bronze-600 border border-bronze-400/30" />
            <div className="absolute -left-1 bottom-0 h-2 w-2 rounded-full bg-bronze-600 border border-bronze-400/30" />
            <h4 className="mb-2 text-[9px] tracking-[0.3em] text-bronze-500 font-mono uppercase">
              Curator's Note
            </h4>
            <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
              "{artifact.curatorNote}"
            </p>
          </div>

          {/* Archival Catalogue — ledger-book style */}
          <div className="border border-bronze-800/30 bg-ink-950/70">
            <div className="border-b border-bronze-800/30 px-6 py-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-bronze-900/60" />
              <h4 className="font-mono text-[9px] tracking-[0.35em] text-parchment-600 uppercase">
                Archival Catalogue
              </h4>
              <div className="h-px flex-1 bg-bronze-900/60" />
            </div>
            <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-0 font-mono text-xs">
              <CatalogueRow label="ORIGINAL FILE" value={artifact.originalFilename} />
              <CatalogueRow label="TYPE" value={artifact.fileType} />
              <CatalogueRow label="SIZE" value={artifact.fileSize} />
              <CatalogueRow label="DISCOVERED" value={formatDate(artifact.discoveredAt)} />
              <CatalogueRow label="ACCESSION" value={artifact.accessionNumber} />
              <CatalogueRow label="HALL" value={hall ? `HALL ${hall.id}` : "—"} />
            </div>
          </div>

          {/* Deaccession option */}
          {!artifact.isSample && onDelete && (
            <div className="mt-8 text-center border-t border-bronze-800/20 pt-6">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you wish to deaccession "${artifact.artifactName}" from the permanent collection?`
                    )
                  ) {
                    onDelete(artifact.id);
                    onClose();
                  }
                }}
                className="text-[9px] tracking-[0.2em] text-parchment-700 hover:text-red-400 transition-colors uppercase font-mono"
              >
                ⊗ Deaccession Artifact — Remove from Museum
              </button>
            </div>
          )}

          {/* Bottom double line */}
          <div className="mt-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />
            <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-bronze-600/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="mb-1 text-[8px] tracking-[0.3em] text-bronze-600 font-mono uppercase">
        {label}
      </h4>
      <p className="font-serif text-base leading-snug text-parchment-200">
        {value}
      </p>
    </div>
  );
}

function CatalogueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-bronze-900/40 py-2.5">
      <span className="text-parchment-600 shrink-0 text-[9px] tracking-widest">{label}</span>
      <span className="text-parchment-300 truncate ml-3 text-right" title={value}>
        {value}
      </span>
    </div>
  );
}
