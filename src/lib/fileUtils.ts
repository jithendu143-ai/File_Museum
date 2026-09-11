import type { FileInfo } from "../types";

export function formatFileSize(bytes: number): string {
  if (bytes <= 0 || !Number.isFinite(bytes)) return "0 KB";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(
    Math.max(0, Math.floor(Math.log(bytes) / Math.log(1024))),
    units.length - 1
  );
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function getFileInfo(file: File): FileInfo {
  const name = file.name;
  const lastDot = name.lastIndexOf(".");
  const extension = lastDot >= 0 ? name.slice(lastDot + 1).toUpperCase() : "FILE";
  return {
    name,
    extension,
    mimeType: file.type || "application/octet-stream",
    size: formatFileSize(file.size),
    sizeBytes: file.size,
  };
}

export function getFileTypeLabel(mimeType: string, extension: string): string {
  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType.startsWith("video/")) return "Video";
  if (mimeType.startsWith("audio/")) return "Audio";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word") || extension === "DOCX" || extension === "DOC")
    return "DOCX";
  if (mimeType.includes("excel") || extension === "XLSX") return "Spreadsheet";
  if (mimeType.includes("presentation") || extension === "PPTX")
    return "Presentation";
  if (mimeType.startsWith("text/")) return "Text";
  if (mimeType.includes("zip") || mimeType.includes("compressed"))
    return "Archive";
  if (mimeType.includes("application/")) return extension || "Application";
  return extension || "File";
}

const TEXT_EXTENSIONS = new Set([
  "TXT", "MD", "MARKDOWN", "JSON", "JS", "TS", "TSX", "JSX", "HTML", "HTM",
  "CSS", "SCSS", "SASS", "LESS", "PY", "RB", "GO", "RS", "JAVA", "C", "CPP",
  "H", "HPP", "CS", "PHP", "SH", "BASH", "ZSH", "ENV", "YML", "YAML", "XML",
  "SQL", "CSV", "LOG", "INI", "CONF", "CONFIG", "TOML", "VUE", "SVELTE"
]);

export async function safeExtractText(file: File): Promise<string> {
  if (file.size > 500_000) return "";
  const ext = file.name.split(".").pop()?.toUpperCase() || "";
  const isTextMime =
    file.type.startsWith("text/") ||
    file.type.includes("json") ||
    file.type.includes("javascript") ||
    file.type.includes("typescript") ||
    file.type.includes("xml");
  const isTextExt = TEXT_EXTENSIONS.has(ext) || file.name.startsWith(".");

  if (isTextMime || isTextExt) {
    try {
      const text = await file.text();
      return text.slice(0, 500).replace(/[\x00-\x08\x0E-\x1F]/g, "");
    } catch {
      return "";
    }
  }
  return "";
}
