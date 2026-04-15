import { useEffect, useRef, useState, useCallback } from "react";
import spritesheet from "@/assets/mikey-spritesheet.png";

/**
 * Spritesheet layout (384x864, 4 cols x 9 rows, each frame ~96x96):
 * Row 0: Head/face front (idle face)
 * Row 1: Walk right
 * Row 2: Sit front (idle)
 * Row 3: Walk left-ish / another walk
 * Row 4: Sit/idle small
 * Row 5: Sit side
 * Row 6: Scratch
 * Row 7: Sleep (2 frames) + sit right + empty
 * Row 8: Run (3 frames)
 */

const SHEET_COLS = 4;
const FRAME_W = 96; // 384 / 4
const FRAME_H = 96; // 864 / 9

type Animation = { row: number; frames: number; speed: number };

const ANIMATIONS: Record<string, Animation> = {
  walkRight: { row: 1, frames: 4, speed: 200 },
  walkLeft:  { row: 3, frames: 4, speed: 200 },
  sit:       { row: 2, frames: 4, speed: 400 },
  idle:      { row: 5, frames: 4, speed: 500 },
  scratch:   { row: 6, frames: 4, speed: 250 },
  sleep:     { row: 7, frames: 2, speed: 600 },
  run:       { row: 8, frames: 3, speed: 150 },
};

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const DOG_DISPLAY = 48; // Display size
const WALK_SPEED = 1.2;
const CHASE_SPEED = 3;
const CHASE_THRESHOLD = 200;

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [x, setX] = useState(() => Math.random() * (window.innerWidth - DOG_DISPLAY));
  const [anim, setAnim] = useState<string>("sit");
  const [frame, setFrame] = useState(0);

  const mouseX = useRef(window.innerWidth / 2);
  const targetX = useRef(Math.random() * (window.innerWidth - DOG_DISPLAY));
  const posRef = useRef(x);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<number>();
  const animRef = useRef(anim);

  // Keep animRef in sync
  useEffect(() => { animRef.current = anim; }, [anim]);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseX.current = e.clientX; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const pickNewTarget = useCallback(() => {
    targetX.current = Math.random() * (window.innerWidth - DOG_DISPLAY);
  }, []);

  // Sprite frame animation
  useEffect(() => {
    const animData = ANIMATIONS[anim];
    if (!animData) return;
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % animData.frames);
    }, animData.speed);
    return () => clearInterval(interval);
  }, [anim]);

  // Movement loop
  useEffect(() => {
    const animate = () => {
      const currentX = posRef.current;
      const distToMouse = Math.abs(mouseX.current - currentX - DOG_DISPLAY / 2);

      let target: number;
      let speed: number;
      let chasing = false;

      if (distToMouse < CHASE_THRESHOLD) {
        target = mouseX.current - DOG_DISPLAY / 2;
        speed = CHASE_SPEED;
        chasing = true;
      } else {
        target = targetX.current;
        speed = WALK_SPEED;
      }

      const diff = target - currentX;
      const absDiff = Math.abs(diff);

      if (absDiff < 2 && !chasing) {
        // Arrived — go idle
        if (animRef.current !== "sit" && animRef.current !== "idle" && animRef.current !== "scratch" && animRef.current !== "sleep") {
          // Pick a random idle animation
          const idleAnims = ["sit", "idle", "scratch", "sleep"];
          const pick = idleAnims[Math.floor(Math.random() * idleAnims.length)];
          setAnim(pick);
          setFrame(0);
        }
        if (!idleTimer.current) {
          idleTimer.current = setTimeout(() => {
            pickNewTarget();
            idleTimer.current = undefined;
          }, 3000 + Math.random() * 4000);
        }
      } else if (absDiff >= 2) {
        // Moving
        if (idleTimer.current) {
          clearTimeout(idleTimer.current);
          idleTimer.current = undefined;
        }

        const direction = diff > 0 ? 1 : -1;
        const step = Math.min(speed, absDiff);
        const newX = Math.max(0, Math.min(window.innerWidth - DOG_DISPLAY, currentX + direction * step));
        posRef.current = newX;
        setX(newX);

        const newAnim = chasing
          ? (direction > 0 ? "run" : "run")
          : (direction > 0 ? "walkRight" : "walkLeft");

        if (animRef.current !== newAnim) {
          setAnim(newAnim);
          setFrame(0);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [pickNewTarget]);

  const animData = ANIMATIONS[anim] || ANIMATIONS.sit;
  const bgX = -(frame % animData.frames) * FRAME_W;
  const bgY = -animData.row * FRAME_H;

  // Flip for run animation going left
  const isRunningLeft = anim === "run" && posRef.current > (mouseX.current - DOG_DISPLAY / 2);
  const flipStyle = isRunningLeft ? "scaleX(-1)" : "scaleX(1)";

  return (
    <div
      className="fixed z-[9999] select-none"
      style={{
        left: x,
        bottom: 0,
        width: DOG_DISPLAY,
        height: DOG_DISPLAY,
        cursor: "pointer",
      }}
      onClick={onPeekClick}
    >
      <div
        style={{
          width: DOG_DISPLAY,
          height: DOG_DISPLAY,
          backgroundImage: `url(${spritesheet})`,
          backgroundPosition: `${(bgX / FRAME_W) * DOG_DISPLAY}px ${(bgY / FRAME_H) * DOG_DISPLAY}px`,
          backgroundSize: `${SHEET_COLS * DOG_DISPLAY}px ${9 * DOG_DISPLAY}px`,
          imageRendering: "pixelated",
          transform: flipStyle,
        }}
      />
      {showHint && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground animate-fade-in">
          ↑↑↓↓←→←→BA
        </div>
      )}
    </div>
  );
};

export default PixelDog;
