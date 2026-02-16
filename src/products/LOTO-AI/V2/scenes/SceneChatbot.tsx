import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeText } from "@/_core/components/remotion/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { ChatUI, CHAT_TIMINGS } from "@/products/LOTO-AI/V2/ui/ChatUI";

export const SceneChatbot: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const t = CHAT_TIMINGS;

    // Spring-based scroll logic
    const springConfig = { damping: 22, stiffness: 80, mass: 0.8 };

    const steps = [
        { triggerFrame: 0, targetY: 1800 },
        { triggerFrame: 0, targetY: 900 },
        { triggerFrame: t.bot1Msg, targetY: 0 },   // Scroll up for bot msg 1
        { triggerFrame: t.user2Typing, targetY: -200 },
        { triggerFrame: t.user2Msg, targetY: -200 },
        { triggerFrame: t.bot2Typing, targetY: -400 },
        { triggerFrame: t.bot2Msg, targetY: -600 },
    ];

    let phoneY = steps[0].targetY;
    for (let i = 1; i < steps.length; i++) {
        const stepFrame = frame - steps[i].triggerFrame;
        if (stepFrame >= 0) {
            const progress = spring({
                frame: stepFrame,
                fps,
                config: springConfig,
            });
            const prevY = steps[i - 1].targetY;
            const nextY = steps[i].targetY;
            phoneY += (nextY - prevY) * progress;
        }
    }

    if (frame >= t.exitStart) {
        const exitProgress = spring({
            frame: frame - t.exitStart,
            fps,
            config: { damping: 15, stiffness: 120, mass: 0.6 },
        });
        phoneY = interpolate(exitProgress, [0, 1], [-600, -2000]);
    }

    const rotateX = 20;

    const opacity = interpolate(frame, [0, 10, t.exitStart, t.exitStart + 25], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const showText = frame >= 0 && frame < 140;
    const textOpacity = interpolate(
        frame,
        [0, 15, 140 - 15, 140],
        [0, 1, 1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            {/* Text above phone */}
            {showText && (
                <div
                    className="absolute top-[20%] left-0 right-0 z-0 flex justify-center"
                    style={{ opacity: textOpacity }}
                >
                    <FadeText
                        text="Collecte terrain simplifiée"
                        className="text-7xl font-bold text-white leading-tight text-center"
                        delay={150}
                        startFrame={0}
                        maxWordsPerLine={3}
                        auroraWords={["simplifiée"]}
                    />
                </div>
            )}

            {/* Phone with perspective */}
            <AbsoluteFill className="flex items-center justify-center">
                <div
                    style={{
                        perspective: "800px",
                        perspectiveOrigin: "center 40%",
                    }}
                >
                    <div
                        style={{
                            transform: `translateY(${phoneY}px) rotateX(${rotateX}deg)`,
                            opacity,
                            transformOrigin: "center bottom",
                        }}
                    >
                        <IPhoneFrame width={900} darkMode>
                            <div
                                style={{
                                    width: 390,
                                    height: 844,
                                    transform: `scale(${900 / 433})`, // Scale content to fit frame
                                    transformOrigin: "top left",
                                    backgroundColor: "#0f1823",
                                }}
                            >
                                <ChatUI startFrame={0} />
                            </div>
                        </IPhoneFrame>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

