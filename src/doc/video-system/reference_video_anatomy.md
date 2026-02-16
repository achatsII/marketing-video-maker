# Reference Video Anatomy: "VideoTest"

## Overview
This document deconstructs the reference video (`src/products/VideoTest/V1/Video.tsx`) to establish the "Gold Standard" for motion design SaaS explainer videos in this project.

## Core Philosophy
- **Style**: Dark mode, sleek, high-end "Linear-style" or "Apple-style" aesthetics.
- **Colors**: Deep blues/purples for background (`rgb(8, 14, 24)` to `rgb(4, 10, 20)`), Neon/Gradient accents for UI elements.
- **Motion**: Physics-based springs (bouncy but controlled), smooth interpolations, constant subtle movement (floating, breathing) even when static.
- **Text**: Minimalist, San Francisco/Inter font, widely varying sizes (massive headings vs small labels).

## Pacing & Rhythm (1470 Frames Total ~ 49s @ 30fps)

| Sequence | Duration | Purpose | Key Visuals |
| :--- | :--- | :--- | :--- |
| **0. Hook** | 200f (6.6s) | Grab attention | Dynamic text "Et si vous mettiez fin aux questions sans réponses ?" + Gradient Background. |
| **1. Reveal** | 130f (4.3s) | Introduce Brand | `SceneAppNameReveal`: Big text reveal with blur/opacity play. |
| **2. Problem** | 60f + Trans | Agitate Pain | "Posez n'importe quelle question". Transition to Bubbles. |
| **3. Agitation** | 120f (4s) | Visualize Chaos | `SceneFloatingBubbles`: 3D camera fly-through of user questions/problems. |
| **4. Solution** | 185f (6.1s) | Introduce Product | `SceneTypewriter`: Focus on input field. Typing question. "Magic" button click. |
| **5. Demo V2** | 180f (6s) | Show Action | `SceneChatbotFeatureV2`: Mobile view. Spring-loaded chat interface. Smooth scrolling. |
| **6. Benefit** | 280f (9.3s) | Deep Dive | `SceneExpertFeature`: "Un expert est notifié". Complex notification flow on iPhone lock screen. |
| **7. Value Props** | ~220f (7.3s) | Reinforce Value | Series of `GenericFadeTextScene`: "Plus qu'un chatbot", "Toujours à jour". Rotating words. |
| **8. Dashboard** | 100f (3.3s) | Pro Proof | `SceneDashboard`: 3D tilted card showing analytics/stats. |
| **9. Outro** | 100f (3.3s) | CTA / Brand | `SceneLogoOutro`: Logo reveal with final gradient sweep. |

## Technical Signitures
1.  **Global Background**: `BackgroundGradientAnimation` runs continuously behind everything. Transitions (fade/wipe) happen *on top* of it or blend with it.
2.  **Transitions**: Mostly `fade()` with `linearTiming({ durationInFrames: 30 })`. Simple but effective.
3.  **Camera Movement**:
    *   **Z-Axis**: Used heavily in `SceneFloatingBubbles` and `SceneTypewriter` (Zoom in/out).
    *   **Tilt (Rotate X/Y)**: Used in `SceneDashboard` and `SceneChatbotFeatureV2` to give depth to 2D UI.
4.  **UI Components**:
    *   All UI is recreated in code (Remotion components), NO screenshots/video files (except specific wallpapers).
    *   Glassmorphism: High blur, low opacity white backgrounds, thin borders.
    *   Neon/Glow: `NeonGradientCard` and `ShineBorder` used to highlight key elements.
