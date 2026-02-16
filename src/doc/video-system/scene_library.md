# Scene Library

This document provides a detailed breakdown of the high-quality scenes used in `VideoTest`. These scenes are "Battle Tested" and should be the primary building blocks for future videos.

## 1. `SceneFloatingBubbles`
*   **Path**: `@/_library/scenes/SceneFloatingBubbles`
*   **Concept**: A 3D camera fly-through of "User Problems/Questions". Represents chaos, confusion, or high volume of requests.
*   **Key Mechanics**:
    *   **3D Camera**: Moves along Z-axis (0 → 12).
    *   **Bubbles**: Placed at random (seeded) X/Y/Z coordinates.
    *   **Motion**: Bubbles float (sine wave) + grow as camera approaches + blur when too close/far (Depth of Field).
*   **Best For**: The "Problem" phase. Visualizing overwhelming data, questions, or bugs.
*   **Content**: Uses an array of `MESSAGES` (text + category).

## 2. `SceneTypewriter`
*   **Path**: `@/_library/scenes/SceneTypewriter`
*   **Concept**: A focused, cinematic view of a Search/Input bar.
*   **Sequence**:
    1.  **Entry**: Input bar drops in (Spring).
    2.  **Zoom**: Camera zooms in smoothly to the text area (Scale 1 → 3.5).
    3.  **Typing**: Text appears character by character.
    4.  **Ghost Cursor**: A mouse cursor appears, moves to the button, and clicks.
    5.  **Action**: Button clicks, border shines (`ShineBorder`), and the bar slides up/out.
*   **Best For**: The "Solution" or "Action" phase. Showing simplicity ("Just ask a question").

## 3. `SceneChatbotFeatureV2`
*   **Path**: `@/_library/scenes/SceneChatbotFeatureV2`
*   **Concept**: A mobile view of a chat interface with a "bouncy", organic scroll.
*   **Key Mechanics**:
    *   **Spring Scroll**: The phone position (`translateY`) is driven by a `spring()` that reacts to each new message appearing.
    *   **Perspective**: The phone is tilted (`rotateX(20deg)`) for a 3D feel.
*   **Best For**: Showing a conversation, a feed, or a timeline.

## 4. `SceneExpertFeature`
*   **Path**: `@/_library/scenes/SceneExpertFeature`
*   **Concept**: A complex, multi-layered notification scenario.
*   **Sequence**:
    1.  **Notification**: Phone appears. A notification slides in on the Lock Screen.
    2.  **Unlock**: Lock screen slides up to reveal the App UI behind it.
    3.  **Context**: Large text overlays ("Un expert est notifié") fade in/out in sync with the phone actions.
*   **Best For**: "Deep Dive" features. Showing what happens "under the hood" or notifications.

## 5. `SceneDashboard`
*   **Path**: `@/_library/scenes/SceneDashboard`
*   **Concept**: A 3D tilted card showing a dashboard/stats view.
*   **Key Mechanics**:
    *   **Neon Gradient**: Wrapped in a `NeonGradientCard` for a premium look.
    *   **3D Entrance**: Swoops in with high damping spring.
*   **Best For**: "Social Proof", "Results", or "Analytics" sections.

## 6. `SceneAppNameReveal`
*   **Path**: `@/_library/scenes/SceneAppNameReveal`
*   **Concept**: A dark, mysterious text reveal.
*   **Key Mechanics**:
    *   **Blur Reveal**: Text goes from `blur(20px)` to `blur(0px)`.
    *   **Backlight**: A black overlay fades out, revealing the global blue gradient *behind* the text.
*   **Best For**: Introduction. Revealing the name of the SaaS.
