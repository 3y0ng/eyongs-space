import { useEffect, useState } from "react";

/**
 * Matrix-rain style animation but with pixel art bones falling down.
 * Plays for ~3 seconds then calls onComplete.
 */

const BONE = "🦴";
const COLUMN_COUNT = 30;

interface FallingBone {
  id: number;
  col: number;
  delay: number;
  duration: number;
}

interface BoneRainProps {
  onComplete: () => void;
}

const BoneRain = ({ onComplete }: BoneRainProps) => {
  const [bones, setBones] = useState<FallingBone[]>([]);

  useEffect(() => {
    const generated: FallingBone[] = [];
    let id = 0;
    // Generate waves of bones
    for (let wave = 0; wave < 3; wave++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        generated.push({
          id: id++,
          col,
          delay: wave * 400 + Math.random() * 600,
          duration: 800 + Math.random() * 600,
        });
      }
    }
    setBones(generated);

    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden bg-background/90">
      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-[hsl(var(--terminal-accent)/0.05)]" />
      
      {/* Falling bones */}
      {bones.map((bone) => (
        <span
          key={bone.id}
          className="absolute text-sm"
          style={{
            left: `${(bone.col / COLUMN_COUNT) * 100}%`,
            top: "-20px",
            animation: `bone-fall ${bone.duration}ms ${bone.delay}ms linear forwards`,
            opacity: 0,
          }}
        >
          {BONE}
        </span>
      ))}

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-mono text-lg text-[hsl(var(--terminal-accent))] animate-blink">
          &gt; mikey.exe activated...
        </div>
      </div>
    </div>
  );
};

export default BoneRain;
