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
          className={`group relative flex min-h-[320px] cursor-pointer flex-col items-center justify-center border-2 border-dashed p-8 transition-all duration-500 lg:min-h-[380px] focus:outline-none focus:border-bronze-400 ${
            dragging
              ? "border-bronze-400 bg-bronze-600/5 scale-[1.01]"
              : "border-bronze-700/40 bg-ink-800/30 hover:border-bronze-500/60 hover:bg-ink-800/50"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze-500/5 blur-3xl animate-spotlight" />
          </div>

          <div className="pointer-events-none relative z-10 flex flex-col items-center text-center">
            <div
              className={`mb-6 transition-transform duration-500 ${dragging ? "scale-110" : "group-hover:scale-105"}`}
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                className="text-bronze-500"
              >
                <rect
                  x="8"
                  y="14"
                  width="32"
                  height="40"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 8h28v40"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M24 36l8-8 8 8M32 28v16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="mb-2 font-serif text-2xl text-parchment-100 lg:text-3xl">
              DROP YOUR ARTIFACT HERE
            </h3>
            <p className="mb-6 text-sm tracking-wide text-parchment-500">
              or{" "}
              <span className="text-bronze-400 underline underline-offset-4">
                choose a file
              </span>
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-parchment-600">
              Your original file is not preserved in our museum. Only its
              artifact record may remain.
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in-up border border-bronze-700/40 bg-ink-800/50 p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-bronze-500">
              EXHIBIT CANDIDATE
            </span>
            <div className="h-px flex-1 bg-bronze-700/20" />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="mb-2 break-all font-mono text-lg text-parchment-100">
                {selectedFile.name}
              </p>
              <p className="text-sm tracking-wide text-parchment-400">
                {selectedFile.extension} · {selectedFile.size}
              </p>
              {selectedFile.mimeType !== "application/octet-stream" && (
                <p className="mt-1 text-xs text-parchment-600">
                  {selectedFile.mimeType}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-parchment-500 transition-colors hover:text-bronze-400"
              aria-label="Remove file"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 flex items-center gap-2 border-t border-bronze-700/20 pt-4 text-[10px] tracking-widest text-parchment-600">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze-500" />
            FILE READY FOR ARCHAEOLOGICAL ANALYSIS
          </div>
        </div>
      )}
    </div>
  );
}
