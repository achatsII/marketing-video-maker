import { Composition, AbsoluteFill } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneAppNameReveal } from "./scenes/SceneAppNameReveal";
import { SceneFloatingBubbles } from "./scenes/SceneFloatingBubbles";
import { SceneTypewriter } from "./scenes/SceneTypewriter";
import { SceneChatbot } from "./scenes/SceneChatbot";
import { SceneGatekeeper } from "./scenes/SceneGatekeeper";
import { SceneDashboard } from "./scenes/SceneDashboard";
import { SceneLogoOutro } from "./scenes/SceneLogoOutro";

export const Video_LOTOAI_V2: React.FC = () => {
    // Standard transition: Fade 30 frames
    const transition = (
        <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: 30 })}
        />
    );

    return (
        <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(10, 20, 40)" // Deep Blue
            gradientBackgroundEnd="rgb(0, 0, 10)"
            firstColor="18, 113, 255" // Blue
            secondColor="221, 74, 255" // Purple
            thirdColor="100, 220, 255" // Cyan
            fourthColor="200, 50, 50" // Red accent (LOTO Brand)
            fifthColor="180, 180, 50"
            pointerInteractive={false}
            className="z-0"
        >
            <AbsoluteFill className="z-10">
                <TransitionSeries>
                    {/* Scene 1: Intro */}
                    <TransitionSeries.Sequence durationInFrames={120}>
                        <SceneAppNameReveal />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 2: Problem Bubbles */}
                    <TransitionSeries.Sequence durationInFrames={200}>
                        <SceneFloatingBubbles />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 3: Solution Typewriter */}
                    <TransitionSeries.Sequence durationInFrames={180}>
                        <SceneTypewriter />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 4: Mobile Chatbot */}
                    <TransitionSeries.Sequence durationInFrames={220}>
                        <SceneChatbot />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 5: Gatekeeper (Expert) */}
                    <TransitionSeries.Sequence durationInFrames={260}>
                        <SceneGatekeeper />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 6: Dashboard */}
                    <TransitionSeries.Sequence durationInFrames={150}>
                        <SceneDashboard />
                    </TransitionSeries.Sequence>
                    {transition}

                    {/* Scene 7: Outro */}
                    <TransitionSeries.Sequence durationInFrames={120}>
                        <SceneLogoOutro />
                    </TransitionSeries.Sequence>

                </TransitionSeries>
            </AbsoluteFill>
        </BackgroundGradientAnimation>
    );
};
