import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { Safari } from "@/_core/components/ui/safari";
import { ChatbotUI } from "../ui/ChatbotUI";
import { GhostCursor } from "@/_core/components/remotion/GhostCursor";

export const Scene4Chatbot: React.FC = () => {
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
  const safariProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const safariY = interpolate(safariProgress, [0, 1], [200, 0]);
  const safariOpacity = frame >= 60 ? safariProgress : 0;

  // Scale drift
  const scale = frame >= 60
    ? interpolate(frame, [60, 210], [1, 1.02], { extrapolateRight: "clamp" })
    : 1;

  // Focus Logic (Zoom on input when typing)
  // Smoother 15-frame transitions
  const focusScale = interpolate(
    frame,
    [60, 75, 100, 115, 115, 130, 165, 180],
    [1, 2.2, 2.2, 1, 1, 2.2, 2.2, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
  );

  const focusY = interpolate(
    frame,
    [60, 75, 100, 115, 115, 130, 165, 180],
    [0, -270, -270, 0, 0, -270, -270, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
  );

  // Fade out
  const fadeOut = interpolate(frame, [195, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ghost cursor keyframes (relative to scene start, cursor is positioned on the Safari container)
  // Send button is bottom-right of Safari content: approx x=855, y=555
  const cursorKeyframes = [
    // Enter from bottom-right
    { frame: 65, x: 1000, y: 700 },
    // Arrive at input area
    { frame: 85, x: 400, y: 540 },
    // Wait while Q1 is being typed, then move to send button
    { frame: 100, x: 400, y: 540 },
    { frame: 118, x: 855, y: 555, click: true },
    // Wait for response, then go back to input for Q2
    { frame: 130, x: 855, y: 555 },
    { frame: 148, x: 400, y: 540 },
    // Wait while Q2 is being typed, then move to send button
    { frame: 163, x: 400, y: 540 },
    { frame: 178, x: 855, y: 555, click: true },
    // Exit off-screen top-left
    { frame: 195, x: -100, y: -50 },
  ];

  return (
    <div className="dark" style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(5, 10, 30)"
        gradientBackgroundEnd="rgb(10, 5, 40)"
        firstColor="0, 120, 255"
        secondColor="120, 40, 200"
        thirdColor="0, 180, 255"
        fourthColor="60, 0, 180"
        fifthColor="0, 100, 200"
        containerClassName="h-full w-full"
      >
        {/* Phase A: Text */}
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
              words="Posez. Obtenez."
              staggerFrames={12}
              highlightWord="obtenez"
              highlightColor="#0078FF"
              className="text-center"
            />
          </div>
        )}

        {/* Phase B: Safari + Chatbot */}
        {frame >= 60 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
              opacity: safariOpacity,
              transform: `translateY(${safariY}px) perspective(1200px) rotateX(3deg)`,
            }}
          >
            <div
              style={{
                width: 900,
                height: 563,
                position: "relative",
                transform: `scale(${scale * focusScale}) translateY(${focusY}px)`,
                transformOrigin: "center center",
              }}
            >
              <Safari url="questionner-un-expert.app" mode="default">
                <ChatbotUI
                  q1TypingStart={phaseBFrame > 0 ? 15 : 9999}
                  q1SendClick={phaseBFrame > 0 ? 40 : 9999}
                  q1ResponseFrame={phaseBFrame > 0 ? 48 : 9999}
                  q2TypingStart={phaseBFrame > 0 ? 70 : 9999}
                  q2SendClick={phaseBFrame > 0 ? 105 : 9999}
                  q2ResponseFrame={phaseBFrame > 0 ? 113 : 9999}
                />
              </Safari>
              <GhostCursor keyframes={cursorKeyframes} size={48} />
            </div>
          </div>
        )}
      </BackgroundGradientAnimation>
    </div>
  );
};
