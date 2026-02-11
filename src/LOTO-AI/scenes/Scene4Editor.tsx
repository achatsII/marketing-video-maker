import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { TextGenerateEffect } from "../../components/remotion/TextGenerateEffect";
import { ResponsiveSafari } from "../../components/remotion/ResponsiveSafari";
import { GhostCursor } from "../../components/remotion/GhostCursor";
import { EditorCockpitUI } from "../ui/EditorCockpitUI";

// Inner component for Safari content - gets its own timeline starting at 0
const SafariContent: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation driven by frame (now starting at 0 for Phase B)
  const safariProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const safariY = interpolate(safariProgress, [0, 1], [400, 0]);

  // Exit Zoom (Zoom through)
  const exitDuration = 20;
  const exitStart = duration - exitDuration;
  const exitScale = interpolate(frame, [exitStart, duration], [1, 50], {
    extrapolateLeft: "clamp",
    easing: Easing.in(Easing.exp),
  });

  // Scale drift
  const scaleDrift = interpolate(frame, [0, duration], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          height: 700, // Fixed height for proper aspect
          transform: `translateY(${safariY}px) scale(${scaleDrift * exitScale}) perspective(1200px) rotateX(5deg)`,
          transformOrigin: "center center",
        }}
      >
        <ResponsiveSafari url="loto-ai.app/editor" mode="default">
          <EditorCockpitUI
            generateClickFrame={85}
            typingStartFrame={90}
          />
        </ResponsiveSafari>
      </div>
    </AbsoluteFill>
  );
};

export const Scene4Editor: React.FC = () => {
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

  // Fade out disabled (zoom through transition instead)
  const fadeOut = 1;

  // Cursor keyframes are in scene-absolute time
  // Cursor enters at frame 125 (65 frames into Phase B)
  // Target: "Generate" button top-right. Window centered.
  // 1100px wide. Center 960. Right edge 1510. Button ~1420?
  // 700px high. Center 540. Top edge 190. Button ~240? 
  // Let's adjust closer to previous Y=275, seems safer.
  const cursorKeyframes = [
    { frame: 125, x: 1800, y: 900 },
    { frame: 145, x: 1420, y: 300, click: true },
    { frame: 225, x: 1900, y: -50 },
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
            words="AI drafts. You refine."
            staggerFrames={8}
            highlightWord="AI"
            highlightColor="#0078FF"
            className="text-center max-w-[1200px]"
          />
        </AbsoluteFill>
      )}

      {/* Phase B: Safari - uses Sequence to reset internal frame counter */}
      <Sequence from={60} durationInFrames={durationInFrames - 60}>
        <SafariContent duration={durationInFrames - 60} />
      </Sequence>

      {/* Cursor */}
      <AbsoluteFill style={{ zIndex: 50, pointerEvents: "none" }}>
        <GhostCursor keyframes={cursorKeyframes} size={48} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
