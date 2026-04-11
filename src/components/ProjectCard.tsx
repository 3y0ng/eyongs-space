import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

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
        <span className="text-xs text-muted-foreground mt-1 shrink-0">{project.status}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
