import { useEffect, useRef, useState, useCallback } from "react";
import mikeyWalkImg from "@/assets/mikey-walk.png";
import mikeySitImg from "@/assets/mikey-sit.png";

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const DOG_SIZE = 32;
const WALK_SPEED = 1.2;
const CHASE_SPEED = 2.5;
const CHASE_THRESHOLD = 200;

const FACTS = [
  "woof!",
  "i love walks.",
  "naps > deploys.",
  "i ate a USB cable once.",
  "treat bag? i heard it.",
  "i'm the real PM here.",
];

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [x, setX] = useState(() => Math.random() * (window.innerWidth - DOG_SIZE));
  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(true);
  const [bubble, setBubble] = useState<string | null>(null);
  const mouseX = useRef(window.innerWidth / 2);
  const targetX = useRef(Math.random() * (window.innerWidth - DOG_SIZE));
  const posRef = useRef(x);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<number>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Occasional speech bubble (less frequent)
  useEffect(() => {
    const schedule = () => {
      const delay = 12000 + Math.random() * 18000; // 12-30s
      bubbleTimer.current = setTimeout(() => {
        const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
        setBubble(fact);
        setTimeout(() => setBubble(null), 3000);
        schedule();
      }, delay);
    };
    schedule();
    return () => { if (bubbleTimer.current) clearTimeout(bubbleTimer.current); };
  }, []);

  const pickNewTarget = useCallback(() => {
    targetX.current = Math.random() * (window.innerWidth - DOG_SIZE);
  }, []);

  useEffect(() => {
    const animate = () => {
      const currentX = posRef.current;
      const distToMouse = Math.abs(mouseX.current - currentX - DOG_SIZE / 2);

      let target: number;
      let speed: number;

      if (distToMouse < CHASE_THRESHOLD) {
        target = mouseX.current - DOG_SIZE / 2;
        speed = CHASE_SPEED;
      } else {
        target = targetX.current;
        speed = WALK_SPEED;
      }

      const diff = target - currentX;
      const absDiff = Math.abs(diff);

      if (absDiff < 2) {
        if (distToMouse >= CHASE_THRESHOLD) {
          setIsWalking(false);
          if (!idleTimer.current) {
            idleTimer.current = setTimeout(() => {
              pickNewTarget();
              setIsWalking(true);
              idleTimer.current = undefined;
            }, 2000 + Math.random() * 3000);
          }
        }
      } else {
        setIsWalking(true);
        if (idleTimer.current) {
          clearTimeout(idleTimer.current);
          idleTimer.current = undefined;
        }
        const step = Math.min(speed, absDiff);
        const direction = diff > 0 ? 1 : -1;
        const newX = Math.max(0, Math.min(window.innerWidth - DOG_SIZE, currentX + direction * step));
        posRef.current = newX;
        setX(newX);
        setFacingRight(direction > 0);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [pickNewTarget]);

  return (
    <div
      className="fixed z-[9999] select-none"
      style={{
        left: x,
        bottom: 0,
        width: DOG_SIZE,
        height: DOG_SIZE,
        cursor: "pointer",
      }}
      onClick={onPeekClick}
    >
      {/* Speech bubble */}
      {bubble && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
          {bubble}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-border" />
        </div>
      )}
      <img
        src={isWalking ? mikeyWalkImg : mikeySitImg}
        alt="Mikey"
        className="w-full h-full"
        style={{
          imageRendering: "pixelated",
          transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
        }}
        draggable={false}
      />
      {showHint && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
          ↑↑↓↓←→←→BA
        </div>
      )}
    </div>
  );
};

export default PixelDog;
