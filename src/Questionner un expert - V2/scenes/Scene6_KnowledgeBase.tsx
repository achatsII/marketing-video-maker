import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/components/remotion/TextGenerateEffect";
import { NeonGradientCard } from "@/components/remotion/NeonGradientCard";
import { SimplifiedDashboardUI } from "../ui/SimplifiedDashboardUI";

export const Scene6_KnowledgeBase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: Title (frames 0-90)
  const showTitle = frame < 100;
  const titleOpacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: Dashboard (frames 90-180)
  const showDashboard = frame >= 80;
  const dashboardProgress = spring({
    frame: frame - 80,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  // 3D rotation effect
  const rotateX = interpolate(dashboardProgress, [0, 1], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });



  return (
    <AbsoluteFill>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(8, 15, 30)"
        gradientBackgroundEnd="rgb(5, 10, 22)"
        firstColor="0, 120, 255"
        secondColor="100, 50, 200"
        thirdColor="0, 180, 220"
        fourthColor="80, 0, 160"
        fifthColor="0, 100, 180"
        size="90%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        {/* Phase A: Title */}
        {showTitle && (
          <AbsoluteFill
            className="flex items-center justify-center"
            style={{ opacity: titleOpacity }}
          >
            <div className="text-center px-20">
              <TextGenerateEffect
                words="Une mémoire qui grandit avec vous."
                highlightWord="grandit"
                highlightColor="#0078FF"
                staggerFrames={10}
                className="text-5xl font-bold"
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Phase B: Neon Card with Dashboard */}
        {showDashboard && (
          <AbsoluteFill className="flex items-center justify-center">
            <div
              style={{
                transform: `
                  scale(${dashboardProgress * 0.9})
                  perspective(1500px)
                  rotateX(${rotateX}deg)
                `,
                opacity: dashboardProgress,
              }}
            >
              <NeonGradientCard width={900} height={560}>
                <SimplifiedDashboardUI
                  startFrame={80}
                />
              </NeonGradientCard>
            </div>
          </AbsoluteFill>
        )}
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
