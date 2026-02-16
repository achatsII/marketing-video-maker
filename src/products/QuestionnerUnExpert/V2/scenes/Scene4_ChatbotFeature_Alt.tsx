import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { SimplifiedChatUI } from "../ui/SimplifiedChatUI";

export const Scene4_ChatbotFeature_Alt: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phase B: iPhone (frames 90-240)
    const showPhone = frame;
    const phoneScale = spring({
        frame: frame,
        fps,
        config: { damping: 20, stiffness: 100 },
    });

    // Adjust phone position (move slightly to center-right or center-left to make room for text?)
    // User asked for text on LEFT then on RIGHT. 
    // Maybe just center the phone but ensure text doesn't overlap?
    // Or shift phone slightly?
    // The prompt says "gros texte a coté du téléphone".
    // Let's keep phone centered or slightly shift is better? 
    // Let's try centered first, and position text absolutely on Left and Right sides.

    // Messages timing from SimplifiedChatUI:
    // typing1: 10 (relative to startFrame)
    // msg1: 80
    // msg2: 130 (bot response)
    const messagesStartFrame = 100;

    // Text 1: Fade out calculation
    const text1Fade = interpolate(frame, [180, 200], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text1Blur = interpolate(frame, [180, 200], [0, 10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Text 2: Persist until near end of scene for smooth transition
    const text2Fade = 1;
    const text2Blur = 0;

    const showText1 = frame >= 110 && frame < 200;
    const showText2 = frame >= 230;

    return (
        <AbsoluteFill>
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

                {/* Phase B: iPhone with Chat */}
                {showPhone && (
                    <AbsoluteFill className="flex items-center justify-center">
                        {/* Text 1 - Left Side */}
                        {showText1 && (
                            <div
                                className="absolute left-[10%] top-[25%] w-[30%] z-20"
                                style={{
                                    opacity: text1Fade,
                                    filter: `blur(${text1Blur}px)`
                                }}
                            >
                                <TextGenerateEffect
                                    words="Poser n'importe quelle question"
                                    className="text-5xl font-bold text-white leading-tight text-left"
                                    staggerFrames={5}
                                    startFrame={110}
                                />
                            </div>
                        )}

                        {/* iPhone */}
                        <div
                            className="z-10"
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

                        {/* Text 2 - Right Side */}
                        {showText2 && (
                            <div
                                className="absolute right-[10%] w-[30%] z-20"
                                style={{
                                    opacity: text2Fade,
                                    filter: `blur(${text2Blur}px)`
                                }}
                            >
                                <TextGenerateEffect
                                    words="Obtenez une réponse instantané"
                                    className="text-5xl font-bold text-white leading-tight text-right"
                                    staggerFrames={5}
                                    highlightWord="instantané"
                                    highlightColor="#0078FF"
                                    startFrame={230}
                                />
                            </div>
                        )}
                    </AbsoluteFill>
                )}
            </BackgroundGradientAnimation>
        </AbsoluteFill>
    );
};
