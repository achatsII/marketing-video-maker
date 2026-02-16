import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { ResponsiveSafari } from "@/_core/components/remotion/ResponsiveSafari";
import { AnalyticsUI } from "../ui/AnalyticsUI";

export const Scene6Analytics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase A: Text (frames 0-60)
  const phaseA = frame < 60;
  const phaseAOpacity = phaseA
    ? interpolate(frame, [50, 60], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  // Phase B
  const phaseBFrame = frame - 60;
  const safariProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const safariY = interpolate(safariProgress, [0, 1], [400, 0]);
  const safariOpacity = frame >= 60 ? safariProgress : 0;

  // 3D tilt
  const rotateX = interpolate(frame, [60, 90], [8, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotateY = interpolate(frame, [60, 90], [-3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale drift
  const scaleDrift = interpolate(frame, [60, durationInFrames], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });


  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Phase A */}
      {phaseA && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: phaseAOpacity,
          }}
        >
          <TextGenerateEffect
            words="Track everything."
            staggerFrames={8}
            highlightWord="everything"
            highlightColor="#0078FF"
            className="text-center max-w-[1200px]"
          />
        </AbsoluteFill>
      )}

      {/* Phase B */}
      {frame >= 60 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: safariOpacity,
          }}
        >
          <div
            style={{
              width: 1100,
              transform: `translateY(${safariY}px) scale(${scaleDrift}) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformOrigin: "center center",
            }}
          >
            <ResponsiveSafari url="loto-ai.app/analytics" mode="default">
              <AnalyticsUI kpiDelay={65} chartDelay={85} />
            </ResponsiveSafari>
          </div>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
