import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeText } from "../components/FadeText";
import { IPhoneFrame } from "@/components/remotion/iPhone";
import { SimplifiedChatUI } from "@/Questionner un expert - V2/ui/SimplifiedChatUI";

export const SceneChatbotFeature: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase B: iPhone slides up from bottom
    const showPhone = frame >= 0;

    // Phone animation: slide up from bottom
    const phoneProgress = spring({
        frame: frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });

    // Translate from bottom (1000px) to center (0px)
    const phoneY = interpolate(phoneProgress, [0, 1], [1000, 0]);
    const phoneOpacity = interpolate(phoneProgress, [0, 1], [0, 1]);

    // Messages start after phone has fully arrived (around frame 60)
    // Spring animation completes around frame 60-70
    const messagesStartFrame = 0;

    // Text 1: Appears when first message is sent (frame 60), fades out before second question
    const text1Fade = interpolate(frame, [140, 160], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text1Blur = interpolate(frame, [140, 160], [0, 10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Text 2: Appears when bot responds (frame 110), persists until end
    const text2Fade = 1;
    const text2Blur = 0;

    const showText1 = frame >= 9999; //frame >= 5 && frame < 100;
    const showText2 = frame >= 50 && frame < 100;

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
            {/* Phase B: iPhone with Chat */}
            {showPhone && (
                <AbsoluteFill className="flex items-center justify-center">
                    {/* Text 1 - Left Side */}
                    {showText1 && (
                        <div
                            className="absolute left-[5%] top-[25%] w-[25%] z-20"
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

                    {/* iPhone */}
                    <div
                        className="z-10"
                        style={{
                            transform: `translateY(${phoneY}px) scale(1)`,
                            opacity: phoneOpacity,
                        }}
                    >
                        <IPhoneFrame width={500} darkMode>
                            <SimplifiedChatUI
                                startFrame={messagesStartFrame}
                            />
                        </IPhoneFrame>
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
