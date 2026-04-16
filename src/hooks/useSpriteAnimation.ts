import { useState, useEffect, useRef } from "react";

/**
 * Cycles through an array of image sources at a given FPS.
 * Returns the current frame's src string.
 */
export const useSpriteAnimation = (
  frames: string[],
  fps: number = 8,
  playing: boolean = true,
): string => {
  const [frameIndex, setFrameIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const framesRef = useRef(frames);

  // Detect when the actual animation set changes (not just the array reference)
  // by comparing the first frame src — each animation set has unique frame URLs.
  const prevFirstFrame = useRef(frames[0]);
  if (frames[0] !== prevFirstFrame.current) {
    prevFirstFrame.current = frames[0];
    framesRef.current = frames;
    // Reset synchronously so we don't flash a stale frame
    setFrameIndex(0);
  } else {
    framesRef.current = frames;
  }

  useEffect(() => {
    if (!playing || frames.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const ms = 1000 / fps;
    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => (i + 1) % framesRef.current.length);
    }, ms);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [frames.length, fps, playing, frames[0]]);

  return frames[frameIndex] ?? frames[0];
};
