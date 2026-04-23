import { useEffect, useState, useRef, useCallback } from "react";
import { useSpriteAnimation } from "@/hooks/useSpriteAnimation";

import idleFront0 from "@/assets/dog_sprites/idle_front/idle_front_00.png";
import idleFront1 from "@/assets/dog_sprites/idle_front/idle_front_01.png";
import idleFront2 from "@/assets/dog_sprites/idle_front/idle_front_02.png";
import idleFront3 from "@/assets/dog_sprites/idle_front/idle_front_03.png";

const IDLE_FRONT_FRAMES = [idleFront0, idleFront1, idleFront2, idleFront3];

const PEEK_PHRASES = ["what's this?", "bark!", "shhhh", "woof!", "psst..."];

interface PixelDogProps {
  onPeekClick: () => void;
  showHint: boolean;
}

const DOG_SIZE = 48;
const PEEK_AMOUNT = DOG_SIZE * 0.65;

const PixelDog = ({ onPeekClick, showHint }: PixelDogProps) => {
  const [visible, setVisible] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [showKonami, setShowKonami] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const konamiTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const frameSrc = useSpriteAnimation(IDLE_FRONT_FRAMES, 3, visible);

  const clearTimers = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = undefined; }
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = undefined; }
    if (konamiTimerRef.current) { clearTimeout(konamiTimerRef.current); konamiTimerRef.current = undefined; }
  }, []);

  const schedulePeek = useCallback(() => {
    const delay = 15000 + Math.random() * 10000;
    timerRef.current = setTimeout(() => {
      const phrase = PEEK_PHRASES[Math.floor(Math.random() * PEEK_PHRASES.length)];
      setBubble(phrase);
      setShowKonami(false);
      setVisible(true);

      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        setBubble(null);
        setShowKonami(false);
        schedulePeek();
      }, 6000);
    }, delay);
  }, []);

  useEffect(() => {
    const initialDelay = 3000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      const phrase = PEEK_PHRASES[Math.floor(Math.random() * PEEK_PHRASES.length)];
      setBubble(phrase);
      setVisible(true);

      hideTimerRef.current = setTimeout(() => {
        setVisible(false);
        setBubble(null);
        schedulePeek();
      }, 6000);
    }, initialDelay);

    return clearTimers;
  }, [schedulePeek, clearTimers]);

  const handleClick = () => {
    onPeekClick();

    if (bubble && !showKonami) {
      konamiTimerRef.current = setTimeout(() => {
        setBubble("↑↑↓↓←→←→BA");
        setShowKonami(true);
      }, 400);
    } else {
      setBubble("↑↑↓↓←→←→BA");
      setShowKonami(true);
    }

    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = undefined; }
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
      setBubble(null);
      setShowKonami(false);
      schedulePeek();
    }, 5000);
  };

  return (
    <>
      {/* Speech bubble — positioned independently so it's not clipped */}
      {bubble && visible && (
        <div
          className="fixed z-[10000] animate-fade-in"
          style={{
            bottom: PEEK_AMOUNT - 6,
            right: 24 + DOG_SIZE + 8,
          }}
        >
          <div className="whitespace-nowrap bg-card border border-border rounded px-2 py-1 text-[10px] font-mono text-muted-foreground">
            {bubble}
            {/* Arrow pointing right toward the dog */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-[4px] w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[4px] border-l-border" />
          </div>
        </div>
      )}

      {/* Dog peek container — clips the sprite so only the head shows */}
      <div
        className="fixed z-[9999] select-none overflow-hidden"
        style={{
          bottom: 0,
          right: 24,
          width: DOG_SIZE,
          height: DOG_SIZE,
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <img
          src={frameSrc}
          alt="Mikey"
          style={{
            width: DOG_SIZE,
            height: DOG_SIZE,
            imageRendering: "pixelated",
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: visible
              ? `translateY(${DOG_SIZE - PEEK_AMOUNT}px)`
              : `translateY(${DOG_SIZE + 4}px)`,
          }}
          draggable={false}
        />
      </div>
    </>
  );
};

export default PixelDog;
