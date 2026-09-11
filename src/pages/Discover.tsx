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

  if (stage === "analyzing") {
    return (
      <div className="min-h-screen px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <AnalysisLoader onComplete={() => {}} duration={MIN_LOAD_TIME} />
        </div>
      </div>
    );
  }

  if (stage === "result" && artifact) {
    const hall = HALLS.find((h) => h.id === artifact.museumHall);
    return (
      <div className="min-h-screen px-6 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center animate-fade-in">
            <span className="font-mono text-[10px] tracking-widest text-bronze-500">
              ARTIFACT DISCOVERED
            </span>
          </div>

          <div className="relative border border-bronze-700/40 bg-ink-900 p-8 shadow-2xl animate-fade-in-up lg:p-12">
            <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
              <div className="absolute right-3 top-3 rotate-45 border border-bronze-600/40 bg-ink-900 px-8 py-0.5 text-[8px] tracking-widest text-bronze-500">
                NEW
              </div>
            </div>

            <h2 className="mb-6 text-center font-serif text-3xl leading-tight text-parchment-100 lg:text-4xl">
              {artifact.artifactName}
            </h2>

            <div className="mx-auto mb-8 h-px w-24 bg-bronze-600/40" />

            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="mb-1 text-[10px] tracking-widest text-parchment-500">ERA</h4>
                <p className="font-serif text-base leading-snug text-parchment-200">{artifact.era}</p>
              </div>
              <div>
                <h4 className="mb-1 text-[10px] tracking-widest text-parchment-500">ARTIFACT TYPE</h4>
                <p className="font-serif text-base leading-snug text-parchment-200">{artifact.artifactType}</p>
              </div>
              <div>
                <h4 className="mb-1 text-[10px] tracking-widest text-parchment-500">ORIGIN</h4>
                <p className="font-serif text-base leading-snug text-parchment-200">{artifact.origin}</p>
              </div>
              <div>
                <h4 className="mb-1 text-[10px] tracking-widest text-parchment-500">RARITY</h4>
                <p className="font-serif text-base leading-snug text-parchment-200">{artifact.rarity}</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="mb-2 text-[10px] tracking-widest text-parchment-500">HISTORICAL SIGNIFICANCE</h4>
              <p className="font-serif text-lg italic leading-relaxed text-parchment-200">{artifact.historicalSignificance}</p>
            </div>

            <div className="mb-8 border border-bronze-700/30 bg-ink-800/50 p-6">
              <UselessnessMeter score={artifact.uselessnessScore} />
            </div>

            <div className="mb-8 border-l-2 border-bronze-500/40 pl-6">
              <h4 className="mb-2 text-[10px] tracking-widest text-bronze-500">CURATOR'S NOTE</h4>
              <p className="font-serif text-lg italic leading-relaxed text-parchment-200">"{artifact.curatorNote}"</p>
            </div>

            <div className="border border-bronze-700/20 bg-ink-950/50 p-6">
              <h4 className="mb-4 text-center text-[10px] tracking-widest text-parchment-500">ARCHIVAL CATALOGUE</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">ORIGINAL FILE</span><span className="text-parchment-200 truncate ml-2 text-right" title={artifact.originalFilename}>{artifact.originalFilename}</span></div>
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">TYPE</span><span className="text-parchment-200 truncate ml-2 text-right">{artifact.fileType}</span></div>
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">SIZE</span><span className="text-parchment-200 ml-2 text-right">{artifact.fileSize}</span></div>
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">DISCOVERED</span><span className="text-parchment-200 ml-2 text-right">{formatDate(artifact.discoveredAt)}</span></div>
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">ACCESSION</span><span className="text-parchment-200 ml-2 text-right">{artifact.accessionNumber}</span></div>
                <div className="flex justify-between items-center border-b border-bronze-700/10 pb-2"><span className="text-parchment-500 shrink-0">HALL</span><span className="text-parchment-200 ml-2 text-right">{hall ? `HALL ${hall.id}` : "—"}</span></div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={handleAddToMuseum}
              className="w-full border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20 sm:w-auto"
            >
              ADD TO MUSEUM
            </button>
            <button
              onClick={handleDiscoverAnother}
              className="w-full border border-parchment-500/30 px-8 py-4 text-xs tracking-widest text-parchment-300 transition-all hover:border-parchment-400/60 sm:w-auto"
            >
              DISCOVER ANOTHER
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="max-w-md text-center animate-fade-in-up">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border border-bronze-700/40">
            <span className="font-serif text-3xl text-bronze-500">!</span>
          </div>
          <h2 className="mb-4 font-serif text-3xl text-parchment-100">
            THE ARCHIVES ARE CURRENTLY UNAVAILABLE
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-parchment-500">
            The artifact resisted classification. Even our experts have given
            up.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20"
            >
              TRY AGAIN
            </button>
            <button
              onClick={handleExploreSample}
              className="border border-parchment-500/30 px-8 py-4 text-xs tracking-widest text-parchment-300 transition-all hover:border-parchment-400/60"
            >
              EXPLORE A SAMPLE ARTIFACT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center animate-fade-in">
          <span className="font-mono text-[10px] tracking-widest text-bronze-500">
            EXCAVATION REQUEST
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-parchment-100 lg:text-5xl">
            BEGIN AN ARCHAEOLOGICAL EXCAVATION
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-parchment-500 lg:text-base">
            Every laptop contains artifacts that civilization has forgotten.
            We would like to know why yours still exists.
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <UploadZone
            onFileSelected={handleFileSelected}
            selectedFile={fileInfo}
            onClear={handleClear}
          />
        </div>

        {fileInfo && (
          <div className="mt-8 animate-fade-in-up text-center">
            <button
              onClick={handleBegin}
              className="group relative overflow-hidden border border-bronze-500 bg-bronze-600/10 px-12 py-5 text-sm tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20"
            >
              <span className="relative z-10">BEGIN EXCAVATION</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-bronze-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={handleExploreSample}
            className="text-xs tracking-widest text-parchment-500 underline underline-offset-8 hover:text-bronze-400"
          >
            OR EXPLORE A SAMPLE ARTIFACT →
          </button>
        </div>
      </div>
    </div>
  );
}
