import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const coords = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number>(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      coords.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (coords.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (coords.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        const size = hovering ? 40 : 28;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      animFrame.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-hoverable]")) {
        setHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-hoverable]")) {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animFrame.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animFrame.current);
    };
  }, [hovering]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Small center dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 4,
          height: 4,
          backgroundColor: "hsl(var(--terminal-accent))",
        }}
      />
      {/* Hollow ring that follows with lag and scales on hover */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border transition-[width,height,border-color] duration-200"
        style={{
          width: hovering ? 40 : 28,
          height: hovering ? 40 : 28,
          borderColor: hovering
            ? "hsl(var(--terminal-accent) / 0.8)"
            : "hsl(var(--terminal-accent) / 0.4)",
          borderWidth: hovering ? 2 : 1.5,
        }}
      />
    </div>
  );
};

export default CustomCursor;
