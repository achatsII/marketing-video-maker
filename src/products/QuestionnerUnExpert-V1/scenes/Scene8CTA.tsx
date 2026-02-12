import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { AuroraText } from "@/_core/components/remotion/AuroraText";
import { MovingBorder } from "@/_core/components/remotion/MovingBorder";

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [30, 50], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button
  const ctaProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeIn }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
          gap: 24,
        }}
      >
        {/* Logo / Product name */}
        <div
          style={{
            opacity: titleProgress,
            transform: `scale(${interpolate(titleProgress, [0, 1], [0.8, 1])})`,
          }}
        >
          <AuroraText
            colors={["#0078FF", "#7928CA", "#00C6FF", "#38bdf8"]}
            className="text-7xl font-black"
          >
            Questionner un expert
          </AuroraText>
        </div>

        {/* Slogan */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <p
            style={{
              color: "#a3a3a3",
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: 2,
            }}
          >
            Votre entreprise a la réponse.
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: ctaProgress,
            transform: `scale(${interpolate(ctaProgress, [0, 1], [0.8, 1])})`,
            marginTop: 16,
          }}
        >
          <MovingBorder
            borderRadius="2rem"
            containerClassName="h-14 w-64"
            className="text-base font-semibold"
          >
            Essayer maintenant
          </MovingBorder>
        </div>
      </div>
    </div>
  );
};
