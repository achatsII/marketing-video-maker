import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TextGenerateEffect } from "../../components/remotion/TextGenerateEffect";
import { Iphone } from "@/components/ui/iphone";
import { TapIndicator } from "../../components/remotion/GhostCursor";
import { MobileCaptureUI } from "../ui/MobileCaptureUI";

export const Scene7Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase A: Text (frames 0-30, shorter for this scene)
  const phaseA = frame < 30;
  const phaseAOpacity = phaseA
    ? interpolate(frame, [22, 30], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Phase B: iPhone
  const phaseBFrame = frame - 30;
  const iphoneProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const iphoneX = interpolate(iphoneProgress, [0, 1], [300, 0]);
  const iphoneOpacity = frame >= 30 ? iphoneProgress : 0;

  // Fade out
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Capture happens at phaseBFrame=40 (frame 70)
  const captureFrame = phaseBFrame >= 0 ? 40 : 9999;

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
            words="Capture in the field."
            staggerFrames={6}
            highlightWord="field"
            highlightColor="#0078FF"
            className="text-center max-w-[1200px]"
          />
        </div>
      )}

      {/* Phase B: iPhone */}
      {frame >= 30 && (
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
              <MobileCaptureUI captureFrame={captureFrame} />
            </Iphone>
            {/* Tap on capture button */}
            <TapIndicator x={170} y={475} tapFrame={captureFrame} />
          </div>
        </div>
      )}
    </div>
  );
};
