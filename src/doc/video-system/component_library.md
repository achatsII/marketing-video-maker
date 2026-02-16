# Component Library

This library documents the core reusable components found in `src/_core` and `src/_library/scenes` that are approved for use in high-quality SaaS videos.

## Core UI Components (`src/_core/components`)

### `FadeText`
*   **Path**: `@/_core/components/FadeText`
*   **Purpose**: The standard text component for all headings and copy.
*   **Key Props**:
    *   `text` (string): The text to display.
    *   `direction` ('up' | 'down'): Animation enter direction.
    *   `delay` (number): Stagger delay between words.
    *   `auroraWords` (string[]): List of words to apply the "Aurora" gradient effect to.
    *   `wordRotates` (Record<string, string[]>): For rotating text effects (e.g., "Always [Fast/Secure/Reliable]").

### `BackgroundGradientAnimation`
*   **Path**: `@/_core/components/remotion/BackgroundGradientAnimation`
*   **Purpose**: The animated, breathing gradient background used globally.
*   **Usage**: Wrap the entire `TransitionSeries` in `Video.tsx` with this component.
*   **Customization**: Can adjust `firstColor`, `secondColor`, etc., but the default "Deep Blue/Purple" is the brand standard for now.

### `IPhoneFrame`
*   **Path**: `@/_core/components/remotion/iPhone`
*   **Purpose**: A high-fidelity CSS-only iPhone 14/15 frame.
*   **Key Props**:
    *   `width` (number): Width of the phone container.
    *   `darkMode` (boolean): Usually `true`.
    *   `children`: The UI to render inside the screen.

### `MacWindow` / `NeonGradientCard`
*   **Path**: `@/_core/components/remotion/MacWindow`, `@/_core/components/remotion/NeonGradientCard`
*   **Purpose**: Containers for Desktop/Dashboard UI.
*   **Usage**: Use `NeonGradientCard` for "Magical" features or stats. Use `MacWindow` for standard dashboard views.

## Helper Components

### `ShineBorder`
*   **Path**: `@/_core/components/remotion/ShineBorder`
*   **Purpose**: Adds a rotating gradient border to any container. Great for "Active" states or inputs.

### `GhostCursor`
*   **Path**: `@/_core/components/remotion/GhostCursor`
*   **Purpose**: Simulates mouse movement and clicking.
*   **Key Props**:
    *   `keyframes`: Array of `{ frame, x, y, click? }`.

## Standard Scene Wrappers (`src/_library/scenes`)

### `GenericFadeTextScene`
*   **Description**: A plug-and-play scene for displaying text with standard entrance/exit animations.
*   **Usage**:
    ```tsx
    <GenericFadeTextScene
        sequenceDuration={60}
        text="Your Value Prop Here"
        auroraWords={["Value"]}
    />
    ```
