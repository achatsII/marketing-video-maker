# Scripts Vidéo pour Expert Knowledge Loop (SaaS)

Ce document contient 5 versions différentes de scripts pour une vidéo de présentation de 30 à 60 secondes.
Chaque script suit les règles d'or : **Kinetic Typography (Texte)**, **Pulse Pattern (Rythme)**, et **UI Abstraction (Simplicité)**.

## Légende des Composants
- **[Component]** : Le composant Remotion à utiliser (issu de `src/components/remotion` ou à adapter).
- **[Interface ID]** : L'interface issue de `interfaces.json` qui sert de base visuelle.
- **[Action]** : Ce que fait le "Phantom User" (curseur fantôme, saisie automatique).

---

## Script 1 : "The Pulse" (Rythme & Impact)
**Concept** : Une alternance rapide entre des mots-clés percutants et des preuves visuelles immédiates. Focus sur la vitesse et l'intelligence.
**Durée** : 35 secondes (Rapide)
**Musique** : Upbeat, basses lourdes, cuts précis.

| Temps | Visuel | Audio (SFX/Voice) | Composant & Interface | Animation |
| :--- | :--- | :--- | :--- | :--- |
| **00:00** | Fond noir. Texte géant blanc : **"STOP"**. | "Stop." (Bass drop) | `AuroraText` (Effet aurore subtil sur fond) | Zoom in brutal sur le mot. |
| **00:02** | Texte change : **"SEARCHING."** | "Searching." | `FlipWords` (Mot change) | Rotation du mot. |
| **00:04** | **Plan UI** : Bar de recherche. Curseur tape "Procédure note de frais". | Bruit de clavier rapide (ASMR style). | `PlaceholdersInputGlass` (Input stylisé) | `TypingAnimation`. Le texte apparait caractère par caractère. |
| **00:07** | Texte géant : **"START"**. | "Start." | `AuroraText` | Transition Slide Left. |
| **00:09** | Texte change : **"KNOWING."** | "Knowing." | `FlipWords` | Transition Slide Right. |
| **00:11** | **Plan UI** : Interface de Chat (ID 2). La réponse de l'IA s'affiche instantanément. Zoom sur la réponse. | Bruit de notification "Pop". | `ResponsiveSafari` (Browser) + `TextGenerateEffect` (Réponse) + **[Interface ID 2: Chatbot User Home]** (Simplifié: juste la bulle de réponse) | `spring` pop-in de la bulle. Scrolling fluide vers le bas. |
| **00:15** | Texte géant : **"EXPERTS"**. | "Experts." | `AuroraText` | Zoom out. |
| **00:17** | **Plan Mobile** : Notification sur iPhone "Martin a validé votre réponse". | Vibration bzzt-bzzt. | `iPhone` + `AnimatedList` (Notification UI) + **[Interface ID 10: Expert Notification]** (Simplifié: Une seule carte de notif) | L'iPhone glisse du bas (Slide Up). La notification "pop" avec un `spring`. |
| **00:20** | Texte géant : **"ON DEMAND."** | "On Demand." | `AuroraText` | Flash background. |
| **00:23** | **Plan UI** : Carte Profil Expert (ID 4) qui tourne pour montrer ses stats. | Woosh sonore. | `NeonGradientCard` + **[Interface ID 4: Expert Management]** (Simplifié: Carte profil isolée) | `3d-card` effect. Rotation Y légère. |
| **00:28** | Texte final : **"Expert Knowledge Loop."** Sous-titre: "Capture. Share. Repeat." | Logo Sound. | `Logo` + `SparklesText` | Fade in du logo. Particules. |
| **00:33** | Call to Action : "Get Started". | Silence. | `Button` (Shine effect) | Bouton pulse. |

---

## Script 2 : "The Story" (Chloé & Martin)
**Concept** : Raconter l'histoire du problème (questions sans réponses) et de la solution (l'expert libéré).
**Durée** : 50 secondes
**Musique** : Tendu au début, puis résolutif et inspirant.

| Temps | Visuel | Audio (SFX/Voice) | Composant & Interface | Animation |
| :--- | :--- | :--- | :--- | :--- |
| **00:00** | Texte : "Questions lost..." | "Questions lost..." | `BlurText` (Texte flou qui devient net) | Fade in lent. |
| **00:04** | **Plan UI** : Liste de questions "Pending" (ID 1) qui défile à l'infini. Rouge/Orange alertes. | Son de tic-tac d'horloge. | `AnimatedList` + **[Interface ID 1: Pending Questions]** (Simplifié: Juste les titres et badgets "Urgent") | Scroll infini vers le bas. |
| **00:08** | Texte : "...Knowledge trapped." | "...Knowledge trapped." | `BlurText` | Transition fond gris sombre à noir profond. |
| **00:12** | **Plan UI** : Bouton "Redirect Question" (ID 3). Un curseur clique dessus. | Click souris. | `GhostCursor` + `Button` + **[Interface ID 3: Redirect Question]** (Simplifié: Focus sur le bouton valider) | Le curseur arrive, hover, click (ripple effect). |
| **00:16** | Texte : "Until now." | "Until now." (Musique change: Majeur/Positif) | `SparklesText` | Explosion de particules dorées. |
| **00:20** | **Plan Mobile** : Interface de réponse vocale (ID 12). Spectre audio qui bouge. | "Here is the new process..." (Voix expert) | `iPhone` + `AudioWaveform` (à créer ou simuler avec barres animées) + **[Interface ID 12: Add New Q&A]** | Les barres audio bougent en rythme avec la voix. |
| **00:26** | **Plan UI** : Le texte se transcrit automatiquement dans le champ réponse. | Bruit de clavier suttil. | `TextGenerateEffect` + **[Interface ID 5: Respond to Question]** (Simplifié: Champ texte) | Le texte apparait mot par mot très vite. |
| **00:32** | Texte : "Instant Knowledge Base." | "Instant Knowledge Base." | `TypingAnimation` | Curseur clignotant à la fin. |
| **00:36** | **Plan UI** : Dashboard (ID 11) avec graphique qui monte. | Son de "Level Up". | `MacbookScroll` + **[Interface ID 11: Dashboard Statistics]** | Le Macbook s'ouvre. Le graphique s'anime (barres montent). |
| **00:42** | Texte : "Unleash your Experts." | "Unleash your Experts." | `AuroraText` (Couleurs vives) | Animation de dégradé en fond. |
| **00:46** | Logo & URL. | Jingle fin. | Logo | Zoom out final. |

---

## Script 3 : "The Ecosystem" (Feature Tour)
**Concept** : Une visite guidée rapide des 3 piliers : Chat, Expert, Admin. Montrer que c'est une suite complète.
**Durée** : 45 secondes
**Musique** : Techno soft, futuriste.

| Temps | Visuel | Audio (SFX/Voice) | Composant & Interface | Animation |
| :--- | :--- | :--- | :--- | :--- |
| **00:00** | Texte : "3 steps to knowledge." | "Three steps." | `WordRotate` (3, 2, 1...) | Rotation des mots. |
| **00:05** | **1. ASK.** Texte apparait à gauche. | "Ask." | `SplitText` | Slide in Left. |
| **00:07** | **Plan UI** : Chatbot (ID 2). Question posée -> Réponse avec Source (ID 9). | Bruit de scanner futuriste. | `ResponsiveSafari` + **[Interface ID 9: Q&A Source Detail]** (Pop-up source) | La fenêtre de source "pop" par dessus le chat avec un effet de verre (Glassmorphism). |
| **00:15** | **2. ESCALATE.** Texte apparait au centre. | "Escalate." | `SplitText` | Zoom in Center. |
| **00:17** | **Plan UI** : Liste d'experts (ID 4) qui défile horizontalement (Carrousel). | Son "Swoosh". | `InfiniteMovingCards` (à adapter de `marquee`) + **[Interface ID 4: Expert Management]** | Défilement horizontal continu des cartes experts. |
| **00:25** | **3. CAPTURE.** Texte apparait à droite. | "Capture." | `SplitText` | Slide in Right. |
| **00:27** | **Plan Mobile** : Validation de brouillon (ID 10/12). Switch "Publish" activé. | Click "Switch". | `iPhone` + `ShineBorder` (autour du téléphone) + **[Interface ID 8: User Settings / Toggles]** | Le doigt (GhostTouch) active un toggle. Le bord du téléphone brille. |
| **00:35** | Vue d'ensemble : Les 3 écrans (Chat, Expert, Mobile) flottent en 3D. | Accords synthé riches. | `3D-Card` / `ContainerScrollAnimation` (Vue isométrique) | Les 3 interfaces flottent dans l'espace et se connectent par des lignes lumineuses (`Beam`). |
| **00:40** | Texte : "Everything Connected." | "Connected." | `BackgroundGradientAnimation` | Fond s'anime avec des couleurs. |
| **00:45** | Logo. | Fin. | Logo | Fade out. |

---

## Script 4 : "Mobile First" (Vitesse & Terrain)
**Concept** : Focus sur l'usage en mobilité. Tout se fait du bout des doigts. Verticalité.
**Durée** : 30 secondes
**Musique** : Rapide, claquements de doigts, rythmé.

| Temps | Visuel | Audio (SFX/Voice) | Composant & Interface | Animation |
| :--- | :--- | :--- | :--- | :--- |
| **00:00** | iPhone 15 Pro Max en gros plan. Écran noir. | Son de déverrouillage "Click". | `iPhone` | L'écran s'allume. |
| **00:02** | **App Launch** : Logo KAI pulse. | Son de "Startup". | `iPhone` screen content | Logo pulse et transition vers Home. |
| **00:04** | **Action** : Scroll rapide dans la Knowledge Base (ID 6). | Bruit de friction vêtement/doigt. | `iPhone` + **[Interface ID 6: Q&A Knowledge Base]** | Scroll vertical rapide avec inertie réaliste. |
| **00:09** | **Action** : Tap sur une catégorie "Engineering". | "Tap." | `GhostCursor` (Rond tactile) | Effet ripple au touch. |
| **00:11** | **Action** : Swipe pour valider une réponse (ID 19/Validation Loop). | "Swoosh." | `iPhone` + **[Interface ID 10: Expert Notification]** (Carte à swiper) | Carte glisse vers la droite (Vert = Validé). |
| **00:15** | Texte superposé : **"Manage on the go."** | "On the go." | `AuroraText` (en overlay sur la vidéo) | Texte apparait par dessus l'iPhone. |
| **00:18** | **Action** : Dictée vocale (Micro qui pulse). | "Voice active." | `iPhone` + **[Interface ID 12: Add New Q&A]** (Bouton Micro) | Micro icon pulse avec `Glow`. Cercles concentriques. |
| **00:23** | Texte : **"Your pocket expert."** | "Pocket Expert." | `BoxReveal` (Texte se révèle) | Boite de couleur glisse pour révéler le texte. |
| **00:28** | Logo KAI sur fond de l'iPhone. | Jingle. | `iPhone` | L'iPhone tourne et disparait. |

---

## Script 5 : "The Phantom" (Demo Pure - Sans Texte)
**Concept** : Une démonstration fluide et ininterrompue de l'interface qui "vit" toute seule. Très satisfaisant visuellement (Oddly Satisfying). Texte minimaliste.
**Durée** : 40 secondes
**Musique** : Lofi Hip Hop / Chill mais pro.

| Temps | Visuel | Audio (SFX/Voice) | Composant & Interface | Animation |
| :--- | :--- | :--- | :--- | :--- |
| **00:00** | Barre de recherche au milieu de l'écran vide. | Silence. | `PlaceholdersInputGlass` | Fade in. |
| **00:03** | Typing: "Comment réinitialiser le serveur ?" | Clavier doux. | `TypingAnimation` | Frappe fluide. |
| **00:07** | Transition vers Interface Admin (ID 4 - Expert Management). Une carte expert est sélectionnée. | Click doux. | `MagicCard` (Carte avec effet) + **[Interface ID 4]** | Hover sur la carte expert, bordure s'illumine. |
| **00:12** | Transition vers Chat (ID 2). La réponse se génère ligne par ligne. | Son "Processing" léger. | `ResponsiveSafari` + **[Interface ID 2]** | `TextGenerateEffect` pour la réponse. |
| **00:18** | Zoom sur le bouton "Source" (ID 9). Click. | Click. | `ResponsiveSafari` (Zoom caméra) | La caméra (transform scale) zoom in sur le bouton. |
| **00:22** | Le pop-up source s'ouvre avec un effet de flou en arrière-plan. | Souffle d'air. | `ResponsiveSafari` + **[Interface ID 9]** + `Blur` (Backdrop) | Modal apparait avec `spring`. Background devient flou. |
| **00:28** | La souris descend et clique sur "Good Answer". | "Ding!" (Succès). | `GhostCursor` | Particules (Confetti) au clic sur le pouce vert. |
| **00:34** | Zoom out total pour voir toute l'interface. | "Ahhh" (Satisfaction). | `RefinedMacbook` | Le Macbook apparait autour de l'écran. |
| **00:38** | Logo. | Fin. | Logo | Simple fade. |

---

## Notes d'Implémentation pour le Développeur (To-Do)

1.  **Conversions Requises** :
    - Adapter `InfiniteMovingCards` (pour Script 3) depuis `ui/marquee.tsx` ou similaire.
    - Créer `AudioWaveform` (pour Script 2 & 4). Peut être simulé avec des `div` animées en CSS/Remotion loop.
    - Adapter `BoxReveal` (pour Script 4) si non présent.

2.  **Préparation des Assets** :
    - Générer les screenshots simplifiés des interfaces (ID 1, 2, 3, 4, 6, 9, 10, 11, 12).
    - *Astuce* : Créer ces "screenshots" directement en React/Remotion en reconstruisant l'interface avec des composants natifs (`div`, `flex`, `Text`) pour une netteté parfaite au zoom, plutôt que d'utiliser des images PNG.

3.  **Config Remotion** :
    - FPS: 30
    - Résolution: 1920x1080 (16:9)
    - Durée : Ajustable par script (suggéré 900 frames pour 30s).
