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
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink-950/80 px-4 py-10 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-3xl border border-bronze-700/40 bg-ink-900 p-8 shadow-2xl animate-fade-in-up lg:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-parchment-400 transition-colors hover:text-bronze-400"
          aria-label="Close exhibit"
        >
          ✕
        </button>

        <div className="mb-2 text-center">
          <span className="font-mono text-[10px] tracking-widest text-bronze-500">
            ARTIFACT DISCOVERED
          </span>
        </div>

        <h2 className="mb-6 text-center font-serif text-3xl leading-tight text-parchment-100 lg:text-4xl">
          {artifact.artifactName}
        </h2>

        <div className="mx-auto mb-8 h-px w-24 bg-bronze-600/40" />

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <DetailField label="ERA" value={artifact.era} />
          <DetailField label="ARTIFACT TYPE" value={artifact.artifactType} />
          <DetailField label="ORIGIN" value={artifact.origin} />
          <DetailField label="RARITY" value={artifact.rarity} />
        </div>

        <div className="mb-8">
          <h4 className="mb-2 text-[10px] tracking-widest text-parchment-500">
            HISTORICAL SIGNIFICANCE
          </h4>
          <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
            {artifact.historicalSignificance}
          </p>
        </div>

        <div className="mb-8 border border-bronze-700/30 bg-ink-800/50 p-6">
          <UselessnessMeter score={artifact.uselessnessScore} />
        </div>

        <div className="mb-8 border-l-2 border-bronze-500/40 pl-6">
          <h4 className="mb-2 text-[10px] tracking-widest text-bronze-500">
            CURATOR'S NOTE
          </h4>
          <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
            "{artifact.curatorNote}"
          </p>
        </div>

        <div className="border border-bronze-700/20 bg-ink-950/50 p-6">
          <h4 className="mb-4 text-center text-[10px] tracking-widest text-parchment-500">
            ARCHIVAL CATALOGUE
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
            <CatalogueRow label="ORIGINAL FILE" value={artifact.originalFilename} />
            <CatalogueRow label="TYPE" value={artifact.fileType} />
            <CatalogueRow label="SIZE" value={artifact.fileSize} />
            <CatalogueRow label="DISCOVERED" value={formatDate(artifact.discoveredAt)} />
            <CatalogueRow label="ACCESSION" value={artifact.accessionNumber} />
            <CatalogueRow label="HALL" value={hall ? `HALL ${hall.id}` : "—"} />
          </div>
        </div>

        {!artifact.isSample && onDelete && (
          <div className="mt-8 text-center border-t border-bronze-700/20 pt-6">
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
              className="text-[10px] tracking-widest text-parchment-600 hover:text-red-400 transition-colors uppercase"
            >
              Deaccession Artifact (Remove from Museum)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="mb-1 text-[10px] tracking-widest text-parchment-500">
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
    <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2">
      <span className="text-parchment-500 shrink-0">{label}</span>
      <span className="text-parchment-200 truncate ml-2 text-right" title={value}>
        {value}
      </span>
    </div>
  );
}
