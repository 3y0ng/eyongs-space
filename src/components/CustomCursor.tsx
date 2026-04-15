import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 12;

const CustomCursor = () => {
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const coords = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dots = dotsRef.current;
    const positions = dots.map(() => ({ x: -100, y: -100 }));

    const onMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      let { x, y } = coords.current;
      positions.forEach((pos, i) => {
        pos.x += (x - pos.x) * 0.35;
        pos.y += (y - pos.y) * 0.35;
        if (dots[i]) {
          dots[i].style.transform = `translate(${pos.x - 4}px, ${pos.y - 4}px)`;
          dots[i].style.opacity = String(1 - i / TRAIL_LENGTH);
        }
        x = pos.x;
        y = pos.y;
      });
      animFrame.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 rounded-full"
          style={{
            width: i === 0 ? 8 : 6,
            height: i === 0 ? 8 : 6,
            backgroundColor: `hsl(var(--terminal-green) / ${1 - i / TRAIL_LENGTH})`,
            transition: "none",
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
