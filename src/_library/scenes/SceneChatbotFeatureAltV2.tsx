import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FadeText } from "@/_core/components/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { AltChatUI, ALT_CHAT_TIMINGS } from "@/products/QuestionnerUnExpert-V2/ui/AltChatUI";

/**
 * V2 — Spring-based scroll
 * Each message triggers a spring animation that moves the phone up.
 * Slightly bouncy, organic feel.
 */
export const SceneChatbotFeatureAltV2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const t = ALT_CHAT_TIMINGS;

    // ─── Spring-based scroll: each message triggers a spring step ───
    const springConfig = { damping: 22, stiffness: 80, mass: 0.8 };

    // const steps = [
    //     { triggerFrame: 0, targetY: 1800 },          // Start: completely off-screen
    //     { triggerFrame: 0, targetY: 1350 },          // Entrance: reveal Header + User 1 Typing
    //     { triggerFrame: t.user1Msg, targetY: 1350 }, // User 1 message
    //     { triggerFrame: t.bot1Typing, targetY: 1200 }, // Bot 1 typing
    //     { triggerFrame: t.bot1Msg, targetY: 900 },   // Bot 1 message (large)
    //     { triggerFrame: t.user2Typing, targetY: 750 }, // User 2 typing
    //     { triggerFrame: t.user2Msg, targetY: 750 },  // User 2 message
    //     { triggerFrame: t.bot2Typing, targetY: 600 }, // Bot 2 typing
    //     { triggerFrame: t.bot2Msg, targetY: 450 },   // Bot 2 message (escalation)
    // ];
    const steps = [
        { triggerFrame: 0, targetY: 1800 },          // Start: completely off-screen
        { triggerFrame: 0, targetY: 900 },          // Entrance: reveal Header + User 1 Typing
        //{ triggerFrame: t.user1Msg, targetY: 1350 }, // User 1 message
        // { triggerFrame: t.bot1Typing, targetY: 1200 }, // Bot 1 typing
        { triggerFrame: t.bot1Msg, targetY: 900 },   // Bot 1 message (large)
        { triggerFrame: t.user2Typing, targetY: 750 }, // User 2 typing
        { triggerFrame: t.user2Msg, targetY: 750 },  // User 2 message
        { triggerFrame: t.bot2Typing, targetY: 600 }, // Bot 2 typing
        { triggerFrame: t.bot2Msg, targetY: 450 },   // Bot 2 message (escalation)
    ];

    // Calculate current Y by accumulating spring-animated deltas
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

    // Exit animation: accelerate off screen after last message
    if (frame >= t.exitStart) {
        const exitProgress = spring({
            frame: frame - t.exitStart,
            fps,
            config: { damping: 15, stiffness: 120, mass: 0.6 },
        });
        phoneY = interpolate(exitProgress, [0, 1], [600, -1500]);
    }

    // ─── Perspective: fixed tilt throughout ───
    const rotateX = 20;

    // ─── Opacity ───
    const opacity = interpolate(frame, [0, 10, t.exitStart, t.exitStart + 25], [0, 1, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // ─── Text above phone ───
    //const showText = frame >= t.bot1Msg && frame < t.exitStart;
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
                    className="absolute top-[25%] left-0 right-0 z-0 flex justify-center"
                    style={{ opacity: textOpacity }}
                >
                    <FadeText
                        text="Obtenez une réponse instantanée"
                        className="text-7xl font-bold text-white leading-tight text-center"
                        delay={150}
                        startFrame={0}
                        maxWordsPerLine={3}
                        auroraWords={["instantanée"]}
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
                                    transform: `scale(${900 / 433})`,
                                    transformOrigin: "top left",
                                    backgroundColor: "#0f1823",
                                }}
                            >
                                <AltChatUI startFrame={0} />
                            </div>
                        </IPhoneFrame>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
