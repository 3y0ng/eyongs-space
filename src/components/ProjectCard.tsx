import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusColor: Record<string, string> = {
  Active: "text-terminal-accent",
  Shipped: "text-muted-foreground",
  Exploring: "text-terminal-key",
  Explored: "text-muted-foreground",
};

const ProjectCard = ({ project, showPreview = true }: { project: Project; showPreview?: boolean }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // -0.5…0.5 across the card. The pane tips away from the pointer, as if
    // pressed there, and drifts toward it a touch so it still feels magnetic.
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) translate3d(${nx * 6}px, ${ny * 4}px, 0) rotateX(${-ny * 5}deg) rotateY(${nx * 5}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.id}`}
      className="glass-row group block rounded-xl px-5 py-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-[2] flex items-start justify-between gap-4">
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
      {showPreview && project.image && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block z-10">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-48 rounded-lg shadow-2xl shadow-black/40 ring-1 ring-white/10"
          />
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
