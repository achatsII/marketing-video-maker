import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AuroraText } from "@/_core/components/remotion/AuroraText";
import { SparklesText } from "@/_core/components/remotion/SparklesText";

export const Scene2Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // "Introducing" text
  const introOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const introY = interpolate(frame, [0, 15], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1]);

  // Tagline
  const tagProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Fade out
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          gap: 20,
        }}
      >
        {/* Introducing */}
        <div
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            color: "#6b7280",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Introducing
        </div>

        {/* LOTO-AI */}
        <div
          style={{
            opacity: titleProgress,
            transform: `scale(${titleScale})`,
          }}
        >
          <AuroraText
            colors={["#0078FF", "#7928CA", "#00C6FF", "#38bdf8"]}
            className="text-8xl font-black"
          >
            LOTO-AI
          </AuroraText>
        </div>

        {/* Tagline */}
        <div style={{ opacity: tagProgress }}>
          <SparklesText
            colors={{ first: "#0078FF", second: "#00C6FF" }}
            sparklesCount={10}
            className="text-2xl font-medium text-white/80"
          >
            AI-Powered Safety Compliance
          </SparklesText>
        </div>
      </div>
    </div>
  );
};
