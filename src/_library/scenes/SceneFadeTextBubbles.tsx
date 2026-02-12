import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from "remotion";
import { FadeText } from "@/_core/components/FadeText";
import { SceneFloatingBubbles } from "./SceneFloatingBubbles";

export const SceneFadeTextBubbles: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Slight zoom from 1 to 1.05 over the entire scene duration
    const scale = interpolate(
        frame,
        [0, durationInFrames],
        [1, 1.05],
        { extrapolateRight: "clamp" }
    );

    // The text appears first, then the bubbles overlay comes in
    // Bubbles start appearing around frame 60 (after text has settled)
    const bubblesStartFrame = 60;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "transparent",
                transform: `scale(${scale})`,
            }}
        >
            {/* Layer 1: FadeText - always visible underneath */}
            <AbsoluteFill
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 80,
                }}
            >
                <FadeText
                    text="Et si vous mettiez fin aux questions sans réponse ?"
                    className="text-8xl font-bold text-center leading-none text-white"
                    direction="up"
                    delay={150}
                    initialDelay={300}
                    maxWordsPerLine={5}
                    auroraWords={["questions", "réponse"]}
                />
            </AbsoluteFill>

            {/* Layer 2: Floating Bubbles overlay - comes on top to cover the text */}
            <Sequence from={bubblesStartFrame}>
                <AbsoluteFill>
                    <SceneFloatingBubbles />
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
