import { useEffect } from "react";

/**
 * What the glass sits over: three faint, still fields of colour and some
 * grain, fixed behind the whole page.
 *
 * It also tells every pane of glass where the mouse pointer sits in the
 * pane's own coordinates (--lx / --ly), so a hovered pane can catch light
 * along its edge where the pointer is. Kept current through scrolling and
 * route changes, since either moves panes under a still pointer.
 */
const Ambient = () => {
  useEffect(() => {
    let frame = 0;
    let light: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      if (!light) return;
      const { x: lx, y: ly } = light;
      const h = window.innerHeight;

      document.querySelectorAll<HTMLElement>(".glass, .glass-row").forEach((pane) => {
        const r = pane.getBoundingClientRect();
        if (r.bottom < -200 || r.top > h + 200) return;
        pane.style.setProperty("--lx", `${Math.round(lx - r.left)}px`);
        pane.style.setProperty("--ly", `${Math.round(ly - r.top)}px`);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      light = { x: e.clientX, y: e.clientY };
      schedule();
    };

    // Panes come and go with each route, and must be lit the moment they land.
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      observer.disconnect();
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-orb ambient-orb--teal" />
      <div className="ambient-orb ambient-orb--violet" />
      <div className="ambient-orb ambient-orb--ember" />
      <div className="ambient-grain" />
    </div>
  );
};

export default Ambient;
