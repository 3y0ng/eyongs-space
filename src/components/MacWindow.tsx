import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

/**
 * A desktop-style window frame: traffic lights that actually work, and a
 * title bar you can grab and drag.
 *
 * Position is applied as a transform, so the window keeps its slot in the
 * document flow no matter where it is dragged and nothing below it reflows.
 * Dragging is clamped to the viewport, so a window can never be thrown
 * somewhere you cannot reach it.
 */

type MacWindowProps = {
  /** Shown centred in the title bar, and on the pill left behind when closed. */
  title: string;
  children: ReactNode;
  /** Classes for the outer frame (margins, width). */
  className?: string;
  /** Classes for the content area — padding lives here, not on the frame. */
  bodyClassName?: string;
  /** Applied while zoomed; the default lets a window spill past its column. */
  zoomClassName?: string;
  draggable?: boolean;
};

/** Keep this much of the window reachable at every edge. */
const EDGE_INSET = 140;
const TOP_INSET = 60; // clears the fixed navbar
const BOTTOM_INSET = 72;

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

type Light = "close" | "minimize" | "zoom";

const LIGHT_STYLE: Record<Light, { varName: string; label: string }> = {
  close: { varName: "--win-close", label: "Close" },
  minimize: { varName: "--win-minimize", label: "Minimize" },
  zoom: { varName: "--win-zoom", label: "Zoom" },
};

const LightGlyph = ({ kind }: { kind: Light }) => (
  <svg
    viewBox="0 0 8 8"
    className="h-2 w-2 opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100 motion-reduce:transition-none"
    fill="none"
    stroke="hsl(0 0% 12% / 0.75)"
    strokeWidth="1.1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    {kind === "close" && <path d="M2.3 2.3l3.4 3.4M5.7 2.3L2.3 5.7" />}
    {kind === "minimize" && <path d="M1.9 4h4.2" />}
    {kind === "zoom" && (
      <path d="M2.1 5.9V2.6h3.3M5.9 2.1v3.3H2.6" strokeWidth="1" />
    )}
  </svg>
);

const MacWindow = ({
  title,
  children,
  className = "",
  bodyClassName = "",
  zoomClassName = "lg:-mx-20 xl:-mx-32",
  draggable = true,
}: MacWindowProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [closed, setClosed] = useState(false);

  const drag = useRef<{
    px: number;
    py: number;
    ox: number;
    oy: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  } | null>(null);

  // A window parked at the far edge of a wide viewport would be stranded
  // off-screen on a narrow one, so send everything home when the size changes.
  useEffect(() => {
    const onResize = () =>
      setPos((p) => (p.x === 0 && p.y === 0 ? p : { x: 0, y: 0 }));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggable || !finePointer()) return;
      if ((e.target as HTMLElement).closest("button")) return;
      const el = frameRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      drag.current = {
        px: e.clientX,
        py: e.clientY,
        ox: pos.x,
        oy: pos.y,
        // Bounds on the pointer delta, derived from where the frame sits now.
        minX: EDGE_INSET - r.right,
        maxX: window.innerWidth - EDGE_INSET - r.left,
        minY: TOP_INSET - r.top,
        maxY: window.innerHeight - BOTTOM_INSET - r.top,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    },
    [draggable, pos.x, pos.y],
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    setPos({
      x: d.ox + clamp(e.clientX - d.px, d.minX, d.maxX),
      y: d.oy + clamp(e.clientY - d.py, d.minY, d.maxY),
    });
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  const toggleZoom = useCallback(() => {
    setMinimized(false);
    setZoomed((z) => !z);
    setPos({ x: 0, y: 0 });
  }, []);

  if (closed) {
    return (
      <div className={className}>
        <button
          type="button"
          data-hoverable
          onClick={() => setClosed(false)}
          className="group flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-muted-foreground/40 hover:text-foreground motion-reduce:transition-none"
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: "hsl(var(--win-close))" }}
          />
          <span>{title}</span>
          <span className="text-muted-foreground/60 group-hover:text-muted-foreground">
            reopen
          </span>
        </button>
      </div>
    );
  }

  // The frame stays above later siblings at all times: once a window has been
  // dragged over the content below it, painting order alone would put that
  // content on top and swallow clicks meant for the window.
  return (
    <div
      ref={frameRef}
      className={`relative ${zoomed ? zoomClassName : ""} ${
        dragging
          ? "z-30"
          : "z-20 transition-[transform,margin] duration-300 ease-out motion-reduce:transition-none"
      } ${className}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: dragging ? "transform" : undefined,
      }}
    >
      <div
        className={`overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 motion-reduce:transition-none ${
          dragging
            ? "shadow-2xl ring-1 ring-terminal-accent/25"
            : "shadow-lg shadow-black/20"
        }`}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={toggleZoom}
          data-hoverable={draggable ? "" : undefined}
          className="relative flex h-9 select-none items-center border-b border-border bg-secondary/50 px-3 touch-none"
        >
          <div className="group/lights flex shrink-0 items-center gap-2">
            {(["close", "minimize", "zoom"] as Light[]).map((kind) => (
              <button
                key={kind}
                type="button"
                aria-label={`${LIGHT_STYLE[kind].label} ${title}`}
                title={LIGHT_STYLE[kind].label}
                onClick={() => {
                  if (kind === "close") setClosed(true);
                  if (kind === "minimize") setMinimized((m) => !m);
                  if (kind === "zoom") toggleZoom();
                }}
                className="flex h-3 w-3 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terminal-accent"
                style={{ background: `hsl(var(${LIGHT_STYLE[kind].varName}))` }}
              >
                <LightGlyph kind={kind} />
              </button>
            ))}
          </div>

          {/* Centred across the whole bar, not the gap beside the lights. The
              inset clears the 52px light cluster on the narrowest window here
              (224px, the About page photo) without clipping its filename. */}
          <span className="pointer-events-none absolute inset-x-0 truncate px-14 text-center font-mono text-[11px] text-muted-foreground">
            {title}
          </span>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            minimized ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className={bodyClassName}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacWindow;
