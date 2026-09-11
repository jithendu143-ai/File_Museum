import type { Artifact, FileInfo } from "../types";
import { sampleArtifacts } from "../data/sampleArtifacts";
import { getNextAccessionNumber } from "./storage";
import { getFileTypeLabel } from "./fileUtils";

const env = import.meta.env as Record<string, string | undefined>;
const API_KEY = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_PROMPT = `You are the Chief Curator of The Museum of Things You Never Needed, a completely fictional museum dedicated to preserving digital files that humanity had absolutely no reason to keep.

Your role: Treat every uploaded file as a priceless archaeological discovery. Analyze the filename, file type, and size with ridiculous seriousness. Generate a fictional museum record that is absurd yet written in the formal, measured tone of a real museum curator.

CRITICAL RULES:
- Never present fictional claims as real history. Everything is fictional.
- Be concise. Each text field should be 1-2 sentences.
- The humor comes from treating insignificant files with extreme scholarly seriousness.
- The uselessness score (0-100) should generally be high (80-100) since everything in this museum is useless.
- Choose the museumHall from exactly these options:
  I = Academic Archaeology (assignments, reports, projects, academic files)
  II = The Abandoned Works (unfinished projects, forgotten work)
  III = Things We Were Definitely Going to Use (random downloads, good intentions)
  IV = Digital Impulse (screenshots, random images, temporary files)
  V = The Lost Downloads (mysterious files, unknown origin)
- Choose rarity from exactly: COMMON, UNCOMMON, RARE, VERY RARE, LEGENDARY, UNNECESSARILY IMPORTANT

Return ONLY valid JSON matching this schema (no markdown, no code fences):
{
  "artifactName": "string - a dramatic museum-style name",
  "era": "string - a fictional historical era",
  "artifactType": "string - a formal artifact classification",
  "origin": "string - where it was 'discovered'",
  "historicalSignificance": "string - 1-2 sentences of absurd scholarly analysis",
  "uselessnessScore": number 0-100,
  "rarity": "one of the rarity values above",
  "museumHall": "one of I, II, III, IV, V",
  "curatorNote": "string - 1-2 sentences, a dry witty observation in quotes"
}`;

const VALID_RARITIES = [
  "COMMON",
  "UNCOMMON",
  "RARE",
  "VERY RARE",
  "LEGENDARY",
  "UNNECESSARILY IMPORTANT",
] as const;

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      // Insecure context fallback
    }
  }
  return `artifact-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function extractJson(text: string): Record<string, unknown> {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned) as Record<string, unknown>;
}

function normalizeHall(rawHall: unknown): string {
  if (typeof rawHall === "string") {
    const s = rawHall.trim().toUpperCase();
    if (s === "I" || s === "1" || s.includes("ACADEMIC")) return "I";
    if (s === "II" || s === "2" || s.includes("ABANDONED")) return "II";
    if (s === "III" || s === "3" || s.includes("DEFINITELY")) return "III";
    if (s === "IV" || s === "4" || s.includes("IMPULSE")) return "IV";
    if (s === "V" || s === "5" || s.includes("LOST")) return "V";
    const match = s.match(/\b(I|II|III|IV|V)\b/);
    if (match) return match[1];
  }
  return "V";
}

function normalizeRarity(rawRarity: unknown): string {
  if (typeof rawRarity === "string") {
    const s = rawRarity.trim().toUpperCase().replace(/_/g, " ");
    const found = VALID_RARITIES.find((r) => r === s);
    if (found) return found;
  }
  return "RARE";
}

function normalizeScore(rawScore: unknown): number {
  let score: number;
  if (typeof rawScore === "number") {
    score = rawScore;
  } else if (typeof rawScore === "string") {
    score = parseFloat(rawScore.replace(/[^\d.]/g, ""));
  } else {
    score = 95;
  }
  if (!Number.isFinite(score)) score = 95;
  return Math.min(100, Math.max(0, Math.round(score * 10) / 10));
}

export async function generateArtifact(
  fileInfo: FileInfo,
  extractedText: string
): Promise<Artifact> {
  const userPrompt = `Analyze this digital artifact:
- Filename: ${fileInfo.name}
- Extension: ${fileInfo.extension}
- MIME type: ${fileInfo.mimeType}
- File size: ${fileInfo.size}
${extractedText ? `- Sample content: "${extractedText}"` : ""}

Generate the museum record as JSON.`;

  if (!API_KEY) {
    return generateFallbackArtifact(fileInfo);
  }

  try {
    const res = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 1.2,
          topP: 0.95,
          maxOutputTokens: 600,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!res.ok) throw new Error(`API returned ${res.status}`);

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response");

    const parsed = extractJson(text);

    return buildArtifact(parsed, fileInfo);
  } catch (err) {
    console.warn("Curator API failed, using fallback:", err);
    return generateFallbackArtifact(fileInfo);
  }
}

function buildArtifact(
  parsed: Record<string, unknown>,
  fileInfo: FileInfo
): Artifact {
  return {
    id: generateId(),
    accessionNumber: getNextAccessionNumber(),
    artifactName: String(parsed.artifactName || "Untitled Artifact"),
    era: String(parsed.era || "Unknown Era"),
    artifactType: String(parsed.artifactType || "Digital Relic"),
    origin: String(parsed.origin || "Unknown"),
    historicalSignificance: String(
      parsed.historicalSignificance || "Significance undetermined."
    ),
    uselessnessScore: normalizeScore(parsed.uselessnessScore),
    rarity: normalizeRarity(parsed.rarity),
    museumHall: normalizeHall(parsed.museumHall),
    curatorNote: String(parsed.curatorNote || "No note recorded."),
    originalFilename: fileInfo.name,
    fileType: getFileTypeLabel(fileInfo.mimeType, fileInfo.extension),
    fileSize: fileInfo.size,
    discoveredAt: new Date().toISOString(),
    isSample: false,
  };
}

function generateFallbackArtifact(fileInfo: FileInfo): Artifact {
  const templates = sampleArtifacts;
  const template = templates[Math.floor(Math.random() * templates.length)];

  const name = fileInfo.name.toLowerCase();
  let hall = "V";
  if (/\.(pdf|docx?|pptx?|xlsx?)$/.test(name) || /final|assign|report|essay|project/i.test(name)) {
    hall = "I";
  } else if (/untitled|draft|wip|todo|notes/i.test(name)) {
    hall = "II";
  } else if (/setup|install|\.exe|\.dmg|\.iso|\.pkg/i.test(name)) {
    hall = "III";
  } else if (/\.(png|jpg|jpeg|gif|bmp|webp|heic|mp4|mov|webm)$/i.test(name) || /screenshot|img_|screen/i.test(name)) {
    hall = "IV";
  }

  const adjectives = [
    "Forgotten",
    "Abandoned",
    "Misplaced",
    "Neglected",
    "Overlooked",
    "Discarded",
    "Unclassified",
    "Mysterious",
  ];
  const nouns = [
    "Relic",
    "Fragment",
    "Artifact",
    "Document",
    "Specimen",
    "Vestige",
    "Remnant",
    "Curiosity",
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const cleanName = fileInfo.name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim() || fileInfo.name;

  const artifactName = `The ${adj} ${noun} of ${cleanName || "Unknown Origin"}`;
  const score = 85 + Math.random() * 14;

  return {
    id: generateId(),
    accessionNumber: getNextAccessionNumber(),
    artifactName,
    era: template.era,
    artifactType: `${fileInfo.extension} ${noun}`,
    origin: "Downloads Folder, Exact Location Unknown",
    historicalSignificance: `This ${fileInfo.extension.toLowerCase()} file represents a remarkable example of digital preservation through pure neglect. Its continued existence on the storage medium suggests a civilization that valued saving over sorting.`,
    uselessnessScore: Math.round(score * 10) / 10,
    rarity: VALID_RARITIES[Math.floor(Math.random() * VALID_RARITIES.length)],
    museumHall: hall,
    curatorNote: `The file "${fileInfo.name}" was preserved not by intention, but by the simple failure to delete it. This, perhaps, is how all museums begin.`,
    originalFilename: fileInfo.name,
    fileType: getFileTypeLabel(fileInfo.mimeType, fileInfo.extension),
    fileSize: fileInfo.size,
    discoveredAt: new Date().toISOString(),
    isSample: false,
  };
}
