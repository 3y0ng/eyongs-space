import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";

const Index = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* CLI Hero */}
        <section className="mb-24">
          <div className="rounded-lg border border-border bg-card p-6 font-mono text-sm mb-6">
            <div className="text-muted-foreground mb-2">
              <span className="text-terminal-green">{">"}</span> eyong.status()
            </div>
            <div className="text-muted-foreground">{"{"}</div>
            <div className="pl-4">
              <span className="text-terminal-amber">role</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-foreground">"student & builder"</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-terminal-amber">building</span>
              <span className="text-muted-foreground">: [</span>
              <span className="text-foreground">"pyreel.ai"</span>
              <span className="text-muted-foreground">, </span>
              <span className="text-foreground">"curilo.ai"</span>
              <span className="text-muted-foreground">],</span>
            </div>
            <div className="pl-4">
              <span className="text-terminal-amber">previously</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-foreground">"tutoring @ 4 locations, property @ 18"</span>
              <span className="text-muted-foreground">,</span>
            </div>
            <div className="pl-4">
              <span className="text-terminal-amber">north_star</span>
              <span className="text-muted-foreground">: </span>
              <span className="text-foreground">"build cool things"</span>
            </div>
            <div className="text-muted-foreground">
              {"}"}<span className="animate-blink ml-1">▌</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-sm text-terminal-green">// projects</h2>
            <Link to="/projects" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
              view all →
            </Link>
          </div>
          <div>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Essays */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-mono text-sm text-terminal-green">// essays</h2>
            <Link to="/essays" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
              read all →
            </Link>
          </div>
          <div>
            {essays.map((essay) => (
              <Link
                key={essay.id}
                to={`/essays/${essay.id}`}
                className="group block py-5 border-b border-border last:border-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium group-hover:underline underline-offset-4">
                      {essay.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{essay.excerpt}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 shrink-0">{essay.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
