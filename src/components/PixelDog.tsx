import { useEffect, useRef, useState, useCallback } from "react";
import mikeyWalkImg from "@/assets/mikey-walk.png";
import mikeySitImg from "@/assets/mikey-sit.png";

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const DOG_SIZE = 32;
const WALK_SPEED = 1.2; // px per frame
const CHASE_SPEED = 2.5;
const CHASE_THRESHOLD = 200; // px distance to start chasing
const NAVBAR_HEIGHT = 56; // h-14 = 3.5rem = 56px

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [x, setX] = useState(() => Math.random() * (window.innerWidth - DOG_SIZE));
  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(true);
  const mouseX = useRef(window.innerWidth / 2);
  const targetX = useRef(Math.random() * (window.innerWidth - DOG_SIZE));
  const posRef = useRef(x);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<number>();

  // Track mouse position
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const pickNewTarget = useCallback(() => {
    targetX.current = Math.random() * (window.innerWidth - DOG_SIZE);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      const currentX = posRef.current;
      const distToMouse = Math.abs(mouseX.current - currentX - DOG_SIZE / 2);
      const mouseIsNearTop = true; // Always chase horizontally along the header

      // Decide target: chase mouse if close enough, otherwise wander
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
        // Arrived at target — sit for a moment then pick new target
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
        // Walking
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
      {/* Konami hint tooltip */}
      {showHint && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
          ↑↑↓↓←→←→BA
        </div>
      )}
    </div>
  );
};

export default PixelDog;
