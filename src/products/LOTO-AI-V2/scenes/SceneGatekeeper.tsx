import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeText } from "@/_core/components/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { NotificationUI } from "@/products/LOTO-AI-V2/ui/NotificationUI";
import fondEcranIPhone from "@/products/QuestionnerUnExpert-V2/fondEcranIPhone.jpg"; // Reuse existing wallpaper

export const SceneGatekeeper: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const showPhone = frame >= 0;
    const EXIT_START = 220;

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
    const phoneOpacity = interpolate(phoneProgress, [0, 0.3], [0, 1], {
        extrapolateRight: "clamp",
    });

    const phoneEntranceY = interpolate(phoneProgress, [0, 1], [800, 0]);
    const phoneExitY = interpolate(phoneExitProgress, [0, 1], [0, -2000]);
    const phoneY = phoneEntranceY + phoneExitY;

    const phoneRotateX = interpolate(phoneProgress, [0, 1], [25, 0]);

    // Text Timing
    const NOTIFICATION_DELAY = 10;
    const UNLOCK_START_FRAME = 60;

    // Text 1: "Gatekeeper Normatif"
    const showText1 = frame >= NOTIFICATION_DELAY && frame < UNLOCK_START_FRAME + 20;
    const text1Fade = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 20], [0, 1]);
    const text1FadeOut = interpolate(frame, [UNLOCK_START_FRAME, UNLOCK_START_FRAME + 20], [1, 0]);

    // Text 2: "Conformité Assurée"
    const TEXT_2_START = UNLOCK_START_FRAME + 30;
    const showText2 = frame >= TEXT_2_START;
    const text2Fade = interpolate(frame, [TEXT_2_START, TEXT_2_START + 20], [0, 1]);
    const text2FadeOut = interpolate(frame, [EXIT_START - 20, EXIT_START], [1, 0]);

    // Positions
    const leftPos = "left-[5%]";
    const rightPos = "right-[5%]";
    const topPos = "top-[25%]";

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
            {showPhone && (
                <AbsoluteFill className="flex items-center justify-center">

                    {/* Text 1 */}
                    {showText1 && (
                        <div
                            className={`absolute ${leftPos} ${topPos} w-[25%] z-20`}
                            style={{ opacity: text1Fade * text1FadeOut }}
                        >
                            <FadeText
                                text="Gatekeeper Normatif"
                                className="text-7xl font-bold text-white leading-tight text-left"
                                delay={200}
                                startFrame={NOTIFICATION_DELAY}
                                auroraWords={["Normatif"]}
                            />
                            <p className="text-xl text-white/70 mt-4 font-medium">Analyse CSA Z460 en temps réel</p>
                        </div>
                    )}

                    {/* Text 2 */}
                    {showText2 && (
                        <div
                            className={`absolute ${rightPos} ${topPos} w-[25%] z-20`}
                            style={{ opacity: text2Fade * text2FadeOut }}
                        >
                            <FadeText
                                text="Conformité Assurée"
                                className="text-7xl font-bold text-white leading-tight text-right"
                                delay={200}
                                startFrame={TEXT_2_START}
                                auroraWords={["Assurée"]}
                            />
                            <p className="text-xl text-white/70 mt-4 font-medium text-right">Correction assistée par IA</p>
                        </div>
                    )}

                    {/* iPhone */}
                    <div
                        className="z-10"
                        style={{ perspective: '1000px' }}
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
                                    <NotificationUI startFrame={UNLOCK_START_FRAME} />
                                </AbsoluteFill>
                            </IPhoneFrame>
                        </div>
                    </div>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
