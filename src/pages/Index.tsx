import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";

const Index = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* Hero */}
        <section className="mb-24">
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6">
            E-Yong Lee
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Founder and builder. Sharing what I'm working on and what I'm thinking about.
          </p>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Projects</h2>
            <Link to="/projects" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all →
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
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Essays</h2>
            <Link to="/essays" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Read all →
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
