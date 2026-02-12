import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { Iphone } from "@/_core/components/ui/iphone";
import { RespondUI } from "../ui/RespondUI";
import { TapIndicator } from "@/_core/components/remotion/GhostCursor";

export const Scene5Expert: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: text (frames 0-60)
  const phaseA = frame < 60;
  const phaseAOpacity = phaseA
    ? interpolate(frame, [50, 60], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  // Phase B: UI (frames 60-210)
  const phaseBFrame = frame - 60;
  const iphoneProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const iphoneX = interpolate(iphoneProgress, [0, 1], [300, 0]);
  const iphoneOpacity = frame >= 60 ? iphoneProgress : 0;

  // Fade out
  const fadeOut = interpolate(frame, [195, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div className="dark" style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeOut }}>
      {/* Phase A */}
      {phaseA && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: phaseAOpacity,
          }}
        >
          <TextGenerateEffect
            words="L'expert répond. Une seule fois."
            staggerFrames={10}
            highlightWord="fois"
            highlightColor="#0078FF"
            className="text-center"
          />
        </div>
      )}

      {/* Phase B */}
      {frame >= 60 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: iphoneOpacity,
            transform: `translateX(${iphoneX}px) perspective(1200px) rotateY(-5deg)`,
          }}
        >
          <div style={{ width: 340, position: "relative" }}>
            <Iphone>
              <RespondUI
                typingStartFrame={phaseBFrame > 0 ? 15 : 9999}
                submitFrame={phaseBFrame > 0 ? 105 : 9999}
                toastFrame={phaseBFrame > 0 ? 120 : 9999}
              />
            </Iphone>
            {/* Tap on submit button — after typing completes */}
            <TapIndicator x={170} y={630} tapFrame={105} />
          </div>
        </div>
      )}
    </div>
  );
};
