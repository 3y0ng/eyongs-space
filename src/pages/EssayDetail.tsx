import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { essays } from "@/data/essays";

const EssayDetail = () => {
  const { id } = useParams();
  const essay = essays.find((e) => e.id === id);

  if (!essay) {
    return (
      <PageTransition>
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <h1 className="font-display text-4xl mb-4">Essay not found</h1>
          <Link to="/essays" className="text-primary hoverable">← Back to essays</Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <Link to="/essays" className="text-sm text-muted-foreground hover:text-foreground transition-colors hoverable mb-8 inline-block">
          ← Back to essays
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span>{essay.date}</span>
            <span>·</span>
            <span>{essay.readTime} read</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-8">{essay.title}</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed italic">{essay.excerpt}</p>

          <div className="w-16 h-0.5 bg-primary mb-12" />

          <div className="space-y-6">
            {essay.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-lg leading-[1.8] text-foreground/85">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </article>
    </PageTransition>
  );
};

export default EssayDetail;
