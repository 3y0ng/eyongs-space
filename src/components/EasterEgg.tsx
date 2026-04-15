import { useKonamiCode } from "@/hooks/useKonamiCode";

const EasterEgg = () => {
  const active = useKonamiCode();

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none animate-fade-in">
      {/* CRT overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Green tint */}
      <div className="absolute inset-0 bg-[hsl(var(--terminal-green)/0.08)]" />
      {/* Message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-mono text-sm text-[hsl(var(--terminal-green))] bg-background/90 px-6 py-4 rounded-md border border-[hsl(var(--terminal-green)/0.3)]">
          <p className="animate-blink inline-block mr-2">▊</p>
          <span>&gt; access granted. welcome, hacker.</span>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;
