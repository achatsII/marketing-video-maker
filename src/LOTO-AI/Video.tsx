import { Sequence } from "remotion";
import { BackgroundGradientAnimation } from "../components/remotion/BackgroundGradientAnimation";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Solution } from "./scenes/Scene2Solution";
import { Scene3Dashboard } from "./scenes/Scene3Dashboard";
import { Scene4Editor } from "./scenes/Scene4Editor";
import { Scene5Compliance } from "./scenes/Scene5Compliance";
import { Scene6Analytics } from "./scenes/Scene6Analytics";
import { Scene7Mobile } from "./scenes/Scene7Mobile";
import { Scene8CTA } from "./scenes/Scene8CTA";

export const Video_LOTOAI: React.FC = () => {
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
      />

      {/* Scene 1 — Hook (0:00–0:04, 120 frames) */}
      <Sequence from={0} durationInFrames={120}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2 — Solution Reveal (0:04–0:08, 120 frames) */}
      <Sequence from={120} durationInFrames={120}>
        <Scene2Solution />
      </Sequence>

      {/* Scene 3 — Dashboard Overview (0:08–0:15, 210 frames) */}
      <Sequence from={240} durationInFrames={210}>
        <Scene3Dashboard />
      </Sequence>

      {/* Scene 4 — AI Editor Cockpit (0:15–0:23, 240 frames) */}
      <Sequence from={450} durationInFrames={240}>
        <Scene4Editor />
      </Sequence>

      {/* Scene 5 — Compliance Gatekeeper (Shifted back) */}
      <Sequence from={690} durationInFrames={210}>
        <Scene5Compliance />
      </Sequence>

      {/* Scene 6 — Analytics */}
      <Sequence from={900} durationInFrames={210}>
        <Scene6Analytics />
      </Sequence>

      {/* Scene 7 — Mobile Field Capture */}
      <Sequence from={1110} durationInFrames={120}>
        <Scene7Mobile />
      </Sequence>

      {/* Scene 8 — CTA */}
      <Sequence from={1230} durationInFrames={120}>
        <Scene8CTA />
      </Sequence>
    </div>
  );
};


