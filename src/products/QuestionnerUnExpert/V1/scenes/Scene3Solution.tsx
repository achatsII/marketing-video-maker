import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AuroraText } from "@/_core/components/remotion/AuroraText";
import { SparklesText } from "@/_core/components/remotion/SparklesText";

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main title spring-in
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const titleScale = interpolate(titleProgress, [0, 1], [0.5, 1]);
  const titleOpacity = titleProgress;

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [40, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          <SparklesText
            colors={{ first: "#0078FF", second: "#00C6FF" }}
            sparklesCount={12}
            className="text-[120px] leading-none"
          >
            <AuroraText
              colors={["#0078FF", "#7928CA", "#00C6FF", "#38bdf8"]}
              className="font-black"
            >
              Questionner un expert
            </AuroraText>
          </SparklesText>
        </div>

        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 30,
          }}
        >
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: 2,
            }}
          >
            L'intelligence collective, activée.
          </p>
        </div>
      </div>
    </div>
  );
};
