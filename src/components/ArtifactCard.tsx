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

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group animate-fade-in-up relative flex flex-col overflow-hidden border border-bronze-700/30 bg-ink-800/50 p-6 text-left transition-all duration-500 hover:border-bronze-500/60 hover:bg-ink-700/50 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
    >
      <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
        <div className="absolute right-3 top-3 rotate-45 border border-bronze-600/40 bg-ink-900 px-8 py-0.5 text-[8px] tracking-widest text-bronze-500">
          {artifact.isSample ? "SAMPLE" : "NEW"}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-widest text-bronze-500">
          EXHIBIT {artifact.accessionNumber}
        </span>
      </div>

      <h3 className="mb-1 font-serif text-xl leading-tight text-parchment-100 transition-colors group-hover:text-bronze-400">
        {artifact.artifactName}
      </h3>

      <p
        className="mb-4 font-mono text-[11px] text-parchment-500 truncate"
        title={artifact.originalFilename}
      >
        {artifact.originalFilename}
      </p>

      <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-widest text-parchment-400">
        <span>{artifact.era}</span>
        <span className="text-bronze-600">·</span>
        <span>{artifact.rarity}</span>
      </div>

      <div className="mb-4 flex-1">
        <UselessnessMeter score={artifact.uselessnessScore} />
      </div>

      <div className="flex items-center justify-between border-t border-bronze-700/20 pt-3">
        <span className="text-[10px] tracking-widest text-parchment-500">
          {hall ? `HALL ${hall.id}` : ""}
        </span>
        <span className="text-[10px] tracking-widest text-parchment-600">
          {formatDate(artifact.discoveredAt)}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze-500/0 to-transparent transition-all duration-500 group-hover:via-bronze-500/60" />
    </button>
  );
}
