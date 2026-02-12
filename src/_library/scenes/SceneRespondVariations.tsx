import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { RespondToQuestion } from "@/_core/components/RespondToQuestion";

export const SceneRespondVariations: React.FC = () => {
    return (
        <AbsoluteFill>
            <Series>
                {/* Version 1: Glass Card with Aurora Question */}
                <Series.Sequence durationInFrames={120}>
                    <RespondToQuestion variant="v1" />
                </Series.Sequence>

                {/* Version 2: Dark Glass with Glow Effects */}
                <Series.Sequence durationInFrames={120}>
                    <RespondToQuestion variant="v2" />
                </Series.Sequence>

                {/* Version 3: Minimalist Dark with Accent */}
                <Series.Sequence durationInFrames={120}>
                    <RespondToQuestion variant="v3" />
                </Series.Sequence>

                {/* Version 4: Advanced GlassSurface */}
                <Series.Sequence durationInFrames={120}>
                    <RespondToQuestion variant="v3" />
                </Series.Sequence>
            </Series>
        </AbsoluteFill>
    );
};
