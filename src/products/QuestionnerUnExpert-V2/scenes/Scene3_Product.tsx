import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { SparklesText } from "@/_core/components/remotion/SparklesText";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { NeonGradientCard } from "@/_core/components/remotion/NeonGradientCard";

export const Scene3_Product: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product name animation
  const nameScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Slogan appears after product name
  const sloganOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(10, 20, 40)"
        gradientBackgroundEnd="rgb(5, 15, 30)"
        firstColor="0, 120, 255"
        secondColor="0, 200, 255"
        thirdColor="50, 150, 255"
        fourthColor="0, 100, 200"
        fifthColor="100, 180, 255"
        size="100%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        <AbsoluteFill className="flex flex-col items-center justify-center">
          {/* Product name with sparkles */}
          <div
            style={{
              transform: `scale(${nameScale})`,
              opacity: nameScale,
            }}
          >
            <SparklesText
              sparklesCount={15}
              className="text-8xl font-black"
              colors={{ first: "#0078FF", second: "#00D4FF" }}
            >
              ExpertFlow
            </SparklesText>
          </div>

          {/* Slogan */}
          <div
            className="mt-8"
            style={{ opacity: sloganOpacity }}
          >
            <TextGenerateEffect
              words="L'intelligence collective, activée."
              highlightWord="activée"
              highlightColor="#0078FF"
              staggerFrames={10}
              className="text-3xl font-medium"
            />
          </div>


        </AbsoluteFill>
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
