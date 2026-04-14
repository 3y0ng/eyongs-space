import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusColor: Record<string, string> = {
  Active: "text-terminal-green",
  Shipped: "text-muted-foreground",
  Exploring: "text-terminal-amber",
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="group block py-5 border-b border-border last:border-0 relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium group-hover:underline underline-offset-4 transition-all">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
        </div>
        <span className={`font-mono text-xs mt-1 shrink-0 ${statusColor[project.status] ?? "text-muted-foreground"}`}>
          [{project.status.toLowerCase()}]
        </span>
      </div>

      {/* Hover thumbnail */}
      {project.image && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block z-10">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-48 rounded-md border border-border shadow-lg"
          />
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
