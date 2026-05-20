import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusChip: Record<string, string> = {
  Active: "border-[hsl(var(--teal))]/30 text-teal bg-[hsl(var(--teal))]/5",
  Shipped: "border-zinc-700 text-zinc-500",
  Exploring: "border-amber-500/30 text-terminal-amber bg-amber-500/5",
};

const ProjectCard = ({ project, showPreview = true }: { project: Project; showPreview?: boolean }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.02}px, ${y * 0.03}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  const dimmed = project.status === "Shipped";

  return (
    <Link
      ref={cardRef}
      to={`/projects/${project.id}`}
      className={`group block py-5 border-b border-white/5 last:border-0 relative transition-transform duration-200 ${dimmed ? "opacity-70" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-base text-zinc-100 group-hover:text-teal transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-500 mt-1">{project.tagline}</p>
        </div>
        <span
          className={`shrink-0 mt-1 px-2 py-0.5 rounded border text-[10px] uppercase font-bold font-mono tracking-wider ${
            statusChip[project.status] ?? "border-zinc-700 text-zinc-500"
          }`}
        >
          [{project.status.toLowerCase()}]
        </span>
      </div>

      {showPreview && project.image && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden lg:block z-10">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-48 rounded-md border border-white/10 shadow-lg"
          />
        </div>
      )}
    </Link>
  );
};

export default ProjectCard;
