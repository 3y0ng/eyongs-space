import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import type { Project } from "@/data/projects";

const statusColors: Record<string, string> = {
  Active: "bg-primary/10 text-primary",
  Shipped: "bg-secondary/10 text-secondary",
  Exploring: "bg-accent/20 text-accent-foreground",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/projects/${project.id}`}>
        <motion.div
          onMouseMove={handleMouse}
          onMouseLeave={resetMouse}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative rounded-2xl border border-border bg-card p-8 hoverable overflow-hidden"
        >
          {/* Color accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
            style={{ backgroundColor: project.color }}
          />

          <div className="flex items-start justify-between mb-4">
            <h3 className="font-display text-2xl">{project.title}</h3>
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>

          <p className="text-muted-foreground leading-relaxed">{project.tagline}</p>

          <motion.div
            className="mt-4 text-sm font-medium text-primary flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            Learn more →
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
