import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusColor: Record<string, string> = {
  Active: "text-terminal-green",
  Shipped: "text-muted-foreground",
  Exploring: "text-terminal-amber",
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link to={`/projects/${project.id}`} className="group block py-5 border-b border-border last:border-0">
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
    </Link>
  );
};

export default ProjectCard;
