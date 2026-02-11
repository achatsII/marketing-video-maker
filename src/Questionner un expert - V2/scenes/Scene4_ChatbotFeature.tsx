import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/components/remotion/TextGenerateEffect";
import { IPhoneFrame } from "@/components/remotion/iPhone";
import { SimplifiedChatUI } from "../ui/SimplifiedChatUI";

export const Scene4_ChatbotFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade transitions
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [580, 600], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase A: Title (frames 0-90)
  const showTitle = frame < 100;
  const titleOpacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: iPhone (frames 90-240)
  const showPhone = frame >= 80;
  const phoneScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Messages timing
  const messagesStartFrame = 100;

  // Messages to show based on timing
  // Unused logic removed here (fullText, typing etc handled in UI)

  // Messages to show based on timing


  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(10, 18, 30)"
        gradientBackgroundEnd="rgb(5, 12, 25)"
        firstColor="0, 100, 220"
        secondColor="0, 150, 255"
        thirdColor="30, 80, 180"
        fourthColor="0, 80, 160"
        fifthColor="50, 120, 200"
        size="80%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        {/* Phase A: Title */}
        {showTitle && (
          <AbsoluteFill
            className="flex items-center justify-center"
            style={{ opacity: titleOpacity }}
          >
            <div className="text-center px-20">
              <TextGenerateEffect
                words="Posez. Obtenez. Instantanément."
                highlightWord="Instantanément"
                highlightColor="#0078FF"
                staggerFrames={12}
                className="text-6xl font-bold"
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Phase B: iPhone with Chat */}
        {showPhone && (
          <AbsoluteFill className="flex items-center justify-center">
            <div
              style={{
                transform: `scale(${phoneScale * 0.85})`,
                opacity: phoneScale,
              }}
            >
              <IPhoneFrame width={380} darkMode>
                <SimplifiedChatUI
                  startFrame={messagesStartFrame}
                />
              </IPhoneFrame>
            </div>
          </AbsoluteFill>
        )}
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
