import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-bronze-700/20 bg-ink-950 px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <div className="font-serif text-2xl text-parchment-100">
          The Museum of Things You Never Needed
        </div>
        <p className="max-w-md text-sm text-parchment-500">
          A deliberately useless experiment in digital archaeology. No files
          were harmed in the making of this museum.
        </p>
        <div className="flex gap-8">
          <Link
            to="/"
            className="text-xs tracking-widest text-parchment-400 hover:text-bronze-400"
          >
            HOME
          </Link>
          <Link
            to="/museum"
            className="text-xs tracking-widest text-parchment-400 hover:text-bronze-400"
          >
            MUSEUM
          </Link>
          <Link
            to="/about"
            className="text-xs tracking-widest text-parchment-400 hover:text-bronze-400"
          >
            ABOUT
          </Link>
          <Link
            to="/discover"
            className="text-xs tracking-widest text-parchment-400 hover:text-bronze-400"
          >
            DISCOVER
          </Link>
        </div>
        <div className="mt-4 text-xs text-parchment-600">
          EST. 2026 · ACCESSION FM-2026 · ALL ARTIFACTS FICTIONAL
        </div>
      </div>
    </footer>
  );
}
