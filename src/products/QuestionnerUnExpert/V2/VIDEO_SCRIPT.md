# Script Vidéo - ExpertFlow

**Durée totale** : ~45 secondes (1350 frames @ 30fps)
**Format** : 1920x1080 (16:9)
**Mode** : Dark Mode
**Couleur primaire** : #0078FF
**Police** : Inter

---

## INVENTAIRE DES COMPOSANTS

### Composants Remotion DISPONIBLES (déjà adaptés)
Ces composants sont dans `src/components/remotion/` et prêts à l'emploi :

| Composant | Utilisation prévue |
|-----------|-------------------|
| `BackgroundGradientAnimation` | Fonds animés pour les scènes texte |
| `TextGenerateEffect` | Apparition de texte mot par mot |
| `WordRotate` | Rotation de mots (problèmes/solutions) |
| `SparklesText` | Nom du produit avec effet sparkle |
| `AuroraText` | Texte avec effet aurora gradient |
| `NeonGradientCard` | Cartes avec bordure néon animée |
| `ShineBorder` | Bordures brillantes sur éléments clés |
| `MovingBorder` | Bordures en mouvement |
| `TypingAnimation` | Simulation de frappe utilisateur |
| `RefinedMacbook` | Affichage d'interfaces desktop |
| `GhostCursor` | Curseur fantôme pour interactions |

### Composants À ADAPTER (de `src/components/ui/` vers `src/components/remotion/`)

| Source UI | Cible Remotion | Raison |
|-----------|---------------|--------|
| `iphone.tsx` | `iPhone.tsx` | Afficher l'app mobile-first |
| `animated-list.tsx` | `AnimatedList.tsx` | Liste de notifications animée |
| `flip-words.tsx` | `FlipWords.tsx` | Alternative dynamique pour alterner des mots |

---

## STRUCTURE NARRATIVE

La vidéo suit le pattern **"Pulse"** alternant :
- **Phase A** : Typographie cinétique (texte géant, fond animé)
- **Phase B** : Interface simplifiée animée (preuve visuelle dans iPhone/Macbook)

---

## SCÈNE 1 : HOOK - Le Problème
**Frames** : 0 → 150 (5 secondes)

### Phase A - Texte (frames 0-100)
**Message** : "Le savoir de votre entreprise **se perd** chaque jour."

**Composants utilisés** :
- `BackgroundGradientAnimation` : Fond dark avec blobs bleus subtils
  - Props: `gradientBackgroundStart="rgb(15, 24, 35)"`, `gradientBackgroundEnd="rgb(5, 10, 20)"`
- `TextGenerateEffect` : Apparition mot par mot
  - Props: `words="Le savoir de votre entreprise se perd chaque jour."`, `highlightWord="perd"`, `highlightColor="#0078FF"`

**Animation** :
- Frame 0-10 : Fade in du background
- Frame 10-90 : TextGenerateEffect (stagger 8 frames entre mots)
- Frame 90-100 : Hold
- "se perd" apparaît en #0078FF

### Phase B - Transition visuelle (frames 100-150)
**Visuel** : Icônes abstraites (?) qui se dissolvent

**Animation** :
- 3 formes rondes avec "?" qui fade out progressivement
- Préparation transition vers scène 2

---

## SCÈNE 2 : AGGRAVATION
**Frames** : 150 → 300 (5 secondes)

### Phase A - Statistique choc (frames 150-250)
**Message** : "**54%** des connaissances partent avec les départs."

**Composants utilisés** :
- `BackgroundGradientAnimation` : Continuité du fond
- `WordRotate` : Pour le chiffre "54%" avec effet de scale
  - Props: `words={["54%"]}`, `framesPerWord={100}`
- `TextGenerateEffect` : Texte secondaire
  - Props: `words="des connaissances partent avec les départs."`

**Animation** :
- Frame 150-170 : "54%" apparaît avec spring scale (1.2 → 1.0)
- Frame 170-240 : Texte secondaire en stagger
- Frame 240-250 : Hold

### Phase B - Visual abstrait (frames 250-300)
**Visuel** : Transition slide vers la gauche

---

## SCÈNE 3 : PRÉSENTATION PRODUIT
**Frames** : 300 → 480 (6 secondes)

### Phase A - Nom du produit (frames 300-400)
**Message** : "**ExpertFlow**" puis "L'intelligence collective, **activée**."

**Composants utilisés** :
- `BackgroundGradientAnimation` : Fond avec couleurs plus vives
  - Props: `firstColor="0, 120, 255"`, `secondColor="100, 200, 255"`
- `SparklesText` : Nom du produit avec sparkles
  - Props: `text="ExpertFlow"`, `sparklesCount={12}`
- `TextGenerateEffect` : Slogan
  - Props: `words="L'intelligence collective, activée."`, `highlightWord="activée"`

**Animation** :
- Frame 300-340 : SparklesText scale spring (0 → 1)
- Frame 340-400 : Slogan apparaît en dessous
- Glow subtil autour du nom

### Phase B - Logo pulse (frames 400-480)
**Visuel** : Logo/icône avec `NeonGradientCard`

**Composants utilisés** :
- `NeonGradientCard` : Carte avec glow animé
  - Props: `neonColors={{ firstColor: "#0078FF", secondColor: "#00D4FF" }}`

**Animation** :
- Carte apparaît avec scale spring
- Bordure néon qui pulse

---

## SCÈNE 4 : FEATURE 1 - Chatbot IA
**Frames** : 480 → 720 (8 secondes)

### Phase A - Titre feature (frames 480-570)
**Message** : "Posez. Obtenez. **Instantanément.**"

**Composants utilisés** :
- `BackgroundGradientAnimation` : Fond continu
- `TextGenerateEffect` : Texte avec punch
  - Props: `words="Posez. Obtenez. Instantanément."`, `highlightWord="Instantanément"`, `staggerFrames={12}`

**Animation** :
- Chaque mot apparaît avec impact (stagger plus lent)
- "Instantanément" en primaire #0078FF

### Phase B - Interface Chatbot (frames 570-720)
**Interface source** : Chatbot User Home (ID: 2)

**Composants utilisés** :
- `iPhone` : **À ADAPTER** - Frame mobile pour afficher l'interface
  - Props: `width={375}`, `height={812}`
- `TypingAnimation` : Simulation de frappe
  - Props: `text="Quels sont nos objectifs Q3 ?"`
- `GhostCursor` : Curseur fantôme (optionnel sur mobile, peut utiliser TapIndicator)

**Interface simplifiée à créer** : `src/Questionner un expert - V2/ui/SimplifiedChatUI.tsx`
- Header minimaliste avec avatar IA
- 2 bulles de chat (user bleu, bot gris foncé)
- Input bar avec icône micro
- Couleurs: bg `#0f1823`, bulle user `#0078FF`, bulle bot `#1e2a39`

**Animation** :
- Frame 570-600 : iPhone apparaît (scale spring 0.8 → 1)
- Frame 600-650 : Question tapée dans l'input (TypingAnimation)
- Frame 650-670 : Bulle utilisateur slide from right
- Frame 670-690 : Indicateur "..." de l'IA
- Frame 690-720 : Réponse IA apparaît avec sources

---

## SCÈNE 5 : FEATURE 2 - Escalade Expert
**Frames** : 720 → 960 (8 secondes)

### Phase A - Titre feature (frames 720-810)
**Message** : "Pas de réponse ? **L'expert est notifié.**"

**Composants utilisés** :
- `TextGenerateEffect` :
  - Props: `words="Pas de réponse ? L'expert est notifié."`, `highlightWord="notifié"`

**Animation** :
- Texte apparaît en stagger
- Accent sur "L'expert est notifié"

### Phase B - Notification Expert (frames 810-960)
**Interfaces source** : Pending Questions (ID: 1), Respond to Question (ID: 5)

**Composants utilisés** :
- `iPhone` : **À ADAPTER** - Frame mobile
- `AnimatedList` : **À ADAPTER** - Liste de notifications qui apparaissent
- `NeonGradientCard` : Carte de notification avec glow
- `ShineBorder` : Effet brillant sur le bouton "Répondre"

**Interface simplifiée à créer** : `src/Questionner un expert - V2/ui/SimplifiedNotificationUI.tsx`
- Carte de notification avec question
- Badge de priorité
- Bouton micro pour réponse vocale
- Indicateur "Expert sollicité"

**Animation** :
- Frame 810-840 : Transition, nouveau contexte iPhone
- Frame 840-870 : Notification push slide from top (spring bounce)
- Frame 870-910 : Carte de question apparaît
- Frame 910-940 : Icône micro qui pulse
- Frame 940-960 : Bouton "Soumettre" s'active avec ShineBorder

---

## SCÈNE 6 : FEATURE 3 - Base de Connaissances
**Frames** : 960 → 1140 (6 secondes)

### Phase A - Titre feature (frames 960-1050)
**Message** : "Une mémoire qui **grandit** avec vous."

**Composants utilisés** :
- `TextGenerateEffect` :
  - Props: `words="Une mémoire qui grandit avec vous."`, `highlightWord="grandit"`
- `FlipWords` : **À ADAPTER** - Pour alterner "grandit" / "évolue" / "s'enrichit"
  - Props: `words={["grandit", "évolue", "s'enrichit"]}`, `duration={1000}`

**Animation** :
- Texte principal apparaît
- Le mot "grandit" alterne avec FlipWords

### Phase B - Dashboard (frames 1050-1140)
**Interface source** : Dashboard Statistics (ID: 11)

**Composants utilisés** :
- `RefinedMacbook` : Frame desktop pour le dashboard
- `NeonGradientCard` : Cartes de statistiques
- `MovingBorder` : Bordure animée sur les cartes

**Interface simplifiée à créer** : `src/Questionner un expert - V2/ui/SimplifiedDashboardUI.tsx`
- Grid 2x2 de stats cards
- Graphique à barres simplifié
- Compteurs animés

**Animation** :
- Frame 1050-1070 : Macbook apparaît (scale + rotation 3D légère)
- Frame 1070-1100 : Stats cards apparaissent en stagger
- Frame 1100-1130 : Compteurs animent (0 → valeur finale)
- Frame 1130-1140 : Barres du graphique montent

---

## SCÈNE 7 : FEATURE 4 - Validation Continue
**Frames** : 1140 → 1260 (4 secondes)

### Phase A - Titre feature (frames 1140-1200)
**Message** : "Toujours **à jour**. Toujours **fiable**."

**Composants utilisés** :
- `TextGenerateEffect` :
  - Props: `words="Toujours à jour. Toujours fiable."`, `highlightWord="fiable"`
- `AuroraText` : Pour "à jour" et "fiable" avec effet gradient
  - Props: `colors={["#0078FF", "#00D4FF", "#0078FF"]}`

**Animation** :
- Double highlight avec AuroraText sur les mots clés

### Phase B - Validation card (frames 1200-1260)
**Interface source** : Expert Notifications (ID: 10)

**Composants utilisés** :
- `iPhone` : Frame mobile
- `NeonGradientCard` : Carte de validation
- `ShineBorder` : Sur les boutons Oui/Non

**Interface simplifiée à créer** : `src/Questionner un expert - V2/ui/SimplifiedValidationUI.tsx`
- Question affichée
- Boutons "Oui" / "Non" stylisés
- Badge "Dernière utilisation: il y a 2h"

**Animation** :
- Frame 1200-1220 : Carte apparaît avec bounce
- Frame 1220-1240 : Checkmark animé apparaît
- Frame 1240-1260 : Badge "Validé" pulse avec glow

---

## SCÈNE 8 : OUTRO - Call to Action
**Frames** : 1260 → 1350 (3 secondes)

### Phase A - Slogan final (frames 1260-1350)
**Message** : "**ExpertFlow**" puis "Chaque question trouve son expert."

**Composants utilisés** :
- `BackgroundGradientAnimation` : Fond final épuré
- `SparklesText` : Nom du produit
  - Props: `text="ExpertFlow"`, `sparklesCount={20}`
- `TextGenerateEffect` : Slogan final
  - Props: `words="Chaque question trouve son expert."`
- `NeonGradientCard` : Encadrement du logo (optionnel)

**Animation** :
- Frame 1260-1290 : "ExpertFlow" apparaît en grand avec sparkles
- Frame 1290-1330 : Slogan apparaît en dessous
- Frame 1330-1350 : Fade to black progressif

---

## COMPOSANTS À ADAPTER

### 1. `iPhone.tsx` (Priorité: HAUTE)
**Source** : `src/components/ui/iphone.tsx`
**Cible** : `src/components/remotion/iPhone.tsx`

**Modifications requises** :
- Remplacer animations CSS par `interpolate()` / `spring()`
- Props pour afficher du contenu enfant
- Optionnel: animation d'apparition intégrée

### 2. `AnimatedList.tsx` (Priorité: MOYENNE)
**Source** : `src/components/ui/animated-list.tsx`
**Cible** : `src/components/remotion/AnimatedList.tsx`

**Modifications requises** :
- Remplacer `framer-motion` par `useCurrentFrame()` + `spring()`
- Stagger calculé avec index * delayFrames
- Props: `items`, `staggerFrames`, `animationType`

### 3. `FlipWords.tsx` (Priorité: BASSE)
**Source** : `src/components/ui/flip-words.tsx`
**Cible** : `src/components/remotion/FlipWords.tsx`

**Modifications requises** :
- Remplacer `AnimatePresence` par logique frame-based
- Calculer currentWord basé sur `Math.floor(frame / framesPerWord)`
- Animation de flip avec `rotateX` interpolé

---

## INTERFACES SIMPLIFIÉES À CRÉER

Toutes dans `src/Questionner un expert - V2/ui/` :

### 1. `SimplifiedChatUI.tsx`
Interface de chat épurée pour la scène 4.
- Header avec avatar IA
- Zone de bulles (max 2)
- Input bar minimaliste

### 2. `SimplifiedNotificationUI.tsx`
Interface de notification expert pour la scène 5.
- Carte avec question
- Badge priorité
- Bouton micro stylisé

### 3. `SimplifiedDashboardUI.tsx`
Dashboard simplifié pour la scène 6.
- 4 cartes de stats (grid 2x2)
- Graphique à barres basique
- Compteurs animables

### 4. `SimplifiedValidationUI.tsx`
Interface de validation pour la scène 7.
- Question affichée
- 2 boutons (Oui/Non)
- Badge de statut

---

## NOTES TECHNIQUES

### Transitions entre scènes
Utiliser `TransitionSeries` avec `fade()` (15 frames)
```tsx
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
```

### Easing standards
```tsx
// Entrée avec bounce léger
spring({ frame, fps, config: { damping: 15, stiffness: 120 } })

// Sortie smooth
spring({ frame, fps, config: { damping: 200 } })
```

### Palette de couleurs
```
--primary: #0078FF
--background: #0f1823
--card-bg: #1e2a39
--text-primary: #FFFFFF
--text-secondary: #9ca3af
--accent-cyan: #00D4FF
```

### FPS et durées
- 30 FPS
- Stagger texte: 8 frames
- Transitions: 15-20 frames
- Temps de lecture minimum: 45 frames (1.5s)

---

## PROCHAINES ÉTAPES

1. **Valider ce script**
2. **Adapter les composants manquants** :
   - [ ] iPhone.tsx
   - [ ] AnimatedList.tsx
   - [ ] FlipWords.tsx (optionnel)
3. **Créer les interfaces simplifiées**
4. **Créer la composition Remotion principale**
5. **Implémenter scène par scène**
6. **Ajouter les transitions**
7. **Test et ajustements**
