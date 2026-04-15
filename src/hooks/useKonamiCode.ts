import { useEffect, useState, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export const useKonamiCode = () => {
  const [activated, setActivated] = useState(false);
  const index = useRef(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index.current]) {
        index.current++;
        if (index.current === KONAMI.length) {
          setActivated(true);
          index.current = 0;
          setTimeout(() => setActivated(false), 4000);
        }
      } else {
        index.current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return activated;
};
