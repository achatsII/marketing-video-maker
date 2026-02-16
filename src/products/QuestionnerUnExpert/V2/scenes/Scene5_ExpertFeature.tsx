import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { SimplifiedNotificationUI } from "../ui/SimplifiedNotificationUI";

export const Scene5_ExpertFeature: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade transitions
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [430, 450], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase A: Title (frames 0-90)
  const showTitle = frame < 100;
  const titleOpacity = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: iPhone with Notifications (frames 90-240)
  const showPhone = frame >= 80;
  const phoneScale = spring({
    frame: frame - 80,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(12, 20, 35)"
        gradientBackgroundEnd="rgb(8, 15, 28)"
        firstColor="0, 180, 120"
        secondColor="0, 120, 255"
        thirdColor="0, 150, 180"
        fourthColor="0, 100, 150"
        fifthColor="0, 200, 160"
        size="85%"
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
                words="Pas de réponse ? L'expert est notifié."
                highlightWord="notifié"
                highlightColor="#0078FF"
                staggerFrames={10}
                className="text-5xl font-bold"
              />
            </div>
          </AbsoluteFill>
        )}

        {/* Phase B: iPhone with Notifications/Response */}
        {showPhone && (
          <AbsoluteFill className="flex items-center justify-center">
            <div
              style={{
                transform: `scale(${phoneScale * 0.85})`,
                opacity: phoneScale,
              }}
            >
              <IPhoneFrame width={380} darkMode>
                <SimplifiedNotificationUI
                  startFrame={90}
                />
              </IPhoneFrame>
            </div>
          </AbsoluteFill>
        )}
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
