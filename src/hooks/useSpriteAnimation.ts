import { useState, useEffect, useRef } from "react";

/**
 * Cycles through an array of image sources at a given FPS.
 * Returns the current frame's src string.
 *
 * Uses setInterval driven by elapsed wall-clock time. Robust against:
 * - Background tab / iframe throttling (intervals still fire, just slower)
 * - Parent re-render storms (frame is derived from time, not a counter)
 * - Rapid state oscillation (animKey change resets start time cleanly)
 */
export const useSpriteAnimation = (
  frames: string[],
  fps: number = 8,
  playing: boolean = true,
): string => {
  const animKey = frames[0] ?? "";
  const [currentSrc, setCurrentSrc] = useState(animKey);

  // Refs let the interval callback always read the latest props without
  // having to recreate the interval on every render.
  const framesRef = useRef(frames);
  framesRef.current = frames;
  const fpsRef = useRef(fps);
  fpsRef.current = fps;
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const lastAnimKeyRef = useRef("");
  const startTimeRef = useRef(0);

  // Recreate the interval when fps or playing changes (timing depends on them).
  useEffect(() => {
    if (!playing) return;

    const tick = () => {
      const f = framesRef.current;
      if (!f.length) return;

      const key = f[0] ?? "";
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();

      // Reset start time when the animation set changes.
      if (key !== lastAnimKeyRef.current) {
        lastAnimKeyRef.current = key;
        startTimeRef.current = now;
      }

      const ms = 1000 / fpsRef.current;
      const elapsed = now - startTimeRef.current;
      const idx = f.length > 1 ? Math.floor(elapsed / ms) % f.length : 0;
      const next = f[idx] ?? f[0];

      setCurrentSrc((prev) => (prev === next ? prev : next));
    };

    // Tick immediately to set the initial frame, then on interval.
    tick();

    if (frames.length <= 1) return;

    const intervalMs = Math.max(16, 1000 / fps / 2); // sample at 2x fps
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [fps, playing, frames.length]);

  return currentSrc;
};
