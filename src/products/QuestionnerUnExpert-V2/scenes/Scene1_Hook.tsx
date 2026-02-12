import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";

export const Scene1_Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in du background
  const bgOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out à la fin
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(15, 24, 35)"
        gradientBackgroundEnd="rgb(5, 10, 20)"
        firstColor="0, 80, 180"
        secondColor="0, 120, 255"
        thirdColor="50, 100, 200"
        fourthColor="20, 60, 140"
        fifthColor="0, 100, 220"
        size="100%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        <AbsoluteFill className="flex items-center justify-center">
          <div className="text-center px-20">
            <TextGenerateEffect
              words="Le savoir de votre entreprise se perd chaque jour."
              highlightWord="perd"
              highlightColor="#0078FF"
              staggerFrames={8}
              className="text-6xl font-bold"
            />
          </div>
        </AbsoluteFill>
      </BackgroundGradientAnimation>

    </AbsoluteFill>
  );
};
