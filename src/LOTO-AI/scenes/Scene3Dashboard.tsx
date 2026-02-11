import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TextGenerateEffect } from "../../components/remotion/TextGenerateEffect";
import { ResponsiveSafari } from "../../components/remotion/ResponsiveSafari";
import { GhostCursor } from "../../components/remotion/GhostCursor";
import { DashboardUI } from "../ui/DashboardUI";

// Inner component for Safari content - gets its own timeline starting at 0
const SafariContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animation driven by frame (now starting at 0 for Phase B)
  const safariProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const safariY = interpolate(safariProgress, [0, 1], [400, 0]);

  // Scale drift
  const scaleDrift = interpolate(frame, [0, durationInFrames], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight card after cursor click (~58 frames into Phase B)
  const highlightCard = frame >= 58 ? 1 : -1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        opacity: safariProgress,
      }}
    >
      <div
        style={{
          width: 1100,
          transform: `translateY(${safariY}px) scale(${scaleDrift}) perspective(1200px) rotateX(5deg)`,
          transformOrigin: "center bottom",
        }}
      >
        <ResponsiveSafari url="loto-ai.app/dashboard" mode="default">
          <DashboardUI cardsDelay={10} highlightCardIndex={highlightCard} />
        </ResponsiveSafari>
      </div>
    </AbsoluteFill>
  );
};

export const Scene3Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Phase A: Text (frames 0-60)
  const phaseA = frame < 60;
  const phaseAOpacity = phaseA
    ? interpolate(frame, [50, 60], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Fade out
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ghost cursor: enters, clicks on a card (scene-absolute time)
  const cursorKeyframes = [
    { frame: 90, x: 1800, y: 900 },
    { frame: 115, x: 960, y: 520 },
    { frame: 118, x: 960, y: 520, click: true },
    { frame: 160, x: 960, y: 520 },
    { frame: 185, x: 1900, y: -50 },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      {/* Phase A: Text */}
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
            words="Manage all procedures."
            staggerFrames={8}
            highlightWord="all"
            highlightColor="#0078FF"
            className="text-center max-w-[1200px]"
          />
        </AbsoluteFill>
      )}

      {/* Phase B: Safari - uses Sequence to reset internal frame counter */}
      <Sequence from={60} durationInFrames={durationInFrames - 60}>
        <SafariContent />
      </Sequence>

      {/* Cursor */}
      <AbsoluteFill style={{ zIndex: 50, pointerEvents: "none" }}>
        <GhostCursor keyframes={cursorKeyframes} size={48} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
