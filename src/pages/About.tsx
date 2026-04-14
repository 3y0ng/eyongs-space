import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const bioRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ delay: 200 });
  const linksRef = useScrollReveal<HTMLDivElement>({ delay: 400 });

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-mono text-sm text-terminal-green mb-10">// about</h1>

        <div ref={bioRef} className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl mb-6">Hey, I'm Eyong.</h2>
          <div className="space-y-4 text-foreground/80 leading-[1.8]">
            <p>
              I'm a student and builder based in Australia. I started a tutoring business from my living room as a college freshman to support my family. It grew to four brick-and-mortar locations and $500k ARR within three years.
            </p>
            <p>
              I've since passed it on to my younger brother and moved into tech. Now I'm building products that draw on pain points I encountered first-hand. Pyreel.com for helping founders nail distribution through agentic marketing orchestration, and Curilo.ai, an AI writing tutor for K-12 students.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="rounded-lg border border-border bg-card p-6 font-mono text-sm mb-16">
          <div className="text-muted-foreground mb-2">
            <span className="text-terminal-green">{">"}</span> eyong.stats()
          </div>
          <div className="text-muted-foreground">{"{"}</div>
          <div className="pl-4">
            <span className="text-terminal-amber">location</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"Australia"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">currently_obsessed_with</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"building cool stuff + my dog"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">hot_take</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"turns out pmf is still the only real moat"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">stack</span>
            <span className="text-muted-foreground">: [</span>
            <span className="text-foreground">"TypeScript"</span>
            <span className="text-muted-foreground">, </span>
            <span className="text-foreground">"Next.js"</span>
            <span className="text-muted-foreground">, </span>
            <span className="text-foreground">"Postgres"</span>
            <span className="text-muted-foreground">]</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">debug_strategy</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"console.log until it confesses"</span>
          </div>
          <div className="text-muted-foreground">{"}"}</div>
        </div>

        <div ref={linksRef} className="flex gap-5 text-sm">
          <a href="https://www.linkedin.com/in/e-yong-lee/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn →
          </a>
          <a href="https://github.com/3y0ng" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            GitHub →
          </a>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
