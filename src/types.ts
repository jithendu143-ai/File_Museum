export interface Artifact {
  id: string;
  accessionNumber: string;
  artifactName: string;
  era: string;
  artifactType: string;
  origin: string;
  historicalSignificance: string;
  uselessnessScore: number;
  rarity: string;
  museumHall: string;
  curatorNote: string;
  originalFilename: string;
  fileType: string;
  fileSize: string;
  discoveredAt: string;
  isSample: boolean;
}

export interface FileInfo {
  name: string;
  extension: string;
  mimeType: string;
  size: string;
  sizeBytes: number;
}

export const HALLS = [
  {
    id: "I",
    name: "ACADEMIC ARCHAEOLOGY",
    description:
      "For assignments, reports, projects and academic files.",
  },
  {
    id: "II",
    name: "THE ABANDONED WORKS",
    description: "For unfinished projects and forgotten work.",
  },
  {
    id: "III",
    name: "THINGS WE WERE DEFINITELY GOING TO USE",
    description: "For random downloads and files saved with good intentions.",
  },
  {
    id: "IV",
    name: "DIGITAL IMPULSE",
    description: "For screenshots, random images and temporary files.",
  },
  {
    id: "V",
    name: "THE LOST DOWNLOADS",
    description: "For mysterious files whose origin is unknown.",
  },
] as const;

export const RARITIES = [
  "COMMON",
  "UNCOMMON",
  "RARE",
  "VERY RARE",
  "LEGENDARY",
  "UNNECESSARILY IMPORTANT",
] as const;
