import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-4xl mb-2">Projects</h1>
        <p className="text-muted-foreground mb-12">Things I've built, am building, or am exploring.</p>

        <div>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
