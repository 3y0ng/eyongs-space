import { useState, useEffect, useRef } from "react";

const lines = [
  { indent: false, text: '> eyong.status()' },
  { indent: false, text: '{' },
  { indent: true, parts: [
    { text: 'role', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-muted-foreground' },
    { text: '"student & builder"', cls: 'text-foreground' },
    { text: ',', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'building', cls: 'text-terminal-amber' },
    { text: ': [', cls: 'text-muted-foreground' },
    { text: '"pyreel.ai"', cls: 'text-foreground' },
    { text: ', ', cls: 'text-muted-foreground' },
    { text: '"curilo.ai"', cls: 'text-foreground' },
    { text: '],', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'previously', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-muted-foreground' },
    { text: '"tutoring @ 4 locations, property @ 18"', cls: 'text-foreground' },
    { text: ',', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'north_star', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-muted-foreground' },
    { text: '"build cool things"', cls: 'text-foreground' },
  ]},
  { indent: false, text: '}' },
];

// Flatten all characters with their styling
function buildCharStream() {
  const chars: { char: string; cls: string; lineIdx: number }[] = [];
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) chars.push({ char: '\n', cls: '', lineIdx });
    if ('text' in line && !('parts' in line)) {
      const cls = lineIdx === 0 ? 'text-muted-foreground' : 'text-muted-foreground';
      for (const c of line.text) {
        chars.push({ char: c, cls: lineIdx === 0 ? '' : cls, lineIdx });
      }
    } else if ('parts' in line) {
      if (line.indent) {
        chars.push({ char: ' ', cls: '', lineIdx });
        chars.push({ char: ' ', cls: '', lineIdx });
        chars.push({ char: ' ', cls: '', lineIdx });
        chars.push({ char: ' ', cls: '', lineIdx });
      }
      for (const part of line.parts!) {
        for (const c of part.text) {
          chars.push({ char: c, cls: part.cls, lineIdx });
        }
      }
    }
  });
  return chars;
}

const charStream = buildCharStream();

const TypingHero = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const done = visibleCount >= charStream.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= charStream.length) {
          clearInterval(intervalRef.current!);
          return prev;
        }
        return prev + 1;
      });
    }, 18);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Build rendered spans
  const rendered: React.ReactNode[] = [];
  let currentCls = '';
  let buffer = '';

  const flush = (key: string) => {
    if (buffer) {
      rendered.push(<span key={key} className={currentCls}>{buffer}</span>);
      buffer = '';
    }
  };

  for (let i = 0; i < visibleCount; i++) {
    const { char, cls } = charStream[i];
    if (cls !== currentCls) {
      flush(`s${i}`);
      currentCls = cls;
    }
    buffer += char;
  }
  flush(`end`);

  // Handle first line special coloring for the ">"
  return (
    <div className="rounded-lg border border-border bg-card p-6 font-mono text-sm mb-6 min-h-[200px]">
      <pre className="whitespace-pre-wrap">
        {rendered.length > 0 && (
          <>
            {/* Color the ">" green */}
            {rendered}
          </>
        )}
        <span className="animate-blink ml-0.5">▌</span>
      </pre>
    </div>
  );
};

export default TypingHero;
