import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusColors: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Shipped: "bg-secondary/10 text-secondary",
  Exploring: "bg-accent/10 text-accent",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative rounded-2xl border border-border bg-card p-8 overflow-hidden"
        >
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
            style={{ backgroundColor: project.color }}
          />

          <div className="flex items-start justify-between mb-4">
            <h3 className="font-display text-2xl">{project.title}</h3>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">{project.tagline}</p>

          <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more →
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
