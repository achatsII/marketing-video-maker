import { Sequence } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4Mobile } from "./scenes/Scene4Mobile";
import { Scene5Compliance } from "./scenes/Scene5Compliance";
import { Scene6Dashboard } from "./scenes/Scene6Dashboard";
import { Scene8CTA } from "./scenes/Scene8CTA";

export const Video_LOTOAIV4: React.FC = () => {
    return (
        <div className="dark" style={{ width: 1920, height: 1080, backgroundColor: "#050520" }}>
            <BackgroundGradientAnimation
                gradientBackgroundStart="rgb(15, 15, 40)"
                gradientBackgroundEnd="rgb(5, 5, 25)"
                firstColor="211, 47, 47"  // LOTO Red
                secondColor="255, 87, 34" // Orange
                thirdColor="60, 120, 255" // Keep some blue for contrast
                fourthColor="150, 30, 80"
                fifthColor="30, 80, 180"
                containerClassName="absolute inset-0 z-0 h-full w-full"
            />

            {/* Scene 1 — Hook (0:00–0:04, 120 frames) */}
            <Sequence from={0} durationInFrames={120}>
                <Scene1Hook />
            </Sequence>

            {/* Scene 2 — Problem (0:04–0:09, 150 frames) */}
            <Sequence from={120} durationInFrames={150}>
                <Scene2Problem />
            </Sequence>

            {/* Scene 3 — Solution (0:09–0:17, 240 frames) */}
            <Sequence from={270} durationInFrames={240}>
                <Scene3Solution />
            </Sequence>

            {/* Scene 4 — Mobile Collect (0:17–0:25, 240 frames) */}
            <Sequence from={510} durationInFrames={240}>
                <Scene4Mobile />
            </Sequence>

            {/* Scene 5 — Compliance (0:25–0:32, 210 frames) */}
            <Sequence from={750} durationInFrames={210}>
                <Scene5Compliance />
            </Sequence>

            {/* Scene 6 — Analytics (0:32–0:39, 210 frames) */}
            <Sequence from={960} durationInFrames={210}>
                <Scene6Dashboard />
            </Sequence>

            {/* Outro (0:39–0:43, 120 frames) */}
            <Sequence from={1170} durationInFrames={120}>
                <Scene8CTA />
            </Sequence>
        </div>
    );
};
