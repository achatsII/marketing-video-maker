import { Composition, AbsoluteFill, Series } from 'remotion';
import { BackgroundGradientAnimation } from '@/_core/components/remotion/BackgroundGradientAnimation';
import { Scene1_Reveal } from './scenes/Scene1_Reveal';
import { Scene2_Bubbles } from './scenes/Scene2_Bubbles';
import { Scene3_Chatbot } from './scenes/Scene3_Chatbot';
import { Scene4_Typewriter } from './scenes/Scene4_Typewriter';
import { Scene5_Gatekeeper } from './scenes/Scene5_Gatekeeper';
import { Scene6_Dashboard } from './scenes/Scene6_Dashboard';
import { LotoAiV3Constants } from './constants';

export const LotoAiV3Video = () => {
    return (
        <AbsoluteFill className="bg-slate-950">
            <BackgroundGradientAnimation
                gradientBackgroundStart={LotoAiV3Constants.COLOR_BG_1} // Slate 900
                gradientBackgroundEnd={LotoAiV3Constants.COLOR_BG_2}   // Indigo 950
                firstColor="18, 113, 255" // Blue accent match
                secondColor="220, 38, 38" // Red accent match (LOTO)
                thirdColor="255, 215, 0"  // Gold accent match
            >
                <Series>
                    {/* Scene 1: Reveal (3s) */}
                    <Series.Sequence durationInFrames={90}>
                        <Scene1_Reveal />
                    </Series.Sequence>

                    {/* Scene 2: Bubbles (4s) */}
                    <Series.Sequence durationInFrames={120}>
                        <Scene2_Bubbles />
                    </Series.Sequence>

                    {/* Scene 3: Chatbot (Mobile Collection) (6s) */}
                    <Series.Sequence durationInFrames={180}>
                        <Scene3_Chatbot />
                    </Series.Sequence>

                    {/* Scene 4: Typewriter (AI Gen) (5s) */}
                    <Series.Sequence durationInFrames={150}>
                        <Scene4_Typewriter />
                    </Series.Sequence>

                    {/* Scene 5: Gatekeeper (Compliance) (7s) */}
                    <Series.Sequence durationInFrames={210}>
                        <Scene5_Gatekeeper />
                    </Series.Sequence>

                    {/* Scene 6: Dashboard (Results) (5s) */}
                    <Series.Sequence durationInFrames={150}>
                        <Scene6_Dashboard />
                    </Series.Sequence>
                </Series>
            </BackgroundGradientAnimation>
        </AbsoluteFill>
    );
};
