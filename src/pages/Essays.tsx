import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { essays } from "@/data/essays";

const Essays = () => {
  return (
    <PageTransition>
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl mb-4"
        >
          Essays<span className="text-primary">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-lg mb-16"
        >
          Thoughts on building, creating, and figuring things out.
        </motion.p>

        <div className="space-y-0 divide-y divide-border">
          {essays.map((essay, i) => (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/essays/${essay.id}`} className="group block py-8 hoverable">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-display text-2xl md:text-3xl group-hover:text-primary transition-colors">
                    {essay.title}
                  </h2>
                  <div className="text-sm text-muted-foreground whitespace-nowrap mt-2 text-right">
                    <div>{essay.date}</div>
                    <div>{essay.readTime}</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{essay.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default Essays;
