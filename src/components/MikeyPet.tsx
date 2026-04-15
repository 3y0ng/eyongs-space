import { useState, useEffect } from "react";

/**
 * Mikey the on-screen pet — sits above the footer after Konami code activation.
 * Shows fun facts about himself in speech bubbles.
 */

const MIKEY_ART = [
  "  ▄██▄  ",
  " █░░░░█ ",
  " █ ●░● █",
  " █░░▼░░█",
  "  █▄▄█  ",
  " ██████ ",
  "█░░░░░░█",
  "█░░░░░░█",
  " ██  ██ ",
];

const FACTS = [
  "i'm four years old! in human years at least.",
  "i prefer walks over watching e-yong code.",
  "my favorite toy is a squeaky bone.",
  "i once ate a USB cable. bad idea.",
  "i sit on e-yong's keyboard for attention.",
  "my dream? an infinite park with no leashes.",
  "i can hear a treat bag open from 3 rooms away.",
  "i don't understand typescript. but neither does e-yong sometimes.",
  "naps > deployments.",
  "i'm the real PM of this operation.",
];

const MikeyPet = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [wagging, setWagging] = useState(false);

  useEffect(() => {
    // Cycle through facts
    const interval = setInterval(() => {
      setShowBubble(false);
      setTimeout(() => {
        setFactIndex((i) => (i + 1) % FACTS.length);
        setShowBubble(true);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Occasional wag animation
  useEffect(() => {
    const wagInterval = setInterval(() => {
      setWagging(true);
      setTimeout(() => setWagging(false), 600);
    }, 3000);
    return () => clearInterval(wagInterval);
  }, []);

  return (
    <div className="w-full border-t border-border bg-background">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-end gap-4">
        {/* Mikey */}
        <div
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: wagging ? "rotate(-3deg)" : "rotate(0deg)",
          }}
        >
          <pre
            className="font-mono text-[6px] leading-[7px] text-foreground select-none"
            aria-label="Mikey the pixel art dog"
          >
            {MIKEY_ART.join("\n")}
          </pre>
          <p className="font-mono text-[8px] text-muted-foreground text-center mt-0.5">
            mikey
          </p>
        </div>

        {/* Speech bubble */}
        <div
          className={`relative bg-card border border-border rounded-lg px-3 py-2 mb-2 transition-opacity duration-300 ${
            showBubble ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Bubble tail */}
          <div className="absolute left-[-6px] bottom-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-border border-b-[6px] border-b-transparent" />
          <div className="absolute left-[-5px] bottom-3 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-card border-b-[6px] border-b-transparent" />
          <p className="font-mono text-xs text-muted-foreground max-w-[240px]">
            {FACTS[factIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MikeyPet;
