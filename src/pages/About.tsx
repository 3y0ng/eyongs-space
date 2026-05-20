import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const bioRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ delay: 200 });
  const linksRef = useScrollReveal<HTMLDivElement>({ delay: 400 });

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <p className="font-mono text-[11px] text-teal uppercase tracking-[0.3em] mb-3 px-2">// about</p>

        <div ref={bioRef} className="glass p-8 md:p-10 mb-4">
          <h2 className="font-display text-3xl md:text-4xl mb-6 tracking-tight">Hey, I'm E-Yong.</h2>
          <div className="space-y-4 text-zinc-400 leading-[1.8]">
            <p>
              I'm a student and builder based in Australia. I started a tutoring business from my living room as a college freshman to support my family. It grew to four brick-and-mortar locations and $500k ARR within three years.
            </p>
            <p>
              I've since passed it on to my younger brother and moved into tech. Now I'm building products that draw on pain points I encountered first-hand. Pyreel.com for helping founders nail distribution through agentic marketing orchestration, and Curilo.ai, an AI writing tutor for K-12 students.
            </p>
          </div>
        </div>

        <div ref={statsRef} className="glass p-6 font-mono text-sm mb-4">
          <div className="text-zinc-500 mb-2">
            <span className="text-teal">{">"}</span> eyong.stats()
          </div>
          <div className="text-zinc-500">{"{"}</div>
          <div className="pl-4">
            <span className="text-terminal-amber">location</span>
            <span className="text-zinc-500">: </span>
            <span className="text-zinc-200">"Australia"</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">currently_obsessed_with</span>
            <span className="text-zinc-500">: </span>
            <span className="text-zinc-200">"building cool stuff + my dog"</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">hot_take</span>
            <span className="text-zinc-500">: </span>
            <span className="text-zinc-200">"turns out pmf is still the only real moat"</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">stack</span>
            <span className="text-zinc-500">: [</span>
            <span className="text-zinc-200">"TypeScript"</span>
            <span className="text-zinc-500">, </span>
            <span className="text-zinc-200">"Next.js"</span>
            <span className="text-zinc-500">, </span>
            <span className="text-zinc-200">"Postgres"</span>
            <span className="text-zinc-500">],</span>
          </div>
          <div className="pl-4">
            <span className="text-terminal-amber">debug_strategy</span>
            <span className="text-zinc-500">: </span>
            <span className="text-zinc-200">"console.log until it confesses"</span>
          </div>
          <div className="text-zinc-500">{"}"}</div>
        </div>

        <div ref={linksRef} className="flex gap-3 px-2">
          <a href="https://www.linkedin.com/in/e-yong-lee/" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-teal border border-[hsl(var(--teal))]/20 px-3 py-1.5 rounded-full hover:bg-[hsl(var(--teal))]/10 transition-colors uppercase tracking-widest">
            LinkedIn
          </a>
          <a href="https://github.com/3y0ng" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-teal border border-[hsl(var(--teal))]/20 px-3 py-1.5 rounded-full hover:bg-[hsl(var(--teal))]/10 transition-colors uppercase tracking-widest">
            GitHub
          </a>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
