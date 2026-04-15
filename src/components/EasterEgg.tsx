import { useState, useCallback } from "react";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import PixelDog from "@/components/PixelDog";
import BoneRain from "@/components/BoneRain";
import MikeyPet from "@/components/MikeyPet";

const EasterEgg = () => {
  const { mikeyUnlocked, justActivated } = useKonamiCode();
  const [showPet, setShowPet] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const handleRainTriggered = justActivated && !showPet;

  const onPeekClick = useCallback(() => {
    setHintVisible((v) => !v);
  }, []);

  const onRainComplete = useCallback(() => {
    setShowPet(true);
  }, []);

  const onDismiss = useCallback(() => {
    setDismissed(true);
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

      {/* Persistent Mikey pet at bottom of screen */}
      {showPet && !dismissed && <MikeyPet onDismiss={onDismiss} />}
    </>
  );
};

export default EasterEgg;
