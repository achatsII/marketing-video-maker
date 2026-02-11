import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/components/remotion/TextGenerateEffect";

export const Scene2_Aggravation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade in
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Big number animation
  const numberScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const numberY = interpolate(numberScale, [0, 1], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(15, 24, 35)"
        gradientBackgroundEnd="rgb(10, 15, 25)"
        firstColor="80, 0, 120"
        secondColor="0, 80, 200"
        thirdColor="60, 20, 140"
        fourthColor="0, 60, 160"
        fifthColor="40, 0, 100"
        size="90%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        <AbsoluteFill className="flex flex-col items-center justify-center">
          {/* Big percentage */}
          <div
            className="text-[180px] font-black text-white mb-4"
            style={{
              opacity: numberScale,
              transform: `translateY(${numberY}px) scale(${0.8 + numberScale * 0.2})`,
              textShadow: "0 0 80px rgba(0, 120, 255, 0.5)",
            }}
          >
            54%
          </div>

          {/* Subtitle text */}
          <div className="text-center px-20">
            <TextGenerateEffect
              words="des connaissances critiques partent avec les départs."
              staggerFrames={6}
              className="text-3xl font-medium text-white/80"
            />
          </div>
        </AbsoluteFill>
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
