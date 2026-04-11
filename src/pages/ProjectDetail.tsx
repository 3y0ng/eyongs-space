import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageTransition>
        <div className="max-w-5xl mx-auto px-6 pt-32 text-center">
          <h1 className="font-display text-4xl mb-4">Project not found</h1>
          <Link to="/projects" className="text-primary hoverable">← Back to projects</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors hoverable mb-8 inline-block">
          ← Back to projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {project.status}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{project.tagline}</p>

          {/* Placeholder image */}
          <div className="w-full aspect-video rounded-2xl bg-muted mb-12 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Project screenshot placeholder</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-foreground/80">{project.description}</p>
          </div>

          <motion.a
            href={project.link}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block mt-10 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hoverable"
          >
            Visit project →
          </motion.a>
        </motion.div>
      </article>
    </PageTransition>
  );
};

export default ProjectDetail;
