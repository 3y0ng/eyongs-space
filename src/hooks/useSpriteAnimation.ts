import { useState, useEffect, useRef } from "react";

/**
 * Cycles through an array of image sources at a given FPS.
 * Returns the current frame's src string.
 *
 * Time-based: the displayed frame is computed from wall-clock elapsed time
 * since the animation set started. Robust against rapid React re-renders or
 * state oscillation — frames never freeze on index 0 because we never reset
 * a counter; we just read elapsed time.
 */
export const useSpriteAnimation = (
  frames: string[],
  fps: number = 8,
  playing: boolean = true,
): string => {
  // A tiny tick state used only to force re-renders at the animation cadence
  // when the parent isn't already re-rendering for other reasons.
  const [, forceRender] = useState(0);

  // Reset the animation start time when the animation set actually changes
  // (detected via the first frame's URL — stable per animation set).
  const animKey = frames[0] ?? "";
  const prevAnimKey = useRef(animKey);
  const startTimeRef = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );

  if (animKey !== prevAnimKey.current) {
    prevAnimKey.current = animKey;
    startTimeRef.current =
      typeof performance !== "undefined" ? performance.now() : Date.now();
  }

  useEffect(() => {
    if (!playing || frames.length <= 1) return;
    const ms = 1000 / fps;
    const id = setInterval(() => forceRender((n) => n + 1), ms);
    return () => clearInterval(id);
  }, [fps, playing, frames.length]);

  if (frames.length === 0) return "";

  const now =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  const elapsed = now - startTimeRef.current;
  const ms = 1000 / fps;
  const frameIndex = playing
    ? Math.floor(elapsed / ms) % frames.length
    : 0;

  return frames[frameIndex] ?? frames[0];
};
