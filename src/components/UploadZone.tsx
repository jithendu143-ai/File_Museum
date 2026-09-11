import { useState, useRef, useCallback } from "react";
import type { FileInfo } from "../types";
import { getFileInfo } from "../lib/fileUtils";

interface Props {
  onFileSelected: (file: File, info: FileInfo) => void;
  selectedFile: FileInfo | null;
  onClear: () => void;
}

export default function UploadZone({
  onFileSelected,
  selectedFile,
  onClear,
}: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const info = getFileInfo(file);
      onFileSelected(file, info);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleClear = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
    onClear();
  }, [onClear]);

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {!selectedFile ? (
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          aria-label="Upload file to museum"
          className={`group relative flex min-h-[340px] cursor-pointer flex-col items-center justify-center p-8 transition-all duration-500 focus:outline-none lg:min-h-[400px] ${
            dragging
              ? "scale-[1.01]"
              : ""
          }`}
          style={{
            background: dragging
              ? "linear-gradient(175deg, #1c1710 0%, #130f09 100%)"
              : "linear-gradient(175deg, #15120d 0%, #0d0a07 100%)",
            border: dragging
              ? "1px solid rgba(201,169,106,0.5)"
              : "1px solid rgba(110,82,35,0.25)",
            boxShadow: dragging
              ? "inset 0 0 60px rgba(201,169,106,0.05), 0 0 40px rgba(201,169,106,0.08)"
              : "inset 0 0 40px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Excavation grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,169,106,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,106,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner markers — archaeological quadrant style */}
          <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-bronze-700/40" />
          <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-bronze-700/40" />
          <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-bronze-700/40" />
          <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-bronze-700/40" />

          {/* Hover spotlight bloom */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-bronze-500/6 blur-3xl" />
          </div>

          {/* Content */}
          <div className="pointer-events-none relative z-10 flex flex-col items-center text-center gap-6">
            {/* Animated trowel/upload icon */}
            <div className={`transition-transform duration-500 ${dragging ? "scale-110 -translate-y-2" : "group-hover:scale-105 group-hover:-translate-y-1"}`}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                className="text-bronze-600"
              >
                {/* Base document */}
                <rect x="10" y="16" width="36" height="44" rx="2" stroke="currentColor" strokeWidth="1.4" />
                {/* Folded corner */}
                <path d="M34 16L46 28H34V16Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                {/* Upload arrow */}
                <path
                  d="M28 52V36M22 42L28 36L34 42"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dashed ghost duplicate (excavation grid visual) */}
                <rect x="18" y="8" width="36" height="44" rx="2" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />
              </svg>
            </div>

            {/* Main CTA text */}
            <div>
              <h3 className="font-serif text-2xl text-parchment-100 lg:text-3xl engraved-text">
                {dragging ? "Release to Submit" : "DROP YOUR ARTIFACT HERE"}
              </h3>
              <p className="mt-2 text-sm tracking-wide text-parchment-500">
                or{" "}
                <span className="text-bronze-400 underline underline-offset-4 cursor-pointer hover:text-bronze-300 transition-colors">
                  browse the archives
                </span>
              </p>
            </div>

            {/* Archaeological notice */}
            <div className="max-w-xs border border-bronze-800/30 bg-ink-950/40 px-4 py-3">
              <p className="text-[9px] leading-relaxed text-parchment-600 font-mono tracking-wide">
                ⚠ Your original file is not preserved.
                Only its artifact record will remain in the museum.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in-up border border-bronze-600/40 bg-ink-800/60"
          style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4), 0 0 30px rgba(201,169,106,0.06)" }}>
          {/* Exhibit candidate banner */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-bronze-700/20 bg-bronze-900/20">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500 shadow-[0_0_8px_rgba(201,169,106,0.8)]" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-bronze-400 uppercase">
              Exhibit Candidate — Awaiting Classification
            </span>
            <div className="flex-1 h-px bg-bronze-800/40" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="mb-2 break-all font-mono text-lg text-parchment-100">
                  {selectedFile.name}
                </p>
                <p className="text-sm tracking-wide text-parchment-400">
                  {selectedFile.extension} · {selectedFile.size}
                </p>
                {selectedFile.mimeType !== "application/octet-stream" && (
                  <p className="mt-1 text-xs text-parchment-600 font-mono">
                    {selectedFile.mimeType}
                  </p>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bronze-800/40 text-parchment-500 transition-all hover:border-bronze-600/60 hover:text-bronze-400 text-sm"
                aria-label="Remove file"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-bronze-800/20 pt-4 text-[9px] tracking-[0.25em] text-parchment-600 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze-500 animate-pulse" />
              FILE READY FOR ARCHAEOLOGICAL ANALYSIS
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
