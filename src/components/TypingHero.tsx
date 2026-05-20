import { useState, useEffect, useRef } from "react";

const ASCII_NAME = [
  "███████╗██╗   ██╗ ██████╗ ███╗   ██╗ ██████╗ ",
  "██╔════╝╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔════╝ ",
  "█████╗   ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ███╗",
  "██╔══╝    ╚██╔╝  ██║   ██║██║╚██╗██║██║   ██║",
  "███████╗   ██║   ╚██████╔╝██║ ╚████║╚██████╔╝",
  "╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ",
].join("\n") + "\n";

const lines = [
  { indent: false, text: '> eyong.status()' },
  { indent: false, text: '{' },
  { indent: true, parts: [
    { text: 'role', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-zinc-500' },
    { text: '"student & builder"', cls: 'text-zinc-200' },
    { text: ',', cls: 'text-zinc-500' },
  ]},
  { indent: true, parts: [
    { text: 'building', cls: 'text-terminal-amber' },
    { text: ': [', cls: 'text-zinc-500' },
    { text: '"pyreel.ai"', cls: 'text-zinc-200' },
    { text: ', ', cls: 'text-zinc-500' },
    { text: '"curilo.ai"', cls: 'text-zinc-200' },
    { text: '],', cls: 'text-zinc-500' },
  ]},
  { indent: true, parts: [
    { text: 'previously', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-zinc-500' },
    { text: '"tutoring @ 4 locations, property @ 18"', cls: 'text-zinc-200' },
    { text: ',', cls: 'text-zinc-500' },
  ]},
  { indent: true, parts: [
    { text: 'north_star', cls: 'text-terminal-amber' },
    { text: ': ', cls: 'text-zinc-500' },
    { text: '"build cool things"', cls: 'text-zinc-200' },
  ]},
  { indent: false, text: '}' },
];

function buildCharStream() {
  const chars: { char: string; cls: string; lineIdx: number }[] = [];
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) chars.push({ char: '\n', cls: '', lineIdx });
    if ('text' in line && !('parts' in line)) {
      const cls = 'text-zinc-500';
      for (const c of line.text) {
        chars.push({ char: c, cls: lineIdx === 0 ? 'text-teal' : cls, lineIdx });
      }
    } else if ('parts' in line) {
      if (line.indent) {
        for (let s = 0; s < 4; s++) chars.push({ char: ' ', cls: '', lineIdx });
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
  const [asciiIdx, setAsciiIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const asciiDone = asciiIdx >= ASCII_NAME.length;
  const done = asciiDone && visibleCount >= charStream.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const charsPerTick = 4;
    intervalRef.current = setInterval(() => {
      setAsciiIdx((prev) => {
        if (prev >= ASCII_NAME.length) {
          clearInterval(intervalRef.current!);
          return prev;
        }
        return Math.min(prev + charsPerTick, ASCII_NAME.length);
      });
    }, 8);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!asciiDone) return;
    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setVisibleCount((prev) => {
          if (prev >= charStream.length) {
            clearInterval(intervalRef.current!);
            return prev;
          }
          return prev + 1;
        });
      }, 18);
    }, 300);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [asciiDone]);

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
  flush('end');

  return (
    <div className="glass glass-hover relative overflow-hidden p-8 font-mono text-sm min-h-[280px] shadow-[0_0_40px_-20px_hsl(var(--teal)/0.2)]">
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-[hsl(var(--teal))]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
        <div className="w-10 h-10 border-t-2 border-r-2 border-teal" />
      </div>

      <pre className="text-teal text-[0.55rem] sm:text-xs leading-tight mb-6 whitespace-pre overflow-x-auto select-none">
        {ASCII_NAME.slice(0, asciiIdx)}
        {!asciiDone && <span className="animate-blink">▌</span>}
      </pre>

      {asciiDone && (
        <pre className="whitespace-pre-wrap">
          {rendered}
          {!done && <span className="animate-blink ml-0.5">▌</span>}
        </pre>
      )}
      {done && <span className="animate-blink ml-0.5 text-teal">▌</span>}
    </div>
  );
};

export default TypingHero;
