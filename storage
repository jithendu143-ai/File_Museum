import type { Artifact } from "../types";
import { sampleArtifacts } from "../data/sampleArtifacts";

const STORAGE_KEY = "museum-artifacts";

export function getStoredArtifacts(): Artifact[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Artifact[];
  } catch {
    return [];
  }
}

export function saveArtifacts(artifacts: Artifact[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts));
  } catch {
    // storage full or unavailable — non-critical
  }
}

export function addArtifact(artifact: Artifact): Artifact[] {
  const existing = getStoredArtifacts();
  const filtered = existing.filter((a) => a.id !== artifact.id);
  const updated = [artifact, ...filtered];
  saveArtifacts(updated);
  return updated;
}

export function removeArtifact(id: string): Artifact[] {
  const existing = getStoredArtifacts();
  const updated = existing.filter((a) => a.id !== id);
  saveArtifacts(updated);
  return updated;
}

export function getAllArtifacts(): Artifact[] {
  const stored = getStoredArtifacts();
  return [...stored, ...sampleArtifacts];
}

export function getNextAccessionNumber(): string {
  const all = getAllArtifacts();
  let maxNum = 0;
  for (const item of all) {
    const match = item.accessionNumber?.match(/(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }
  const year = new Date().getFullYear();
  return `FM-${year}-${String(maxNum + 1).padStart(4, "0")}`;
}

export function formatDate(iso?: string): string {
  if (!iso) return "Unknown Date";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Unknown Date";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
