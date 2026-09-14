import { useState, useEffect, useRef } from "react";
import MacWindow from "@/components/MacWindow";

// ASCII art name — compact block style
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
    { text: 'role', cls: 'text-terminal-key' },
    { text: ': ', cls: 'text-muted-foreground' },
    { text: '"student & builder"', cls: 'text-foreground' },
    { text: ',', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'building', cls: 'text-terminal-key' },
    { text: ': [', cls: 'text-muted-foreground' },
    { text: '"pyreel.com"', cls: 'text-foreground' },
    { text: ', ', cls: 'text-muted-foreground' },
    { text: '"curilo.ai"', cls: 'text-foreground' },
    { text: '],', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'previously', cls: 'text-terminal-key' },
    { text: ': ', cls: 'text-muted-foreground' },
    { text: '"tutoring @ 4 locations, property @ 18"', cls: 'text-foreground' },
    { text: ',', cls: 'text-muted-foreground' },
  ]},
  { indent: true, parts: [
    { text: 'north_star', cls: 'text-terminal-key' },
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
      const cls = 'text-muted-foreground';
      for (const c of line.text) {
        chars.push({ char: c, cls: lineIdx === 0 ? '' : cls, lineIdx });
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

  // Phase 1: type ASCII art fast
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

  // Phase 2: type CLI block after ASCII is done
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

  // Build rendered spans for CLI
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
    <MacWindow
      title="~/eyong — status.sh"
      className="mb-6"
      bodyClassName="p-6 font-mono text-sm min-h-[200px]"
    >
      {/* ASCII art name */}
      <pre className="text-terminal-accent text-[0.55rem] sm:text-xs leading-tight mb-4 whitespace-pre overflow-x-auto">
        {ASCII_NAME.slice(0, asciiIdx)}
        {!asciiDone && <span className="animate-blink">▌</span>}
      </pre>

      {/* CLI block */}
      {asciiDone && (
        <pre className="whitespace-pre-wrap">
          {rendered}
          {!done && <span className="animate-blink ml-0.5">▌</span>}
        </pre>
      )}
      {done && <span className="animate-blink ml-0.5">▌</span>}
    </MacWindow>
  );
};

export default TypingHero;
