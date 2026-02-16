import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeText } from "@/_core/components/remotion/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { NotificationUI } from "../ui/NotificationUI";
import fondEcranIPhone from "@/products/QuestionnerUnExpert/V2/fondEcranIPhone.jpg"; // Reuse wallpaper

export const Scene5Compliance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showPhone = frame >= 0;
  const EXIT_START = 260; // Start exit

  const phoneProgress = spring({
    frame: frame,
    fps,
    config: { damping: 18, stiffness: 60, mass: 1.2 },
  });

  const phoneExitProgress = spring({
    frame: frame - EXIT_START,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const phoneScale = interpolate(phoneProgress, [0, 1], [0.8, 1]);
  const phoneOpacity = interpolate(phoneProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  const phoneEntranceY = interpolate(phoneProgress, [0, 1], [800, 0]);
  const phoneExitY = interpolate(phoneExitProgress, [0, 1], [0, -2000]);
  const phoneY = phoneEntranceY + phoneExitY;
  const phoneRotateX = interpolate(phoneProgress, [0, 1], [25, 0]);

  // Internal Timing
  const NOTIFICATION_DELAY = 10;
  const UNLOCK_START_FRAME = 60;

  const unlockProgress = spring({
    frame: frame - UNLOCK_START_FRAME,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const lockScreenY = interpolate(unlockProgress, [0, 1], [0, -100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lockScreenOpacity = interpolate(unlockProgress, [0.8, 1], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Texts
  const showText1 = frame >= NOTIFICATION_DELAY && frame < UNLOCK_START_FRAME + 10;
  const text1Opacity = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 20, UNLOCK_START_FRAME, UNLOCK_START_FRAME + 10], [0, 1, 1, 0]);

  const showText2 = frame >= 120 && frame < 195;
  const text2Opacity = interpolate(frame, [120, 140, 185, 195], [0, 1, 1, 0]);

  const showText3 = frame >= 195;
  const text3Opacity = interpolate(frame, [195, 215, EXIT_START - 10, EXIT_START + 10], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      {showPhone && (
        <AbsoluteFill className="flex items-center justify-center">

          {/* Text 1 */}
          {showText1 && (
            <div
              className="absolute left-[5%] top-[25%] w-[30%] z-20"
              style={{ opacity: text1Opacity }}
            >
              <FadeText
                text="L'IA analyse vos procédures"
                className="text-7xl font-bold text-white leading-tight text-left"
                delay={200}
                startFrame={NOTIFICATION_DELAY}
                auroraWords={["analyse"]}
              />
            </div>
          )}

          {/* iPhone */}
          <div
            className="z-10"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              style={{
                transform: `translateY(${phoneY}px) rotateX(${phoneRotateX}deg) scale(${phoneScale})`,
                opacity: phoneOpacity,
                transformOrigin: 'center center',
              }}
            >
              <IPhoneFrame width={500} darkMode>
                <AbsoluteFill className="bg-black overflow-hidden rounded-[40px]">

                  {/* App UI */}
                  <NotificationUI startFrame={UNLOCK_START_FRAME} />

                  {/* Lock Screen */}
                  <AbsoluteFill
                    style={{
                      transform: `translateY(${lockScreenY}%)`,
                      opacity: lockScreenOpacity,
                      zIndex: 20,
                    }}
                  >
                    <div className="absolute inset-0">
                      <Img src={fondEcranIPhone} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="absolute top-20 w-full text-center">
                      <div className="text-8xl font-thin text-white tracking-tight drop-shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>09:41</div>
                      <div className="text-lg text-white/80 mt-1 font-medium">Mercredi</div>
                    </div>

                    {/* Notification on Lock Screen */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] dark">
                      <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-red-500/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center text-white">
                            !
                          </div>
                          <div>
                            <div className="font-bold text-white">Alerte Sécurité</div>
                            <div className="text-white/80 text-sm">Non-Conformité Détectée (CSA Z460)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AbsoluteFill>

                </AbsoluteFill>
              </IPhoneFrame>
            </div>
          </div>

          {/* Text 2 */}
          {showText2 && (
            <div
              className="absolute right-[5%] top-[25%] w-[30%] z-20"
              style={{ opacity: text2Opacity }}
            >
              <FadeText
                text="Et bloque les risques"
                className="text-7xl font-bold text-white leading-tight text-right"
                delay={200}
                startFrame={120}
                auroraWords={["bloque"]}
              />
            </div>
          )}

          {/* Text 3 */}
          {showText3 && (
            <div
              className="absolute right-[5%] top-[25%] w-[30%] z-20"
              style={{ opacity: text3Opacity }}
            >
              <FadeText
                text="Avant l'accident"
                className="text-7xl font-bold text-white leading-tight text-right"
                delay={200}
                startFrame={195}
                auroraWords={["accident"]}
              />
            </div>
          )}

        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

