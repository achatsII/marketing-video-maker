# SaaS Video Guidelines

To ensure all generated videos match the quality of the reference `VideoTest`, strict adherence to these guidelines is required.

## 1. Visual Style: "Modern Dark SaaS"
*   **Background**: NEVER use a flat color. ALWAYS use the `BackgroundGradientAnimation` with the standard Deep Blue palette.
*   **Lighting**: Elements should feel "lit". Use `ShineBorder`, `NeonGradientCard`, and subtle drop shadows.
*   **Depth**: use `perspective` and `rotateX`/`rotateY` to give 2D UI elements a physical presence.

## 2. Typography
*   **Font**: Inter or San Francisco (System UI).
*   **Weights**:
    *   **Headings**: Bold / ExtraBold (700-800).
    *   **Body**: Regular / Medium (400-500).
*   **Sizing**: Contrast is key.
    *   **Giant**: 7xl/8xl for short, punchy words ("Fast.", "Secure.").
    *   **Small**: text-lg/xl for descriptive sentences.
*   **Animation**:
    *   Words should typically `FadeIn` + `BlurOn`.
    *   Use the "Aurora" effect (gradient text) for keywords.

## 3. Motion Principles
*   **Springs, not Tweens**: 90% of movement (entrances, slides, scales) should use `spring()`.
    *   *Standard Config*: `{ damping: 200, stiffness: 100 }` for UI.
    *   *Bouncy Config*: `{ damping: 15, stiffness: 80 }` for playful elements.
*   **Continuous Motion**: Nothing should ever be perfectly still.
    *   Use `interpolate(frame)` to add a slow "breathing" scale (1.0 -> 1.05) to static cards.
    *   Use slow floating animations for background elements.

## 4. Composition Rules
*   **The "Center-Stage" Rule**: Only ONE main element should be in focus at a time.
    *   If Text is showing, blur the background UI.
    *   If UI is acting (clicking, typing), shrink the text or move it aside.
*   **Transitions**:
    *   Default: `fade()` with `durationInFrames: 30`.
    *   Within Scenes: Elements should enter *staggered* (Text, then Phone, then Badge). Do not have everything appear at frame 0.

## 5. Forbidden Items 🚫
*   **Real World Footage**: No stock video of people typing.
*   **Flat White Backgrounds**: Never.
*   **Standard CSS Borders**: Use `ShineBorder` or semi-transparent RGBA borders.
*   **Generic Screenshots**: All UI must be recreated as Remotion Components for maximum resolution and animation control.
