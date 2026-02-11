import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SceneFloatingBubbles } from "./scenes/SceneFloatingBubbles";
import { SceneLogoIntro } from "./scenes/SceneLogoIntro";
import { SceneFadeText } from "./scenes/SceneFadeText copy";
import { SceneRespondVariations } from "./scenes/SceneRespondVariations";
import { SceneFadeTextBubbles } from "./scenes/SceneFadeTextBubbles";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { SceneTypewriter } from "./scenes/SceneTypewriter";
import { SceneChatbotFeature } from "./scenes/SceneChatbotFeature";

export const VideoTest: React.FC = () => {
    return (
        <AbsoluteFill>
            <BackgroundGradientAnimation
                gradientBackgroundStart="rgb(8, 14, 24)"
                gradientBackgroundEnd="rgb(4, 10, 20)"
                firstColor="0, 70, 155"
                secondColor="0, 105, 180"
                thirdColor="20, 55, 125"
                fourthColor="0, 55, 110"
                fifthColor="35, 85, 140"
                size="80%"
                blendingValue="hard-light"
                containerClassName="absolute inset-0"
            >
                <Series>
                    <Series.Sequence durationInFrames={110} className="bg-black">
                        <SceneFadeText
                            sequenceDuration={110}
                            text="Et si vous mettiez fin aux questions sans réponses ?"
                            auroraWords={["questions", "réponses"]}
                        />
                    </Series.Sequence>

                    <Series.Sequence durationInFrames={120} className="bg-black">
                        <SceneFloatingBubbles />
                    </Series.Sequence>

                    <Series.Sequence durationInFrames={55} className="bg-black">
                        <SceneFadeText
                            sequenceDuration={55}
                            text="Posez n'importe quelle question"
                        />
                    </Series.Sequence>
                    <Series.Sequence durationInFrames={185}>
                        <SceneTypewriter />
                    </Series.Sequence>
                    <Series.Sequence durationInFrames={280}>
                        <SceneChatbotFeature />
                    </Series.Sequence>
                    <Series.Sequence durationInFrames={110}>
                        <SceneFadeText
                            sequenceDuration={110}
                            text="Pas de réponse ?"
                            initialDelay={100}
                        />
                    </Series.Sequence>
                    <Series.Sequence durationInFrames={100}>
                        <SceneLogoIntro />
                    </Series.Sequence>
                </Series>
            </BackgroundGradientAnimation>
        </AbsoluteFill>
    );
};
