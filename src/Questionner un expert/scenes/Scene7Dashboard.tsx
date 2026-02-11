import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { NeonGradientCard } from "../../components/remotion/NeonGradientCard";
import { DashboardUI } from "../ui/DashboardUI";

export const Scene7Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic 3D entry
  const entryProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 40 },
  });

  const rotateX = interpolate(entryProgress, [0, 1], [15, 3]);
  const rotateY = interpolate(entryProgress, [0, 1], [-10, 0]);
  const translateY = interpolate(entryProgress, [0, 1], [100, 0]);
  const opacity = entryProgress;

  // Scale drift
  const scale = interpolate(frame, [0, 180], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeOut }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          opacity,
          transform: `
              perspective(1200px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(${translateY}px)
              scale(${scale})
            `,
        }}
      >
        <NeonGradientCard
          width={950}
          height={600}
          borderRadius={20}
          borderSize={2}
          neonColors={{ firstColor: "#0078FF", secondColor: "#00C6FF" }}
        >
          <DashboardUI statsDelay={15} chartDelay={35} />
        </NeonGradientCard>
      </div>
    </div>
  );
};
