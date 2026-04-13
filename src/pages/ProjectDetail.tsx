import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-6 pt-28">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/projects" className="text-sm underline underline-offset-4 mt-2 inline-block">
            ← Back
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 inline-block">
          ← Back to projects
        </Link>

        <div className="mb-2 text-xs text-muted-foreground uppercase tracking-wide">{project.status}</div>
        <h1 className="font-display text-4xl mb-2">{project.title}</h1>
        <p className="text-muted-foreground mb-10">{project.tagline}</p>

        {project.image ? (
          <img src={project.image} alt={`${project.title} screenshot`} className="w-full rounded-lg mb-10" />
        ) : (
          <div className="w-full aspect-video rounded-lg bg-secondary mb-10 flex items-center justify-center">
            <span className="text-sm text-muted-foreground">Screenshot placeholder</span>
          </div>
        )}

        <p className="text-foreground/80 leading-relaxed">{project.description}</p>

        <a
          href={project.link}
          className="inline-block mt-8 text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Visit project →
        </a>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
