import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-20 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center animate-fade-in">
          <span className="font-mono text-[10px] tracking-widest text-bronze-500">
            CURATORIAL STATEMENT
          </span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-parchment-100 lg:text-5xl">
            WHY DOES THIS EXIST?
          </h1>
        </div>

        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <p className="font-serif text-lg leading-relaxed text-parchment-300">
            We all have files sitting on our devices that haven't been opened in
            years.
          </p>
          <p className="text-sm leading-relaxed text-parchment-400">
            Old assignments. Random screenshots. Files called
            <span className="font-mono text-parchment-300"> final_final_FINAL</span>.
            Things we downloaded and immediately forgot.
          </p>
          <p className="font-serif text-lg italic leading-relaxed text-parchment-200">
            Instead of deleting them, we decided to give them the one thing they
            never deserved:
          </p>
          <p className="text-center font-serif text-2xl text-bronze-400">
            A museum.
          </p>

          <div className="my-10 h-px w-full bg-bronze-700/20" />

          <p className="text-sm leading-relaxed text-parchment-400">
            <span className="font-serif text-lg text-parchment-200">
              The Museum of Things You Never Needed
            </span>{" "}
            is a deliberately useless experiment in digital archaeology.
          </p>
          <p className="text-sm leading-relaxed text-parchment-400">
            It does not solve digital clutter.
          </p>
          <p className="text-sm leading-relaxed text-parchment-400">
            It does not improve productivity.
          </p>
          <p className="text-sm leading-relaxed text-parchment-400">
            It does not make your files more useful.
          </p>
          <p className="text-sm leading-relaxed text-parchment-400">
            It simply gives them historical importance they absolutely do not
            deserve.
          </p>

          <div className="my-10 h-px w-full bg-bronze-700/20" />

          <p className="text-center font-serif text-2xl italic text-parchment-100">
            Because not everything needs a purpose.
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/discover"
            className="border border-bronze-500 bg-bronze-600/10 px-8 py-4 text-xs tracking-widest text-bronze-400 transition-all hover:bg-bronze-600/20"
          >
            DISCOVER AN ARTIFACT
          </Link>
        </div>
      </div>
    </div>
  );
}
