import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TextGenerateEffect } from "../../components/remotion/TextGenerateEffect";
import { NeonGradientCard } from "../../components/remotion/NeonGradientCard";
import { GhostCursor } from "../../components/remotion/GhostCursor";
import { ComplianceUI } from "../ui/ComplianceUI";

export const Scene5Compliance: React.FC = () => {
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
  const cardProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const cardY = interpolate(cardProgress, [0, 1], [300, 0]);
  const cardOpacity = frame >= 60 ? cardProgress : 0;

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

  // Cursor: clicks "Run Audit" button
  const cursorKeyframes = [
    { frame: 85, x: 1800, y: 800 },
    { frame: 108, x: 1180, y: 310 },
    { frame: 111, x: 1180, y: 310, click: true },
    { frame: 170, x: 1180, y: 310 },
    { frame: 195, x: 1900, y: -50 },
  ];

  // Audit starts after cursor click (phaseBFrame ~51)
  const auditStart = phaseBFrame >= 51 ? 51 : 9999;

  // Neon card turns green when audit passes
  const auditComplete = phaseBFrame >= 100;

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
            words=">95% compliant."
            staggerFrames={8}
            highlightWord="95%"
            highlightColor="#10b981"
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
            opacity: cardOpacity,
          }}
        >
          <div
            style={{
              transform: `translateY(${cardY}px) scale(${scaleDrift})`,
            }}
          >
            <NeonGradientCard
              width={1000}
              height={580}
              borderRadius={20}
              borderSize={2}
              neonColors={{
                firstColor: auditComplete ? "#10b981" : "#0078FF",
                secondColor: auditComplete ? "#34d399" : "#00C6FF",
              }}
            >
              <div style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 16 }}>
                <ComplianceUI
                  enterDelay={5}
                  auditStartFrame={auditStart}
                />
              </div>
            </NeonGradientCard>
          </div>
        </AbsoluteFill>
      )}

      {/* Cursor */}
      <AbsoluteFill style={{ zIndex: 50, pointerEvents: "none" }}>
        <GhostCursor keyframes={cursorKeyframes} size={48} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
