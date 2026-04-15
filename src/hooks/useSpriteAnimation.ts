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

  useEffect(() => {
    if (!playing || frames.length <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const ms = 1000 / fps;
    intervalRef.current = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length);
    }, ms);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [frames.length, fps, playing]);

  // Reset frame index when frames array changes
  useEffect(() => {
    setFrameIndex(0);
  }, [frames]);

  return frames[frameIndex] ?? frames[0];
};
