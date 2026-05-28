import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { essays } from "@/data/essays";

const Essays = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-4xl mb-2">Essays</h1>
        <p className="text-muted-foreground mb-12">Thoughts on building, creating, and figuring things out.</p>

        <div>
          {essays.map((essay) => (
            <Link
              key={essay.id}
              to={`/essays/${essay.id}`}
              className="group block py-5 border-b border-border last:border-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium group-hover:underline underline-offset-4">
                    {essay.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{essay.excerpt}</p>
                </div>
                <div className="text-xs text-muted-foreground mt-1 shrink-0 text-right">
                  <div>{essay.date}</div>
                  <div>{essay.readTime}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Essays;
