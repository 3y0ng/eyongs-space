import { useEffect, useState, useRef, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Returns:
 * - mikeyUnlocked: true once Konami code has been entered (persists in session)
 * - justActivated: true for 3s right after activation (for triggering the rain animation)
 */
export const useKonamiCode = () => {
  const [mikeyUnlocked, setMikeyUnlocked] = useState(() => {
    return sessionStorage.getItem("mikey_unlocked") === "true";
  });
  const [justActivated, setJustActivated] = useState(false);
  const index = useRef(0);

  const activate = useCallback(() => {
    sessionStorage.setItem("mikey_unlocked", "true");
    setJustActivated(true);
    setMikeyUnlocked(true);
    setTimeout(() => setJustActivated(false), 3500);
  }, []);

  useEffect(() => {
    if (mikeyUnlocked) return; // Already unlocked, no need to listen

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index.current]) {
        index.current++;
        if (index.current === KONAMI.length) {
          activate();
          index.current = 0;
        }
      } else {
        index.current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mikeyUnlocked, activate]);

  return { mikeyUnlocked, justActivated };
};
