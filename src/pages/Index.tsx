import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import TypingHero from "@/components/TypingHero";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  const gridRef = useScrollReveal<HTMLDivElement>();

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Hero terminal */}
          <div className="md:col-span-8">
            <TypingHero />
          </div>

          {/* Status sidebar */}
          <div className="md:col-span-4 glass p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] font-mono font-bold mb-5">
                Status
              </h3>
              <div className="space-y-5">
                <div>
                  <span className="block text-teal text-3xl font-display font-semibold tracking-tight">
                    0 to 1
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono uppercase tracking-wider">
                    Execution Mode
                  </span>
                </div>
                <div className="h-px w-full bg-white/5" />
                <div className="text-[11px] font-mono space-y-2 text-zinc-500">
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Building</span>
                    <span className="text-zinc-300">{projects.filter(p => p.status === "Active").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Shipped</span>
                    <span className="text-zinc-300">{projects.filter(p => p.status === "Shipped").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="uppercase tracking-wider">Location</span>
                    <span className="text-zinc-300">AU</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              <span>online</span>
            </div>
          </div>

          {/* Projects */}
          <div className="md:col-span-7 glass p-8">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="font-display text-xl text-zinc-100 tracking-tight">
                <span className="text-teal font-mono text-sm mr-1">//</span> projects
              </h2>
              <Link to="/projects" className="text-[11px] font-mono text-zinc-500 hover:text-teal uppercase tracking-widest transition-colors">
                view all →
              </Link>
            </div>
            <div>
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} showPreview={false} />
              ))}
            </div>
          </div>

          {/* Essays */}
          <div className="md:col-span-5 glass p-8">
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="font-display text-xl text-zinc-100 tracking-tight">
                <span className="text-teal font-mono text-sm mr-1">//</span> essays
              </h2>
              <Link to="/essays" className="text-[11px] font-mono text-zinc-500 hover:text-teal uppercase tracking-widest transition-colors">
                read all →
              </Link>
            </div>
            <div className="space-y-5">
              {essays.map((essay) => (
                <Link key={essay.id} to={`/essays/${essay.id}`} className="group block">
                  <span className="text-[10px] font-mono text-zinc-600 block mb-1 uppercase tracking-widest">
                    {essay.date}
                  </span>
                  <h4 className="text-sm text-zinc-300 group-hover:text-teal transition-colors leading-snug">
                    {essay.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
