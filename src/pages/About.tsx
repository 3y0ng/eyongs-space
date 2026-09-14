import PageTransition from "@/components/PageTransition";
import MacWindow from "@/components/MacWindow";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import eyongPhoto from "@/assets/eyong-shanghai.jpg";

const About = () => {
  const bioRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ delay: 200 });
  const linksRef = useScrollReveal<HTMLDivElement>({ delay: 400 });

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-mono text-sm text-terminal-accent mb-10">// about</h1>

        <div ref={bioRef} className="mb-16">
          <h2 className="font-display text-2xl md:text-3xl mb-6">Hey, I'm E-Yong.</h2>
          <div className="md:flex md:items-start md:gap-8">
            <div className="space-y-4 text-foreground/80 leading-[1.8]">
              <p>
                I'm a student and builder based in Australia. I started a tutoring business from my living room as a college freshman to support my family. It grew to four brick-and-mortar locations and $500k ARR within three years.
              </p>
              <p>
                I've since passed it on to my younger brother and moved into tech. Now I'm building products that draw on pain points I encountered first-hand. Pyreel.com, a reinforcement learning and analytics engine that teaches paid marketing spend to optimize itself, and Curilo.ai, an AI writing tutor for K-12 students.
              </p>
            </div>
            <figure className="mt-8 md:mt-0 shrink-0 w-full max-w-xs mx-auto md:w-56 md:mx-0">
              <MacWindow title="the-bund.jpg" zoomClassName="md:-mx-6 lg:-mx-10">
                <img
                  src={eyongPhoto}
                  alt="E-Yong sitting on the Bund in Shanghai at night"
                  className="w-full"
                />
              </MacWindow>
              <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground text-center">
                // the bund, shanghai
              </figcaption>
            </figure>
          </div>
        </div>

        <div ref={statsRef} className="mb-16">
          <MacWindow
            title="~/eyong — stats.sh"
            bodyClassName="p-6 font-mono text-sm"
          >
          <div className="text-muted-foreground mb-2">
            <span className="text-terminal-accent">{">"}</span> eyong.stats()
          </div>
          <div className="text-muted-foreground">{"{"}</div>
          <div className="pl-4">
            <span className="text-terminal-key">location</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"Australia"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-key">currently_obsessed_with</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"building cool stuff + my dog"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-key">hot_take</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"turns out pmf is still the only real moat"</span>
            <span className="text-muted-foreground">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-key">stack</span>
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
            <span className="text-terminal-key">debug_strategy</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">"console.log until it confesses"</span>
          </div>
          <div className="text-muted-foreground">{"}"}</div>
          </MacWindow>
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
