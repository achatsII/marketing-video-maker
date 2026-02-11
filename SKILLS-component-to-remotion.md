# SKILLS: Component to Remotion Conversion

## Objectif
Transformer des composants React interactifs (utilisant `framer-motion`, `useEffect`, `useState`) en composants **Remotion** déterministes pour la génération vidéo.

> [!IMPORTANT]
> **FIDÉLITÉ VISUELLE CRITIQUE**
> Le composant Remotion doit être **visuellement identique** au composant original.
> - **Mêmes classes Tailwind** (copier-coller exact).
> - **Mêmes couleurs, ombres, bordures**.
> - **Mêmes timings d'animation** (convertis en frames).
> - L'utilisateur ne doit pas voir la différence entre la version Web et la version Vidéo.

## Principes Fondamentaux de Remotion
1.  **Déterminisme Absolu** : Le rendu doit dépendre uniquement de la `frame` actuelle et des `props`.
2.  **Pas d'État (Stateless)** : `useState` et `useEffect` sont inutiles pour l'animation car la vidéo est un rendu frame par frame statique.
3.  **Frame-Driven** : Tout mouvement est une fonction de `useCurrentFrame()`.

## Tableau de Conversion

| Concept React / Framer | Équivalent Remotion |
| :--- | :--- |
| `useTime()`, `Date.now()` | `useCurrentFrame()` |
| `transition: { duration: 0.5 }` | Convertir en frames (ex: 0.5s * 30fps = 15 frames) |
| `delay: 0.2` | `frame - (0.2 * fps)` ou calcul manuel de l'offset |
| `staggerChildren: 0.1` | `const startFrame = index * staggerFrames` |
| `animate={{ opacity: 1 }}` | `interpolate(frame, [start, end], [0, 1])` |
| `type: "spring"` | `spring({ frame, fps, config: ... })` |
| `whileHover` | **Supprimer** (pas d'interaction souris en vidéo) |
| `Math.random()` | `random(seed)` de `remotion` (Doit être seedé) |

## Méthodologie "Step-by-Step"

### 1. Nettoyage
Supprimez tous les imports interactifs :
```diff
- import { motion, useAnimation } from "framer-motion";
- import { useState, useEffect } from "react";
+ import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
```

### 2. Définir la "Timeline"
Au lieu de penser en "durée", pensez en "intervalle de frames".
Identifiez quand l'animation commence et quand elle finit.

### 3. Remplacer `animate` par `interpolate`
Pour une animation linéaire ou par points clés.

**Avant (Framer Motion) :**
```tsx
<motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} />
```

**Après (Remotion) :**
```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const y = interpolate(frame, [0, 15], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

<div style={{ opacity, transform: `translateY(${y}px)` }} />
```

### 4. Remplacer `spring` par `spring()`
Si l'original utilisait une physique de ressort.

**Après (Remotion) :**
```tsx
const { fps } = useVideoConfig();
const scale = spring({
  frame,
  fps,
  config: { damping: 10, stiffness: 100 }
});

<div style={{ transform: `scale(${scale})` }} />
```

### 5. Gérer le "Stagger" (Délai en cascade)
Pour les listes (mots, cartes, items), calculez la frame de départ pour chaque élément.

**Pattern Stagger :**
```tsx
items.map((item, index) => {
  const delay = index * 5; // 5 frames de délai entre chaque
  const progress = spring({ frame: frame - delay, fps }); // L'animation commence à 'delay'
  
  return <div style={{ transform: `scale(${progress})` }}>{item}</div>
})
```

## Exemple Concret : Gradient Background

**React/Framer (Conceptuel) :**
Une animation infinie qui change la position du background.
```tsx
animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
transition={{ repeat: Infinity, duration: 5 }}
```

**Remotion :**
On mappe la durée totale de la vidéo (ou une boucle manuelle avec modulo) à la position.
```tsx
const { durationInFrames } = useVideoConfig();
// Cycle complet sur la durée de la vidéo
const pos = interpolate(frame, [0, durationInFrames], [0, 100]); 
// OU boucle toutes les 150 frames
// const loopFrame = frame % 150;
// const pos = interpolate(loopFrame, [0, 75, 150], [0, 100, 0]);

style={{ backgroundPosition: `${pos}% 50%` }}
```

## Checklist Spécifique au Projet
1.  **Copier le style CSS/Tailwind** : Gardez les classes `className` identiques (`cn(...)`).
2.  **Supprimer `layout="position"`** : Remotion ne gère pas le FLIP layout automatiquement.
3.  **Images** : Utilisez `<Img />` de Remotion au lieu de `<img />` si possible pour précharger, ou gardez `img` si les assets sont locaux.
4.  **Polices** : Assurez-vous que les polices sont chargées via `@remotion/google-fonts` dans `Root.tsx`.
