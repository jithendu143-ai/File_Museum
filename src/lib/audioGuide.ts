// Museum Audio Guide Speech Synthesizer

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function isAudioGuideAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopAudioGuide(): void {
  if (isAudioGuideAvailable()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function playCuratorAudio(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): void {
  if (!isAudioGuideAvailable()) {
    onEnd?.();
    return;
  }

  stopAudioGuide();

  // Clean quotes or brackets
  const cleanText = text.replace(/["“”]/g, "").trim();
  if (!cleanText) {
    onEnd?.();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  // Try selecting a distinguished scholarly voice (en-GB or en-US)
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((v) => v.lang.startsWith("en-GB") && v.name.toLowerCase().includes("natural")) ||
    voices.find((v) => v.lang.startsWith("en-GB")) ||
    voices.find((v) => v.lang.startsWith("en-US") && v.name.toLowerCase().includes("natural")) ||
    voices.find((v) => v.lang.startsWith("en"));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.rate = 0.92; // slightly measured museum curator cadence
  utterance.pitch = 0.95; // slightly deeper scholarly tone

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = () => {
    currentUtterance = null;
    onError?.();
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}
