import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { essays } from "@/data/essays";

const EssayDetail = () => {
  const { id } = useParams();
  const essay = essays.find((e) => e.id === id);

  if (!essay) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-6 pt-28">
          <p className="text-muted-foreground">Essay not found.</p>
          <Link to="/essays" className="text-sm underline underline-offset-4 mt-2 inline-block">
            ← Back
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <Link to="/essays" className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 inline-block">
          ← Back to essays
        </Link>

        <div className="text-sm text-muted-foreground mb-4">
          {essay.date} · {essay.readTime} read
        </div>

        <h1 className="font-display text-3xl md:text-4xl leading-tight mb-6">{essay.title}</h1>

        <p className="text-muted-foreground italic mb-10">{essay.excerpt}</p>

        <div className="w-12 h-px bg-border mb-10" />

        <div className="space-y-6">
          {essay.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="leading-[1.8] text-foreground/80">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </PageTransition>
  );
};

export default EssayDetail;
