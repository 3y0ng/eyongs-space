import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="mb-8 px-2">
          <p className="font-mono text-[11px] text-teal uppercase tracking-[0.3em] mb-3">// projects</p>
          <h1 className="font-display text-4xl tracking-tight">Things I've built.</h1>
          <p className="text-zinc-500 mt-3">Active, shipped, and exploring.</p>
        </div>

        <div className="glass p-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
