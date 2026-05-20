import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { essays } from "@/data/essays";

const Essays = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="mb-8 px-2">
          <p className="font-mono text-[11px] text-teal uppercase tracking-[0.3em] mb-3">// essays</p>
          <h1 className="font-display text-4xl tracking-tight">Notes from the build.</h1>
          <p className="text-zinc-500 mt-3">Thoughts on building, creating, and figuring things out.</p>
        </div>

        <div className="glass p-8">
          {essays.map((essay, i) => (
            <Link
              key={essay.id}
              to={`/essays/${essay.id}`}
              className={`group block py-5 ${i < essays.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-zinc-600 block mb-1 uppercase tracking-widest">
                  {essay.date} · {essay.readTime}
                </span>
                <h3 className="font-display text-base text-zinc-100 group-hover:text-teal transition-colors">
                  {essay.title}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">{essay.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Essays;
