**Typographie Cinétique** (le narrateur visuel) et **l'Abstraction d'Interface** (la preuve par l'image).

### "Best Practices" (Le Pattern SaaS)

1.  **Le "Hook" (0:00 - 0:05) : Le problème est textuel**
    *   Jamais d'intro lente. Ça commence *in media res* (dans l'action).
    *   Utilisation de **Kinetic Typography** sur fond uni (ou abstrait).
    *   Mise en scène de la douleur ou du statu quo (ex: "Can't keep up?", "54% fail").
    *   *Technique :* Gros mots-clés, animations de texte "staggered" (un mot après l'autre), synchronisation parfaite avec le beat audio.

2.  **L'Alternance "Pulse" (Le rythme cardiaque de la vidéo)**
    *   La structure n'est pas linéaire, elle est pulsée :
        *   **Beat A :** Écran de texte géant (Context/Benefit). *Ex: "Built for speed"*
        *   **Beat B :** Zoom sur l'interface qui prouve le texte. *Ex: Une barre de chargement rapide.*
        *   **Beat A :** Retour au texte géant. *Ex: "Analyze Data"*
        *   **Beat B :** Zoom sur un graphique qui s'anime.
    *   Cela évite de surcharger l'utilisateur. On lit, puis on voit. On ne fait pas les deux en même temps.

3.  **L'Idéalisation de l'UI (UI Abstraction)**
    *   On ne montre jamais un "screenshot" complet et statique. C'est ennuyeux et illisible sur mobile.
    *   **Zoom extrême :** On recadre sur la *feature* précise (un bouton, un graphique, une ligne de code).
    *   **Simplification (Mockup) :** Dans tes composants React, cache la navigation, cache les footers, cache les sidebars inutiles. Ne garde que l'essence de l'action.
    *   **Données fictives parfaites :** Les noms, les chiffres et les graphiques doivent être esthétiques (pas de "test_user_1").

4.  **Le "Fantôme" (The Phantom User)**
    *   L'interface est vivante.
    *   Des curseurs invisibles ou stylisés cliquent sur des boutons.
    *   Des champs de texte se remplissent tout seuls (typing effect).
    *   Des notifications "poppent" à l'écran.
    *   *Règle d'or :* Si une UI est à l'écran, quelque chose doit bouger (même si c'est juste un léger effet de "breathing" ou de parallaxe).

5.  **Motion Language**
    *   **Easing :** Tout doit avoir des courbes de Bézier fluides (ex: `cubic-bezier(0.25, 1, 0.5, 1)`). Pas de mouvements linéaires robotiques.
    *   **Match Cuts :** Les transitions entre deux scènes utilisent souvent le mouvement (ex: la caméra bouge vers la droite, la scène suivante arrive par la gauche).

---

# SAAS VIDEO PRODUCTION SKILLS

Description: Guidelines and constraints for generating high-end SaaS product videos using React/Remotion.
Version: 1.0
Context: Software-as-a-Service (SaaS) Introduction

## CORE PHILOSOPHY
The video is not a tutorial; it is a hype reel. The goal is to maximize "perceived value" through rhythm, kinetic typography, and idealized UI interactions.

## 1. NARRATIVE STRUCTURE (The "Pulse" Pattern)
Generate scripts and visual sequences that follow this alternating rhythm:
- **Phase A (Context):** Full-screen Kinetic Typography. Short, punchy copy (1-4 words max). High contrast.
- **Phase B (Proof):** Focused UI interaction showing the feature described in Phase A.
- **Repeat:** Alternate A/B rapidly (every 2-4 seconds).

## 2. TYPOGRAPHY RULES
- **Scale:** Text must be MASSIVE. It is the protagonist.
- **Brevity:** Never write sentences. Write concepts. (Bad: "Our software allows you to collaborate." -> Good: "Collaborate instantly.")
- **Animation:** Use "Staggered reveals". Words appear in sync with the imaginary beat.
- **Highlighting:** Use the brand's primary color to highlight the *one* most important word in the phrase.

## 3. UI PRESENTATION (The "Idealized Interface")
When rendering React components for the video:
- **Abstraction:** Remove noise. Hide navbars, footers, and dense tables unless they are the focus.
- **Scale & Crop:** Zoom in heavily (200%-300%) on the specific component being discussed (e.g., the specific button or chart).
- **The "Phantom User":** The UI must act itself out.
  - Buttons show `:active` states or ripple effects without a visible mouse cursor (cleaner).
  - Input fields use a typing effect (simulated keystrokes).
  - Toggles slide smoothly.
- **Mock Data:** Use "Hollywood Data". Beautiful names, upward-trending graphs, round numbers.

## 4. MOTION & PHYSICS (Remotion Directives)
- **Easing:** All movements (slides, scales, opacities) must use an aggressive ease-out (e.g., specific spring physics or cubic-bezier). Nothing moves linearly.
- **Continuity:** Transitions should feel motivated. If an element slides out Left, the next element slides in from Right.
- **3D Space:** Use subtle 3D transforms (rotateX/rotateY) to give depth to flat UI cards (floating card effect).
- **Camera:** Keep a slow, constant "drift" (scale from 1.0 to 1.05) on static shots to maintain life.

## 5. SCENE TYPES & COMPOSITION
Select from these predefined visual archetypes:
- **The "Problem" Intro:** Dark background, stark white text, glitch or noise effects. High tempo.
- **The "Feature" Pop:** A blank canvas where UI elements (cards, dialogs) spring into existence one by one.
- **The "Integration" Flow:** Logos or icons flowing along a visible line/pipe into the main product logo.
- **The "Dashboard" Reveal:** A 3D tilted camera flyover of the full dashboard (only used once, usually near the end).

## 6. COLOR & LIGHTING
- **Dark Mode Default:** Unless specified, render the UI in Dark Mode (higher perceived value/tech feel).
- **Glows:** Use CSS `box-shadow` with high blur and brand colors behind key UI elements to make them "lift" off the background.
- **Backgrounds:** Never pure black/white. Use subtle gradients or animated abstract meshes/grid lines.

