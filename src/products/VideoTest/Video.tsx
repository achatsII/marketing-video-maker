import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneFloatingBubbles } from "@/_library/scenes/SceneFloatingBubbles";
import { SceneLogoOutro } from "@/_library/scenes/SceneLogoOutro";
import { GenericFadeTextScene } from "@/_library/scenes/GenericFadeTextScene";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { SceneTypewriter } from "@/_library/scenes/SceneTypewriter";
import { SceneDashboard } from "@/_library/scenes/SceneDashboard";
import { SceneChatbotFeatureV2 } from "@/_library/scenes/SceneChatbotFeatureV2";
import { SceneAppNameReveal } from "@/_library/scenes/SceneAppNameReveal";
import { SceneExpertFeature } from "@/_library/scenes/SceneExpertFeature";

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
                <TransitionSeries>
                    <TransitionSeries.Sequence durationInFrames={110} className="bg-black">
                        <GenericFadeTextScene
                            sequenceDuration={110}
                            text="Et si vous mettiez fin aux questions sans réponses ?"
                            auroraWords={["questions", "réponses"]}
                            initialDelay={1000}
                        />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Sequence durationInFrames={90} className="bg-black">
                        <GenericFadeTextScene
                            sequenceDuration={90}
                            text="La réponse est à portée de main"
                            auroraWords={["main", "réponse"]}
                            maxWordsPerLine={4}
                        />
                    </TransitionSeries.Sequence>


                    <TransitionSeries.Sequence durationInFrames={130}>
                        <SceneAppNameReveal />
                    </TransitionSeries.Sequence>


                    <TransitionSeries.Sequence durationInFrames={60} >
                        <GenericFadeTextScene
                            sequenceDuration={60}
                            text="Posez n'importe quelle question"
                        />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                    <TransitionSeries.Sequence durationInFrames={120}>
                        <SceneFloatingBubbles />
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 30 })} />

                    <TransitionSeries.Sequence durationInFrames={185}>
                        <SceneTypewriter />
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />

                    {/* ─── Alternative V2: Spring scroll ─── */}
                    <TransitionSeries.Sequence durationInFrames={180}>
                        <SceneChatbotFeatureV2 />
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />

                    <TransitionSeries.Sequence durationInFrames={60} >
                        <GenericFadeTextScene
                            sequenceDuration={60}
                            text="Pas de réponse ?"
                        />
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />

                    <TransitionSeries.Sequence durationInFrames={280}>
                        <SceneExpertFeature />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Sequence durationInFrames={60} >
                        <GenericFadeTextScene
                            sequenceDuration={60}
                            text="Plus qu'un chatbot"
                            maxWordsPerLine={4}

                        />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Sequence durationInFrames={60} >
                        <GenericFadeTextScene
                            sequenceDuration={60}
                            text="Un relais d'experts"
                            maxWordsPerLine={4}
                            auroraWords={["Un", "relais", "d'experts"]}
                        />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Sequence durationInFrames={100} >
                        <GenericFadeTextScene
                            sequenceDuration={100}
                            text="Une mémoire qui grandit avec vous"
                            maxWordsPerLine={4}
                            auroraWords={["avec", "vous"]}
                        />
                    </TransitionSeries.Sequence>
                    <TransitionSeries.Sequence durationInFrames={100} >
                        <GenericFadeTextScene
                            sequenceDuration={100}
                            text="Toujours ROTATE"
                            maxWordsPerLine={4}
                            auroraWords={["ROTATE"]}
                            wordRotates={{ "ROTATE": ["à jour", "fiable"] }}
                        />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 10 })} />

                    <TransitionSeries.Sequence durationInFrames={100}>
                        <SceneDashboard />
                    </TransitionSeries.Sequence>

                    <TransitionSeries.Sequence durationInFrames={100}>
                        {/* <SceneLogoIntro /> */}
                        <SceneLogoOutro />
                    </TransitionSeries.Sequence>




                </TransitionSeries>
            </BackgroundGradientAnimation>
        </AbsoluteFill>
    );
};
