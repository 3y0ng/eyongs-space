import { useState, useCallback } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import PixelDog from "@/components/PixelDog";
import BoneRain from "@/components/BoneRain";
import MikeyPet from "@/components/MikeyPet";

const EasterEgg = () => {
  const { mikeyUnlocked, justActivated } = useKonamiCode();
  const [showRain, setShowRain] = useState(false);
  const [showPet, setShowPet] = useState(() => {
    return sessionStorage.getItem("mikey_unlocked") === "true";
  });
  const [hintVisible, setHintVisible] = useState(false);

  // When just activated, show bone rain first
  const handleRainTriggered = justActivated && !showPet;

  const onPeekClick = useCallback(() => {
    setHintVisible((v) => !v);
  }, []);

  const onRainComplete = useCallback(() => {
    setShowPet(true);
  }, []);

  return (
    <>
      {/* Peeking dog hint — only before unlock */}
      {!mikeyUnlocked && (
        <PixelDog onPeekClick={onPeekClick} showHint={hintVisible} />
      )}

      {/* Bone rain transition animation */}
      {handleRainTriggered && !showPet && (
        <BoneRain onComplete={onRainComplete} />
      )}

      {/* Persistent Mikey pet above footer */}
      {showPet && <MikeyPet />}
    </>
  );
};

export default EasterEgg;
