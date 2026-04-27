import { useState, useEffect, useRef, useCallback } from "react";
import { useSpriteAnimation } from "@/hooks/useSpriteAnimation";

// Sit / idle
import sitIdle0 from "@/assets/dog_sprites/sit_idle/sit_idle_00.png";
import sitIdle1 from "@/assets/dog_sprites/sit_idle/sit_idle_01.png";
import sitIdle2 from "@/assets/dog_sprites/sit_idle/sit_idle_02.png";

// Walk
import walkRight0 from "@/assets/dog_sprites/walk_right/walk_right_00.png";
import walkRight1 from "@/assets/dog_sprites/walk_right/walk_right_01.png";
import walkRight2 from "@/assets/dog_sprites/walk_right/walk_right_02.png";
import walkRight3 from "@/assets/dog_sprites/walk_right/walk_right_03.png";

// Run
import runRight0 from "@/assets/dog_sprites/run_right/run_right_00.png";
import runRight1 from "@/assets/dog_sprites/run_right/run_right_01.png";
import runRight2 from "@/assets/dog_sprites/run_right/run_right_02.png";

// Sleep
import sleep0 from "@/assets/dog_sprites/sleep/sleep_00.png";
import sleep1 from "@/assets/dog_sprites/sleep/sleep_01.png";

const SIT_IDLE_FRAMES = [sitIdle0, sitIdle1, sitIdle2];
const WALK_FRAMES = [walkRight0, walkRight1, walkRight2, walkRight3];
const RUN_FRAMES = [runRight0, runRight1, runRight2];
const SLEEP_FRAMES = [sleep0, sleep1];

const FACTS = [
  "i prefer walks over watching e-yong code.",
  "my favorite treats are cookies. session cookies.",
  "my dream? an infinite park with no leashes.",
  "i can hear a treat bag open from 3 rooms away.",
  "i don't understand typescript. but neither does e-yong sometimes.",
  "naps > deployments.",
  "i'm the real PM of this operation.",
  "i fetch data and tennis balls.",
  "e-yong says 'ship it' and i hear 'sit'.",
  "my tail wags at 60fps.",
  "i review all PRs. i approve everything.",
  "i don't bite. unless you push to main.",
  "every bug is a feature if you bark at claude enough.",
  "agile? i've been sprinting my whole life.",
];

type DogState = "idle" | "walk" | "run" | "sleep";

const DOG_SIZE = 56;
const WALK_SPEED = 1.5;
const RUN_SPEED = 3.5;
const CHASE_THRESHOLD = 450; // px — start walking toward mouse (2D distance)
const RUN_THRESHOLD = 250;   // px — close enough to run (2D distance)
const STOP_THRESHOLD = 30;   // px — close enough to stop
const THRESHOLD_HYSTERESIS = 30; // px — buffer to avoid state flicker at boundaries
const SLEEP_AFTER_MS = 12000;
const WANDER_PAUSE = [2000, 4000]; // idle pause range between wanders

// 16x16 pixel bone cursor as a data URI
const BONE_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cstyle%3Erect%7Bfill:%23fff%7D%3C/style%3E%3Crect x='2' y='6' width='12' height='4'/%3E%3Crect x='0' y='4' width='4' height='2'/%3E%3Crect x='0' y='10' width='4' height='2'/%3E%3Crect x='12' y='4' width='4' height='2'/%3E%3Crect x='12' y='10' width='4' height='2'/%3E%3C/svg%3E") 8 8, auto`;

interface MikeyPetProps {
  onDismiss: () => void;
}

const MikeyPet = ({ onDismiss }: MikeyPetProps) => {
  const [x, setX] = useState(() => window.innerWidth / 2 - DOG_SIZE / 2);
  const [facingRight, setFacingRight] = useState(true);
  const [dogState, setDogState] = useState<DogState>("idle");
  const [factIndex, setFactIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);

  const posRef = useRef(window.innerWidth / 2 - DOG_SIZE / 2);
  // Place mouse off-screen initially so the dog wanders instead of sitting
  // on top of the cursor (which would otherwise lock him into idle).
  const mouseX = useRef(-9999);
  const mouseY = useRef(-9999);
  const targetX = useRef(Math.random() * (window.innerWidth - DOG_SIZE));
  const hasMouseMoved = useRef(false);
  const lastInteraction = useRef(Date.now());
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();
  const frameRef = useRef<number>();
  const stateRef = useRef<DogState>("idle");

  // Pick the right frames for the current state and direction
  const frames =
    dogState === "run" ? RUN_FRAMES :
    dogState === "walk" ? WALK_FRAMES :
    dogState === "sleep" ? SLEEP_FRAMES :
    SIT_IDLE_FRAMES;

  const fps =
    dogState === "run" ? 10 :
    dogState === "walk" ? 8 :
    dogState === "sleep" ? 3 : 4;

  const frameSrc = useSpriteAnimation(frames, fps);

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      hasMouseMoved.current = true;
      lastInteraction.current = Date.now();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Swap cursor to a pixel bone when dog is running toward mouse
  useEffect(() => {
    if (dogState === "run") {
      document.documentElement.classList.add("bone-cursor");
    } else {
      document.documentElement.classList.remove("bone-cursor");
    }
    return () => { document.documentElement.classList.remove("bone-cursor"); };
  }, [dogState]);

  // Cycle facts
  useEffect(() => {
    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setFactIndex((i) => (i + 1) % FACTS.length);
        setShowBubble(true);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const pickWanderTarget = useCallback(() => {
    targetX.current = Math.random() * (window.innerWidth - DOG_SIZE);
  }, []);

  // Main animation loop
  useEffect(() => {
    const animate = () => {
      const currentX = posRef.current;
      const dogCenter = currentX + DOG_SIZE / 2;
      const dogY = window.innerHeight - 14 - DOG_SIZE / 2; // dog's vertical center
      const dx = mouseX.current - dogCenter;
      const dy = mouseY.current - dogY;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      const now = Date.now();

      // Sleep check
      if (now - lastInteraction.current > SLEEP_AFTER_MS && stateRef.current !== "sleep") {
        stateRef.current = "sleep";
        setDogState("sleep");
        if (idleTimer.current) {
          clearTimeout(idleTimer.current);
          idleTimer.current = undefined;
        }
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Wake from sleep when mouse is near
      if (stateRef.current === "sleep") {
        if (distToMouse < CHASE_THRESHOLD) {
          lastInteraction.current = now;
          stateRef.current = "idle";
          setDogState("idle");
        }
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Determine target and speed based on mouse proximity
      let target: number;
      let speed: number;
      let newState: DogState;

      // Hysteresis on the speed thresholds: once committed to a locomotion
      // state, stay in it until distance moves clearly past the boundary.
      // Prevents per-rAF state flicker (which resets the sprite frame to 0).
      const wasRunning = stateRef.current === "run";
      const wasIdle = stateRef.current === "idle";
      const stopBound = STOP_THRESHOLD + (wasIdle ? THRESHOLD_HYSTERESIS : 0);
      const runBound = wasRunning
        ? RUN_THRESHOLD + THRESHOLD_HYSTERESIS
        : RUN_THRESHOLD - THRESHOLD_HYSTERESIS;

      const mouseEngaged = hasMouseMoved.current;

      if (mouseEngaged && distToMouse < stopBound) {
        // Close enough — sit idle
        target = currentX;
        speed = 0;
        newState = "idle";
      } else if (mouseEngaged && distToMouse < runBound) {
        // Very close — run to mouse
        target = mouseX.current - DOG_SIZE / 2;
        speed = RUN_SPEED;
        newState = "run";
      } else if (mouseEngaged && distToMouse < CHASE_THRESHOLD) {
        // Nearby — walk to mouse
        target = mouseX.current - DOG_SIZE / 2;
        speed = WALK_SPEED;
        newState = "walk";
      } else {
        // Far from mouse (or no mouse activity yet) — wander
        target = targetX.current;
        speed = WALK_SPEED;
        newState = "walk";
      }

      const diff = target - currentX;
      const absDiff = Math.abs(diff);

      // Determine if the dog should be idle right now.
      // Only go idle when:
      //  - mouse is right on top of the dog (speed === 0), OR
      //  - we're wandering (mouse far away) and arrived at the wander target.
      // Crucially, do NOT flip to idle just because the dog caught up to the
      // moving mouse target — that causes rapid walk/idle oscillation at 60fps
      // and resets the sprite animation before frames can advance.
      const isChasing = distToMouse < CHASE_THRESHOLD;
      const shouldIdle = speed === 0 || (!isChasing && absDiff < 2);

      if (shouldIdle) {
        if (stateRef.current !== "idle") {
          stateRef.current = "idle";
          setDogState("idle");
        }

        // Schedule next wander if not already scheduled and mouse is far
        if (!idleTimer.current && !isChasing) {
          const pause = WANDER_PAUSE[0] + Math.random() * (WANDER_PAUSE[1] - WANDER_PAUSE[0]);
          idleTimer.current = setTimeout(() => {
            pickWanderTarget();
            idleTimer.current = undefined;
          }, pause);
        }
      } else {
        // Moving
        if (stateRef.current !== newState) {
          stateRef.current = newState;
          setDogState(newState);
        }
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
  }, [pickWanderTarget]);

  const [showDismissPrompt, setShowDismissPrompt] = useState(false);

  const handleClick = () => {
    lastInteraction.current = Date.now();
    if (stateRef.current === "sleep") {
      stateRef.current = "idle";
      setDogState("idle");
      return;
    }
    setShowDismissPrompt((v) => !v);
  };

  return (
    <div
      className="fixed bottom-0 left-0 z-[9998] w-full pointer-events-none"
      style={{ height: DOG_SIZE + 24 }}
    >
      {/* Dog sprite */}
      <div
        className="absolute pointer-events-auto select-none"
        style={{
          left: x,
          bottom: 14,
          width: DOG_SIZE,
          height: DOG_SIZE,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {/* Speech bubble */}
        {dogState !== "sleep" && !showDismissPrompt && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground transition-opacity duration-300 ${
              showBubble ? "opacity-100" : "opacity-0"
            }`}
          >
            {FACTS[factIndex]}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-border" />
          </div>
        )}

        {dogState === "sleep" && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 font-mono text-[10px] text-muted-foreground">
            zzz...
          </div>
        )}

        {/* Dismiss prompt */}
        {showDismissPrompt && dogState !== "sleep" && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-card border border-border rounded px-2 py-1.5 text-[10px] font-mono text-muted-foreground animate-fade-in z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="hover:text-foreground transition-colors"
            >
              send mikey to his bed? 🛏️
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-border" />
          </div>
        )}

        <img
          src={frameSrc}
          alt="Mikey the dog"
          className="w-full h-full"
          style={{
            imageRendering: "pixelated",
            transform: facingRight ? "scaleX(1)" : "scaleX(-1)",
          }}
          draggable={false}
        />

        <p className="font-mono text-[11px] text-muted-foreground text-center -mt-1">
          mikey
        </p>
      </div>
    </div>
  );
};

export default MikeyPet;
