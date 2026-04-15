import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import TypingHero from "@/components/TypingHero";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const useParallax = (speed = 0.15) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
};

const Index = () => {
  const projectsRef = useScrollReveal<HTMLElement>();
  const essaysRef = useScrollReveal<HTMLElement>({ delay: 100 });
  const projectsHeaderRef = useParallax(0.12);
  const essaysHeaderRef = useParallax(0.12);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* CLI Hero */}
        <section className="mb-24">
          <TypingHero />
        </section>

        {/* Projects */}
        <section ref={projectsRef} className="mb-24">
          <div className="flex items-baseline justify-between mb-6">
            <h2 ref={projectsHeaderRef} className="font-mono text-sm text-terminal-green">// projects</h2>
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
        <section ref={essaysRef}>
          <div className="flex items-baseline justify-between mb-6">
            <h2 ref={essaysHeaderRef} className="font-mono text-sm text-terminal-green">// essays</h2>
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
