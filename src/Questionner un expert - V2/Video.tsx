import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { Scene1_Hook } from "./scenes/Scene1_Hook";
import { Scene2_Aggravation } from "./scenes/Scene2_Aggravation";
import { Scene3_Product } from "./scenes/Scene3_Product";
import { Scene4_ChatbotFeature_Alt } from "./scenes/Scene4_ChatbotFeature_Alt";
import { Scene5_ExpertFeature_Alt } from "./scenes/Scene5_ExpertFeature_Alt";
import { Scene6_KnowledgeBase } from "./scenes/Scene6_KnowledgeBase";
import { Scene7_Validation } from "./scenes/Scene7_Validation";
import { Scene8_Outro } from "./scenes/Scene8_Outro";

/**
 * ExpertFlow - Video de présentation SaaS
 *
 * Durée totale: ~45 secondes (1350 frames @ 30fps)
 * Format: 1920x1080 (16:9)
 * Mode: Dark Mode
 *
 * Structure:
 * - Scène 1: Hook (150 frames / 5s)
 * - Scène 2: Aggravation (150 frames / 5s)
 * - Scène 3: Présentation produit (180 frames / 6s)
 * - Scène 4: Feature Chatbot (240 frames / 8s)
 * - Scène 5: Feature Expert (240 frames / 8s)
 * - Scène 6: Knowledge Base (180 frames / 6s)
 * - Scène 7: Validation (120 frames / 4s)
 * - Scène 8: Outro (90 frames / 3s)
 *
 * Total avec transitions (15 frames chacune):
 * 150 + 150 + 180 + 240 + 240 + 180 + 120 + 90 - (7 * 15) = 1245 frames
 */

const TRANSITION_DURATION = 15; // 0.5s @ 30fps

export const Video_QuestionnerUnExpert_Mobile: React.FC = () => {
  const transition = (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
    />
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f1823" }}>
      <TransitionSeries>
        {/* Scène 1: Hook - Le problème */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene1_Hook />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 2: Aggravation - Statistique choc */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene2_Aggravation />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 3: Présentation du produit */}
        <TransitionSeries.Sequence durationInFrames={180}>
          <Scene3_Product />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 4: Feature - Chatbot IA */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <Scene4_ChatbotFeature_Alt />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 5: Feature - Escalade Expert */}
        <TransitionSeries.Sequence durationInFrames={500}>
          <Scene5_ExpertFeature_Alt />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 6: Feature - Knowledge Base */}
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene6_KnowledgeBase />
        </TransitionSeries.Sequence>

        {transition}

        {/* Scène 8: Outro - Call to Action */}
        <TransitionSeries.Sequence durationInFrames={90}>
          <Scene8_Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
