import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { WordRotate } from "@/_core/components/remotion/WordRotate";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Phase 1: WordRotate cycles pain points (frames 0-75)
  const phase1 = frame < 75;
  const phase1Opacity = phase1
    ? interpolate(frame, [65, 75], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  // Phase 2: Closing statement (frames 75-120)
  const phase2Opacity = !phase1
    ? interpolate(frame, [75, 80, durationInFrames - 15, durationInFrames], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  // Scale drift
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden" }}>
      <div style={{ transform: `scale(${scale})`, width: "100%", height: "100%" }}>
        {/* Phase 1: Pain points */}
        {phase1 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              opacity: phase1Opacity,
            }}
          >
            <WordRotate
              words={["Fardeau Admin.", "Risque Amende", "Pertes de temps"]}
              framesPerWord={25}
              className="text-white text-7xl font-black tracking-tight"
            />
          </div>
        )}

        {/* Phase 2: Conclusion */}
        {!phase1 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              opacity: phase2Opacity,
            }}
          >
            <TextGenerateEffect
              words="Enquêtez. Générez. Sécurisez."
              staggerFrames={8}
              highlightWord="Sécurisez"
              highlightColor="#D32F2F"
              className="text-center max-w-[1200px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
