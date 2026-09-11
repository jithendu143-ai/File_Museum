import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Artifact, FileInfo } from "../types";
import { generateArtifact } from "../lib/curator";
import { safeExtractText } from "../lib/fileUtils";
import { addArtifact, formatDate } from "../lib/storage";
import { HALLS } from "../types";
import UploadZone from "../components/UploadZone";
import AnalysisLoader from "../components/AnalysisLoader";
import UselessnessMeter from "../components/UselessnessMeter";

type Stage = "upload" | "analyzing" | "result" | "error";

/* Shared brass button */
function BrassButton({
  onClick,
  children,
  secondary,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-[10px] tracking-[0.25em] transition-all duration-300 ${className} ${
        secondary
          ? "border border-parchment-600/20 px-8 py-4 text-parchment-400 hover:border-parchment-500/40 hover:text-parchment-200 bg-ink-900/50"
          : "px-10 py-4 text-bronze-300 hover:text-bronze-200 hover:shadow-[0_0_24px_rgba(201,169,106,0.18)]"
      }`}
      style={
        !secondary
          ? {
              background: "linear-gradient(175deg, #2a1f10 0%, #1a1308 50%, #110d06 100%)",
              border: "1px solid rgba(201,169,106,0.45)",
              boxShadow:
                "inset 0 1px 0 rgba(201,169,106,0.25), inset 0 -1px 0 rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.5)",
            }
          : undefined
      }
    >
      <span className="relative z-10">{children}</span>
      {!secondary && (
        <>
          <span className="absolute top-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute top-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute bottom-1.5 left-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
          <span className="absolute bottom-1.5 right-1.5 h-1 w-1 rounded-full bg-bronze-600/70" />
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bronze-400/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </>
      )}
    </button>
  );
}

export default function Discover() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [artifact, setArtifact] = useState<Artifact | null>(null);

  const handleFileSelected = (f: File, info: FileInfo) => {
    setFile(f);
    setFileInfo(info);
  };

  const handleClear = () => {
    setFile(null);
    setFileInfo(null);
  };

  const MIN_LOAD_TIME = 4500;

  const handleBegin = async () => {
    if (!file || !fileInfo) return;
    setStage("analyzing");

    try {
      const extractedText = await safeExtractText(file);
      const [result] = await Promise.all([
        generateArtifact(fileInfo, extractedText),
        new Promise((r) => setTimeout(r, MIN_LOAD_TIME)),
      ]);
      setArtifact(result);
      setStage("result");
    } catch (err) {
      console.error("Analysis failed:", err);
      setStage("error");
    }
  };

  const handleAddToMuseum = () => {
    if (artifact) {
      addArtifact(artifact);
      navigate("/museum");
    }
  };

  const handleExploreSample = () => {
    navigate("/museum");
  };

  const handleRetry = () => {
    setStage("upload");
    setArtifact(null);
  };

  const handleDiscoverAnother = () => {
    setFile(null);
    setFileInfo(null);
    setArtifact(null);
    setStage("upload");
  };

  /* ── Analyzing state ── */
  if (stage === "analyzing") {
    return (
      <div className="min-h-screen px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <AnalysisLoader onComplete={() => {}} duration={MIN_LOAD_TIME} />
        </div>
      </div>
    );
  }

  /* ── Result state ── */
  if (stage === "result" && artifact) {
    const hall = HALLS.find((h) => h.id === artifact.museumHall);
    return (
      <div className="min-h-screen px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          {/* Label */}
          <div className="mb-6 text-center animate-fade-in">
            <span className="font-mono text-[9px] tracking-[0.35em] text-bronze-600 uppercase">
              Artifact Discovered
            </span>
          </div>

          {/* Result panel */}
          <div
            className="relative border border-bronze-700/45 shadow-[0_32px_80px_rgba(0,0,0,0.9)] animate-fade-in-up"
            style={{ background: "linear-gradient(175deg, #1a1612 0%, #110e0a 40%, #0d0b08 100%)" }}
          >
            {/* Top double line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-600/50 to-transparent" />
            <div className="mt-0.5 h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />

            {/* NEW ribbon */}
            <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden pointer-events-none">
              <div className="absolute right-2 top-4 rotate-45 border border-bronze-600/40 bg-ink-900 px-6 py-0.5 text-[7px] tracking-[0.2em] text-bronze-500 font-mono">
                NEW
              </div>
            </div>

            <div className="p-8 lg:p-12">
              {/* Title */}
              <h2 className="mb-2 text-center font-serif text-3xl leading-tight text-parchment-100 lg:text-4xl engraved-text">
                {artifact.artifactName}
              </h2>

              {/* Hall badge */}
              {hall && (
                <div className="mb-6 text-center">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-bronze-500 border border-bronze-800/50 px-3 py-1 bg-ink-950/40">
                    {hall.name.toUpperCase()} · HALL {hall.id}
                  </span>
                </div>
              )}

              {/* Gold divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-bronze-700/40" />
                <svg viewBox="0 0 24 12" className="w-5 text-bronze-600" fill="currentColor">
                  <path d="M12 0L14 4H22L16 7L18 12L12 8L6 12L8 7L2 4H10L12 0Z" />
                </svg>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-bronze-700/40" />
              </div>

              {/* Metadata plaque */}
              <div className="mb-8 grid gap-5 sm:grid-cols-2 p-6 brass-plaque relative">
                <span className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
                <span className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
                <span className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-bronze-600/70 border border-bronze-400/25" />
                {[
                  { label: "ERA", value: artifact.era },
                  { label: "ARTIFACT TYPE", value: artifact.artifactType },
                  { label: "ORIGIN", value: artifact.origin },
                  { label: "RARITY", value: artifact.rarity },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <h4 className="mb-1 text-[8px] tracking-[0.3em] text-bronze-600 font-mono uppercase">{label}</h4>
                    <p className="font-serif text-base text-parchment-200">{value}</p>
                  </div>
                ))}
              </div>

              {/* Historical significance */}
              <div className="mb-8 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-bronze-600/40 to-transparent" />
                <h4 className="mb-3 text-[9px] tracking-[0.3em] text-bronze-600 font-mono uppercase">Historical Significance</h4>
                <div className="p-5 bg-walnut-900/80 border border-bronze-800/30"
                  style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)" }}>
                  <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
                    {artifact.historicalSignificance}
                  </p>
                </div>
              </div>

              {/* Uselessness meter */}
              <div className="mb-8 p-5 border border-bronze-800/30 bg-ink-950/50">
                <UselessnessMeter score={artifact.uselessnessScore} />
              </div>

              {/* Curator's note */}
              <div className="mb-8 border-l-2 border-bronze-600/40 pl-6 relative">
                <div className="absolute -left-1 top-0 h-2 w-2 rounded-full bg-bronze-600" />
                <div className="absolute -left-1 bottom-0 h-2 w-2 rounded-full bg-bronze-600" />
                <h4 className="mb-2 text-[9px] tracking-[0.3em] text-bronze-500 font-mono uppercase">Curator's Note</h4>
                <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
                  "{artifact.curatorNote}"
                </p>
              </div>

              {/* Archival catalogue */}
              <div className="border border-bronze-800/30 bg-ink-950/70">
                <div className="border-b border-bronze-800/30 px-6 py-3 flex items-center gap-3">
                  <div className="h-px flex-1 bg-bronze-900/60" />
                  <h4 className="font-mono text-[9px] tracking-[0.3em] text-parchment-600">ARCHIVAL CATALOGUE</h4>
                  <div className="h-px flex-1 bg-bronze-900/60" />
                </div>
                <div className="p-6 grid grid-cols-2 gap-x-8 font-mono text-xs">
                  {[
                    { label: "ORIGINAL FILE", value: artifact.originalFilename },
                    { label: "TYPE", value: artifact.fileType },
                    { label: "SIZE", value: artifact.fileSize },
                    { label: "DISCOVERED", value: formatDate(artifact.discoveredAt) },
                    { label: "ACCESSION", value: artifact.accessionNumber },
                    { label: "HALL", value: hall ? `HALL ${hall.id}` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center border-b border-bronze-900/40 py-2.5">
                      <span className="text-parchment-600 shrink-0 text-[9px] tracking-widest">{label}</span>
                      <span className="text-parchment-300 truncate ml-3 text-right" title={value}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom double line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-800/30 to-transparent" />
            <div className="mt-0.5 h-px w-full bg-gradient-to-r from-transparent via-bronze-600/50 to-transparent" />
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <BrassButton onClick={handleAddToMuseum} className="w-full sm:w-auto">
              ADD TO MUSEUM
            </BrassButton>
            <BrassButton onClick={handleDiscoverAnother} secondary className="w-full sm:w-auto">
              DISCOVER ANOTHER
            </BrassButton>
          </div>
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (stage === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="max-w-md text-center animate-fade-in-up">
          {/* Error placard */}
          <div
            className="mb-8 relative border border-bronze-700/30 p-8"
            style={{ background: "linear-gradient(175deg, #1a1210 0%, #0d0907 100%)" }}
          >
            <span className="absolute top-2 left-2 h-2 w-2 border-t border-l border-bronze-700/40" />
            <span className="absolute top-2 right-2 h-2 w-2 border-t border-r border-bronze-700/40" />
            <span className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-bronze-700/40" />
            <span className="absolute bottom-2 right-2 h-2 w-2 border-b border-r border-bronze-700/40" />

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-bronze-700/40">
              <span className="font-serif text-3xl text-bronze-600">!</span>
            </div>
            <h2 className="mb-3 font-serif text-2xl text-parchment-100 tracking-[0.04em]">
              ARCHIVES UNAVAILABLE
            </h2>
            <div className="mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />
            <p className="text-sm leading-relaxed text-parchment-500 font-serif italic">
              The artifact resisted classification. Even our most seasoned experts have given up.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <BrassButton onClick={handleRetry} className="w-full">TRY AGAIN</BrassButton>
            <BrassButton onClick={handleExploreSample} secondary className="w-full">
              EXPLORE A SAMPLE ARTIFACT
            </BrassButton>
          </div>
        </div>
      </div>
    );
  }

  /* ── Upload state ── */
  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        {/* Page header — excavation field aesthetic */}
        <div className="mb-12 text-center animate-fade-in">
          <span className="font-mono text-[9px] tracking-[0.4em] text-bronze-600 uppercase">
            Excavation Request
          </span>

          {/* Field coordinates strip */}
          <div className="mt-2 mb-4 flex items-center justify-center gap-4">
            <span className="font-mono text-[8px] tracking-[0.2em] text-bronze-800">
              LAT 51°30′N
            </span>
            <div className="h-px w-8 bg-bronze-800/40" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-bronze-800">
              LNG 0°7′W
            </span>
          </div>

          <h1 className="font-serif text-4xl leading-tight text-parchment-100 lg:text-5xl engraved-text">
            BEGIN AN ARCHAEOLOGICAL
            <br />
            <span className="text-bronze-400">EXCAVATION</span>
          </h1>

          <div className="mx-auto mt-5 max-w-xs">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-bronze-700/40 to-transparent" />
            <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-bronze-800/20 to-transparent" />
          </div>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-parchment-500 lg:text-base">
            Every laptop contains artifacts that civilization has forgotten.
            We would like to know why yours still exists.
          </p>
        </div>

        {/* Upload zone */}
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <UploadZone
            onFileSelected={handleFileSelected}
            selectedFile={fileInfo}
            onClear={handleClear}
          />
        </div>

        {/* Begin excavation CTA */}
        {fileInfo && (
          <div className="mt-8 animate-fade-in-up text-center">
            <BrassButton onClick={handleBegin} className="w-full sm:w-auto px-16 py-5">
              BEGIN EXCAVATION
            </BrassButton>
          </div>
        )}

        {/* Explore sample */}
        <div className="mt-10 text-center">
          <button
            onClick={handleExploreSample}
            className="text-[9px] tracking-[0.25em] text-parchment-600 underline underline-offset-8 hover:text-bronze-400 transition-colors font-mono uppercase"
          >
            Or explore a sample artifact →
          </button>
        </div>
      </div>
    </div>
  );
}
