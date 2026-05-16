## Diagnosis

Mikey worked in the claude-code preview because the local preview likely had the sprite PNGs cached and served them with lower latency. In Chrome/Lovable preview, each animation frame is being swapped as a separate `<img src>`. The browser network log shows repeated image requests for dog frames, many ending in `net::ERR_ABORTED`, followed by successful retries around ~660ms later.

That explains both symptoms:

- **Invisible for the first few seconds:** the current frame URL changes before the previous image finishes loading, so Chrome aborts the old request and the `<img>` has nothing decoded to paint yet.
- **Stuck standing / floating:** movement is driven by one loop, but the visible sprite is blocked by image decoding/request churn, so the element moves while the frame appears frozen or blank.

The asset files themselves are present and valid. The issue is not missing walk/run frames; it is the rendering strategy.

## Plan

1. **Stop swapping separate PNG URLs during animation**
   - Replace Mikey's `<img src={frameSrc}>` frame swapping with a CSS sprite-sheet renderer.
   - Use one loaded image per animation state instead of repeated network requests per frame.

2. **Generate reliable sprite strips from the existing assets**
   - Create horizontal sprite-strip assets from the existing `walk_right`, `walk_left`, `run_right`, `run_right_2`, `sit_idle`, and `sleep` PNG frames.
   - Normalize each strip to stable frame dimensions using the existing `sprites.json` max frame data so the dog does not jump between frames.

3. **Update MikeyPet to use sprite metadata**
   - Select the correct strip by `dogState` and direction.
   - Animate with `background-position` or a deterministic frame index, while keeping movement independent.
   - Prefer actual `walk_left` frames instead of flipping right-facing frames when moving left.

4. **Preload Mikey assets before showing the pet**
   - During the bone-rain activation overlay, preload the sprite strips.
   - Only mount/show Mikey after the required strips are decoded, with a short fallback timeout so activation never hangs.

5. **Simplify the animation hook**
   - Convert `useSpriteAnimation` from URL swapping to returning a numeric frame index, or add a new hook for frame indices.
   - Keep hooks unconditionally called to avoid the previous React hook-order error.

6. **Verify in Chrome/Lovable preview**
   - Activate Mikey with the Konami code.
   - Confirm he is visible immediately after the activation overlay.
   - Confirm walking/running use multiple frames while moving, with no floating single-frame pose.
   - Check network requests no longer show continuous aborted per-frame dog image loads.

## Files likely touched

- `src/components/MikeyPet.tsx`
- `src/hooks/useSpriteAnimation.ts` or a new frame-index hook
- Generated sprite-strip assets under `src/assets/dog_sprites/`

This keeps the existing behavior and assets, but makes the browser rendering robust in the Lovable iframe and normal Chrome.