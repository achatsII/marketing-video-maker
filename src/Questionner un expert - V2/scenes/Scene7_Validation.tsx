import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/components/remotion/BackgroundGradientAnimation";
import { AuroraText } from "@/components/remotion/AuroraText";
import { IPhoneFrame } from "@/components/remotion/iPhone";
import { SimplifiedValidationUI } from "../ui/SimplifiedValidationUI";

export const Scene7_Validation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade transitions
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase A: Title (frames 0-60)
  const showTitle = frame < 70;
  const titleOpacity = interpolate(frame, [50, 70], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase B: iPhone (frames 60-120)
  const showPhone = frame >= 50;
  const phoneScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Show validated state after some time
  const showValidated = frame > 100;

  // Validation items
  const validations = [
    {
      id: "1",
      question: "Quelle est la procédure de retour client pour les produits défectueux ?",
      answer: "Pour les produits défectueux, le client doit remplir le formulaire en ligne sous 14 jours. Un bon de retour est généré automatiquement...",
      lastUsed: "Il y a 2h",
      usageCount: 23,
    },
  ];

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut }}>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(10, 20, 35)"
        gradientBackgroundEnd="rgb(5, 12, 25)"
        firstColor="34, 197, 94"
        secondColor="0, 120, 255"
        thirdColor="16, 185, 129"
        fourthColor="0, 100, 200"
        fifthColor="52, 211, 153"
        size="85%"
        blendingValue="hard-light"
        containerClassName="absolute inset-0"
      >
        {/* Phase A: Title with Aurora effect */}
        {showTitle && (
          <AbsoluteFill
            className="flex flex-col items-center justify-center gap-2"
            style={{ opacity: titleOpacity }}
          >
            <div className="text-5xl font-bold text-white flex items-center gap-4">
              <span>Toujours</span>
              <AuroraText
                className="text-5xl font-bold"
                colors={["#0078FF", "#00D4FF", "#0078FF"]}
              >
                à jour
              </AuroraText>
              <span>.</span>
            </div>
            <div className="text-5xl font-bold text-white flex items-center gap-4 mt-2">
              <span>Toujours</span>
              <AuroraText
                className="text-5xl font-bold"
                colors={["#22c55e", "#10b981", "#22c55e"]}
              >
                fiable
              </AuroraText>
              <span>.</span>
            </div>
          </AbsoluteFill>
        )}

        {/* Phase B: iPhone with Validation UI */}
        {showPhone && (
          <AbsoluteFill className="flex items-center justify-center">
            <div
              style={{
                transform: `scale(${phoneScale * 0.85})`,
                opacity: phoneScale,
              }}
            >
              <IPhoneFrame width={380} darkMode>
                <SimplifiedValidationUI
                  validations={validations}
                  showValidated={showValidated}
                  startFrame={50}
                />
              </IPhoneFrame>
            </div>
          </AbsoluteFill>
        )}
      </BackgroundGradientAnimation>
    </AbsoluteFill>
  );
};
