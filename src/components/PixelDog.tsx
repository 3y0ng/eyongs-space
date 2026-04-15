import { useEffect, useState, useRef } from "react";

/**
 * Pixel art Mikey — a small white dog that peeks from the right side
 * of the screen at random intervals. Clicking him shows the Konami hint.
 */

const DOG_PIXELS = [
  // Simple 12x10 pixel art dog facing left — rows of [col, row] filled pixels
  // Head
  "  ██████  ",
  " ██░░░░██ ",
  " █░●░░●░█ ",
  " █░░░░░░█ ",
  " ██░▼░░██ ",
  "  ██████  ",
  // Body
  " ████████ ",
  "██░░░░░░██",
  "██░░░░░░██",
  " ██    ██ ",
  " ██    ██ ",
];

// Minimal 8x6 pixel art for the peek (just head poking out from right edge)
const PEEK_ART = [
  "▐██▌",
  "▐░●▌",
  "▐░░▌",
  "▐▄▄▌",
];

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [peeking, setPeeking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const schedulePeek = () => {
      // Random interval between 25-60 seconds
      const delay = 25000 + Math.random() * 35000;
      timeoutRef.current = setTimeout(() => {
        setPeeking(true);
        // Stay visible for 4 seconds
        setTimeout(() => {
          setPeeking(false);
          schedulePeek();
        }, 4000);
      }, delay);
    };

    // First peek after 8-15 seconds
    const initialDelay = 8000 + Math.random() * 7000;
    timeoutRef.current = setTimeout(() => {
      setPeeking(true);
      setTimeout(() => {
        setPeeking(false);
        schedulePeek();
      }, 4000);
    }, initialDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Peeking dog from right side */}
      <div
        className="fixed right-0 z-[9999] transition-transform duration-500 ease-in-out"
        style={{
          top: "45%",
          transform: peeking ? "translateX(0)" : "translateX(100%)",
          cursor: "pointer",
        }}
        onClick={onPeekClick}
      >
        <div className="relative">
          <pre
            className="font-mono text-[8px] leading-[8px] text-foreground select-none"
            style={{ lineHeight: "9px" }}
          >
            {PEEK_ART.join("\n")}
          </pre>
          {/* Hint tooltip */}
          {showHint && (
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
              ↑↑↓↓←→←→BA
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PixelDog;
