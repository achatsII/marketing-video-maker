# Guide: Creating New High-Quality Scenes

If standard scenes (`SceneFloatingBubbles`, etc.) do not fit the product's specific features, you must create a NEW scene.

**CRITICAL**: New scenes must be indistinguishable in quality from the reference video.

## The "Reference Quality" Checklist
Any new scene must maximize these 4 specific metrics to be accepted:

### 1. Motion Richness (The "Alive" Factor)
*   **Never Static**: Even a static dashboard must have a slow "breathing" scale animation.
    ```tsx
    const breath = interpolate(frame, [0, 300], [1, 1.05]); // Subtle zoom
    ```
*   **Physics Entry**: Use `spring()` for all entrances. Never use linear tweens for UI appearing.
    ```tsx
    const scale = spring({ config: { damping: 15, stiffness: 80 } }); // Bouncy
    ```

### 2. Depth & Layering (The "Premium" Factor)
*   **Z-Axis**: Don't put everything on `z=0`.
    *   Background: `z=-100`
    *   Main UI: `z=0`
    *   Floating Elements/Badges: `z=50`
*   **Tilt**: Use `rotateX` or `rotateY` to show the UI is a "card" in 3D space, not a flat image.

### 3. UI Fidelity (The "Sharpness" Factor)
*   **No Screenshots**: If you need to show a Kanban board, **code it** using `<div>` and flexbox.
    *   *Why?* It allows you to animate individual cards later.
*   **Glassmorphism**: Use the standard backdrop filter recipe:
    ```css
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    ```

### 4. Contextual Focus (The "Story" Factor)
*   Don't just "show the screen". Show the **User Action**.
*   Use `GhostCursor` to show a click.
*   Use `ShineBorder` to highlight the active element.
*   Dim/Blur the parts of the UI that are not important right now.

## Example: Creating a "Kanban" Scene (New)
*   **Bad**: Fading in a PNG of a Trello board.
*   **Good**: 
    1.  Create `KanbanCard.tsx` component.
    2.  Use `AnimatedList` to stagger the entrance of 3 columns.
    3.  Use `spring()` to drag one card from "To Do" to "Done".
    4.  Add a particle explosion (or `ShineBorder`) when it lands.
