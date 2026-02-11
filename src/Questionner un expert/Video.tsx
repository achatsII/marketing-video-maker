import { Sequence } from "remotion";
import { BackgroundGradientAnimation } from "../components/remotion/BackgroundGradientAnimation";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { SceneFusionChatbotProduct } from "./scenes/SceneFusionChatbotProduct";
import { Scene5Expert } from "./scenes/Scene5Expert";

import { Scene6Knowledge } from "./scenes/Scene6Knowledge";
import { Scene7Dashboard } from "./scenes/Scene7Dashboard";
import { Scene8CTA } from "./scenes/Scene8CTA";

export const Video_QuestionnerUnExpert: React.FC = () => {
  return (
    <div className="dark" style={{ width: 1920, height: 1080, backgroundColor: "#050520" }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(15, 15, 40)"
        gradientBackgroundEnd="rgb(5, 5, 25)"
        firstColor="18, 60, 180"
        secondColor="100, 20, 160"
        thirdColor="60, 120, 255"
        fourthColor="150, 30, 80"
        fifthColor="30, 80, 180"
        containerClassName="absolute inset-0 z-0 h-full w-full"
      >
        {/* Helper container to keep content above background if needed, but sequences manage their own z-index usually */}
      </BackgroundGradientAnimation>

      {/* Scene 1 — Hook (0:00-0:05, 150 frames) */}
      <Sequence from={0} durationInFrames={150}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2 — Problem amplification (0:05-0:09, 120 frames) */}
      <Sequence from={150} durationInFrames={120}>
        <Scene2Problem />
      </Sequence>

      {/* Scene 3 — Solution reveal (0:09-0:13, 120 frames) */}
      <Sequence from={270} durationInFrames={120}>
        <Scene3Solution />
      </Sequence>

      {/* Scene 4 — Chatbot feature (0:13-0:20, 210 frames) */}
      <Sequence from={390} durationInFrames={240}>
        <SceneFusionChatbotProduct />
      </Sequence>

      {/* Scene 5 — Expert response (0:21-0:28, 210 frames) */}
      <Sequence from={630} durationInFrames={210}>
        <Scene5Expert />
      </Sequence>

      {/* Scene 6 — Knowledge base (0:28-0:35, 210 frames) */}
      <Sequence from={840} durationInFrames={210}>
        <Scene6Knowledge />
      </Sequence>

      {/* Scene 7 — Dashboard reveal (0:35-0:41, 180 frames) */}
      <Sequence from={1050} durationInFrames={180}>
        <Scene7Dashboard />
      </Sequence>

      {/* Scene 8 — CTA / Closing (0:41-0:46, 150 frames) */}
      <Sequence from={1230} durationInFrames={150}>
        <Scene8CTA />
      </Sequence>
    </div>
  );
};
