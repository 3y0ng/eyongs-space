import { useEffect, useState, useRef } from "react";
import mikeyPeekImg from "@/assets/mikey-peek.png";

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [peeking, setPeeking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const schedulePeek = () => {
      const delay = 25000 + Math.random() * 35000;
      timeoutRef.current = setTimeout(() => {
        setPeeking(true);
        setTimeout(() => {
          setPeeking(false);
          schedulePeek();
        }, 4000);
      }, delay);
    };

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
    <div
      className="fixed right-0 z-[9999] transition-transform duration-500 ease-in-out"
      style={{
        top: "45%",
        transform: peeking ? "translateX(30%)" : "translateX(100%)",
        cursor: "pointer",
      }}
      onClick={onPeekClick}
    >
      <div className="relative">
        <img
          src={mikeyPeekImg}
          alt="Mikey peeking"
          className="w-16 h-16 select-none"
          style={{ imageRendering: "pixelated" }}
          draggable={false}
        />
        {showHint && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
            ↑↑↓↓←→←→BA
          </div>
        )}
      </div>
    </div>
  );
};

export default PixelDog;
