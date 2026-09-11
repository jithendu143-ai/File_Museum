import { useState, useEffect } from "react";

const MESSAGES = [
  "Examining file structure…",
  "Determining probable civilization…",
  "Consulting the archives…",
  "Estimating historical significance…",
  "Questioning why this file exists…",
  "Calculating unnecessary importance…",
  "Assigning museum classification…",
];

interface Props {
  onComplete: () => void;
  duration?: number;
}

export default function AnalysisLoader({ onComplete, duration = 4500 }: Props) {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = duration / MESSAGES.length;
    const msgTimer = setInterval(() => {
      setCurrentMsg((prev) => Math.min(prev + 1, MESSAGES.length - 1));
    }, msgInterval);

    const progressInterval = 50;
    const progressInc = (100 / duration) * progressInterval;
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + progressInc;
        return next >= 100 ? 100 : next;
      });
    }, progressInterval);

    const completeTimer = setTimeout(() => onComplete(), duration);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center animate-fade-in">
      <div className="relative mb-12 flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-bronze-700/20" />
        <div className="absolute inset-4 rounded-full border border-bronze-700/30" />
        <div className="absolute inset-8 rounded-full border border-bronze-600/40" />
        <div
          className="absolute inset-0 rounded-full border-t-2 border-bronze-400"
          style={{
            animation: "spin 2s linear infinite",
          }}
        />
        <div className="absolute inset-0 animate-scan-line overflow-hidden rounded-full">
          <div className="h-20 w-full bg-gradient-to-b from-bronze-400/10 to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <div className="font-serif text-3xl text-bronze-400">
            {Math.round(progress)}
          </div>
          <div className="text-[9px] tracking-widest text-parchment-600">
            ANALYZING
          </div>
        </div>
      </div>

      <h2 className="mb-2 text-center font-serif text-2xl text-parchment-100 lg:text-3xl">
        DIGITAL ARCHAEOLOGICAL ANALYSIS
      </h2>

      <p className="mb-10 text-xs tracking-widest text-parchment-500">
        {MESSAGES[currentMsg]}
      </p>

      <div className="w-full max-w-md">
        <div className="h-px w-full bg-ink-700">
          <div
            className="h-px bg-bronze-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] tracking-widest text-parchment-600">
          <span>EXCAVATION IN PROGRESS</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
