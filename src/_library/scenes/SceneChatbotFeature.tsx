import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeText } from "@/_core/components/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { SimplifiedChatUI } from "@/products/QuestionnerUnExpert-V2/ui/SimplifiedChatUI";

export const SceneChatbotFeature: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase B: iPhone slides up from bottom
    const showPhone = frame >= 0;

    // Phone animation: zoom in from far away with gentle tilt
    const phoneProgress = spring({
        frame: frame,
        fps,
        config: { damping: 18, stiffness: 60, mass: 1.2 },
    });

    // Scale up slightly as it arrives
    const phoneScale = interpolate(phoneProgress, [0, 1], [0.8, 1]);
    const phoneOpacity = interpolate(phoneProgress, [0, 0.3], [0, 1], {
        extrapolateRight: "clamp",
    });

    // Gentle tilt that settles to face-forward
    const phoneRotateX = interpolate(phoneProgress, [0, 1], [25, 0]);
    // Slide up from bottom
    const phoneY = interpolate(phoneProgress, [0, 1], [800, 0]);

    // Messages start after phone has fully arrived
    const messagesStartFrame = 0;

    // Text 1: Appears when first message is sent, fades out before second question
    const text1Fade = interpolate(frame, [140, 160], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text1Blur = interpolate(frame, [140, 160], [0, 10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Text 2: Appears when bot responds, persists until end
    const text2Fade = 1;
    const text2Blur = 0;

    const showText1 = frame >= 9999; //frame >= 5 && frame < 100;
    const showText2 = frame >= 50 && frame < 100;

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
            {/* Phase B: iPhone with Chat */}
            {showPhone && (
                <AbsoluteFill className="flex items-center justify-center">
                    {/* Text 1 - right Side */}
                    {showText1 && (
                        <div
                            className="absolute right-[5%] top-[25%] w-[25%] z-20"
                            style={{
                                opacity: text1Fade,
                                filter: `blur(${text1Blur}px)`
                            }}
                        >
                            <FadeText
                                text="Poser n'importe quelle question"
                                className="text-5xl font-bold text-white leading-tight text-left"
                                delay={150}
                                startFrame={5}
                            />
                        </div>
                    )}

                    {/* iPhone with zoom-in entrance */}
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
                                <SimplifiedChatUI
                                    startFrame={messagesStartFrame}
                                />
                            </IPhoneFrame>
                        </div>
                    </div>

                    {/* Text 2 - Right Side */}
                    {showText2 && (
                        <div
                            className="absolute left-[5%] top-[25%] w-[25%] z-20"
                            style={{
                                opacity: text2Fade,
                                filter: `blur(${text2Blur}px)`
                            }}
                        >
                            <FadeText
                                text="Obtenez une réponse instantané"
                                className="text-7xl font-bold text-white leading-tight text-right"
                                delay={150}
                                startFrame={50}
                                auroraWords={["instantané"]}
                            />
                        </div>
                    )}
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
