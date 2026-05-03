import { useState, useEffect, useRef } from "react";

/**
 * Cycles through an array of image sources at a given FPS.
 * Returns the current frame's src string.
 *
 * Uses an animation key (first frame) so the cycle restarts cleanly
 * when the animation set changes, but is stable across re-renders
 * even when the parent passes a new array literal each render.
 */
export const useSpriteAnimation = (
  frames: string[],
  fps: number = 8,
  playing: boolean = true,
): string => {
  const [frameIndex, setFrameIndex] = useState(0);
  const framesRef = useRef(frames);
  framesRef.current = frames;

  // Stable identity for the current animation set.
  const animKey = frames[0] ?? "";
  const frameCount = frames.length;

  useEffect(() => {
    // Reset to first frame when the animation set changes.
    setFrameIndex(0);

    if (!playing || frameCount <= 1) return;

    const ms = 1000 / fps;
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % framesRef.current.length);
    }, ms);

    return () => clearInterval(id);
  }, [animKey, frameCount, fps, playing]);

  return frames[frameIndex] ?? frames[0];
};
