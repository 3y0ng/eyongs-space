import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { essays } from "@/data/essays";

const Index = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-5xl mx-auto px-6 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-primary font-medium mb-4 text-sm uppercase tracking-widest"
        >
          Hey, I'm —
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-6xl md:text-8xl leading-[0.95] mb-6"
        >
          Your Name
          <span className="text-primary">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed"
        >
          Building things that matter. Founder, thinker, and
          occasional writer sharing the journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex gap-4"
        >
          <Link to="/projects">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hoverable"
            >
              See my work
            </motion.span>
          </Link>
          <Link to="/essays">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-6 py-3 rounded-lg border border-border font-medium hoverable"
            >
              Read essays
            </motion.span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-auto pb-8 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Projects preview */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl">
              Projects<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground mt-2">Things I'm building right now</p>
          </div>
          <Link to="/projects" className="text-sm font-medium text-primary hoverable hidden md:block">
            View all →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Essays preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl">
              Essays<span className="text-primary">.</span>
            </h2>
            <p className="text-muted-foreground mt-2">Thoughts on building & life</p>
          </div>
          <Link to="/essays" className="text-sm font-medium text-primary hoverable hidden md:block">
            Read all →
          </Link>
        </motion.div>

        <div className="space-y-0 divide-y divide-border">
          {essays.map((essay, i) => (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/essays/${essay.id}`} className="group block py-6 hoverable">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl group-hover:text-primary transition-colors">
                      {essay.title}
                    </h3>
                    <p className="text-muted-foreground mt-1 line-clamp-1">{essay.excerpt}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap mt-1">{essay.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default Index;
