## Plan

1. **Make activation start off-screen right**
   - Change Mikey’s initial position from the left side to just beyond the right edge.
   - Set the first activation target to move inward from the right, so `mikey.exe` visibly begins with Mikey running onto the screen.

2. **Use run animation during startup**
   - Replace the current startup “walk” phase with a startup “run” phase.
   - Keep Mikey in `run` state until he reaches the first on-screen target, then allow normal wander/chase behavior.

3. **Remove the delayed invisible dog behavior**
   - Stop rendering the label/speech bubble before the dog sprite is ready.
   - Either preload before showing the whole pet container or keep a visible first frame while decoding; the goal is no floating label/bubble without Mikey.

4. **Use real directional animation frames**
   - Import and use `walk_left` frames for left movement instead of flipping right-facing walk frames.
   - Keep `run_right` for right movement and use a stable left-facing run fallback only when needed.
   - Ensure `dogState === "walk"` maps to walk frame arrays and `dogState === "run"` maps to run frame arrays, never a still pose.

5. **Eliminate per-frame image request churn properly**
   - Replace `<img src={frameSrc}>` swapping with a CSS sprite-frame renderer or a pre-decoded frame renderer that never goes blank between frames.
   - Use a numeric frame index from the animation hook instead of repeatedly changing the image `src` mid-decode.

6. **Validate the behavior**
   - Activate Mikey with the Konami flow in the preview.
   - Confirm he runs in from the right immediately, dog/label/bubble appear together, and walk/run states visibly cycle through multiple frames rather than floating as a still.