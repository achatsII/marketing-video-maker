import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { SparklesText } from "@/components/remotion/SparklesText";
import { TextGenerateEffect } from "@/components/remotion/TextGenerateEffect";

export const Scene8_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black at the end
  const fadeOut = interpolate(frame, [75, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product name animation
  const nameScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Slogan appears after
  const sloganOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(8, 15, 28)"
        gradientBackgroundEnd="rgb(3, 8, 18)"
        firstColor="0, 120, 255"
        secondColor="0, 200, 255"
        thirdColor="100, 150, 255"
        fourthColor="0, 80, 200"
        fifthColor="50, 100, 220"
        size="100%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        <AbsoluteFill
          className="flex flex-col items-center justify-center"
          style={{ opacity: fadeOut }}
        >
          {/* Product name with sparkles */}
          <div
            style={{
              transform: `scale(${nameScale})`,
              opacity: nameScale,
            }}
          >
            <SparklesText
              sparklesCount={20}
              className="text-9xl font-black"
              colors={{ first: "#0078FF", second: "#00D4FF" }}
            >
              ExpertFlow
            </SparklesText>
          </div>

          {/* Final slogan */}
          <div
            className="mt-10"
            style={{ opacity: sloganOpacity }}
          >
            <TextGenerateEffect
              words="Chaque question trouve son expert."
              staggerFrames={8}
              className="text-3xl font-medium text-white/90"
            />
          </div>

          {/* Subtle glow effect */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 120, 255, 0.15) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: nameScale,
            }}
          />
        </AbsoluteFill>
      </BackgroundGradientAnimation>

      {/* Final black overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "black",
          opacity: interpolate(frame, [75, 90], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
