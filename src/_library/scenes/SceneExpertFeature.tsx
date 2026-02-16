import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeText } from "@/_core/components/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { LargeNotificationUI } from "@/products/QuestionnerUnExpert-V2/ui/LargeNotificationUI";
import { AnimatedList } from "@/_core/components/remotion/AnimatedList";
import { LargeNotificationItem } from "@/products/QuestionnerUnExpert-V2/ui/LargeNotificationItem";

// Use relative path to ensure resolution, and import properly.
import fondEcranIPhone from "../../products/QuestionnerUnExpert-V2/fondEcranIPhone.jpg";


export const SceneExpertFeature: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Phone Animation (from SceneChatbotFeature) ---
    const showPhone = frame >= 0;

    const EXIT_START = 260; // Start exit animation to finish by frame 300

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

    // Entrance: 800 -> 0. Exit: 0 -> -1000 (slide up)
    const phoneEntranceY = interpolate(phoneProgress, [0, 1], [800, 0]);
    const phoneExitY = interpolate(phoneExitProgress, [0, 1], [0, -2000]);
    const phoneY = phoneEntranceY + phoneExitY;

    const phoneRotateX = interpolate(phoneProgress, [0, 1], [25, 0]);


    // --- Inner Phone Content Logic (from Scene5_ExpertFeature_Alt) ---
    const NOTIFICATION_DELAY = 10; // Adjusted for earlier start since phone arrives quickly
    const UNLOCK_START_FRAME = 60;

    // Lock Screen "Sweep Up" Animation
    const unlockProgress = spring({
        frame: frame - UNLOCK_START_FRAME,
        fps,
        config: { damping: 20, stiffness: 80 },
    });

    const lockScreenY = interpolate(unlockProgress, [0, 1], [0, -100], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const lockScreenOpacity = interpolate(unlockProgress, [0.8, 1], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });


    // --- Text Logic (Style from SceneChatbotFeature, Content from Scene5) ---

    // Text 1: "Un expert est notifié"
    // Appears with notification
    const showText1 = frame >= NOTIFICATION_DELAY && frame < UNLOCK_START_FRAME + 10;
    const text1Fade = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 20], [0, 1], { extrapolateRight: "clamp" });
    const text1Blur = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 20], [10, 0], { extrapolateRight: "clamp" });

    const text1FadeOut = interpolate(frame, [UNLOCK_START_FRAME, UNLOCK_START_FRAME + 10], [1, 0], { extrapolateRight: "clamp" });
    const text1BlurOut = interpolate(frame, [UNLOCK_START_FRAME, UNLOCK_START_FRAME + 10], [0, 10], { extrapolateRight: "clamp" });

    const text1OpacityCombined = text1Fade * text1FadeOut;
    const text1BlurCombined = frame > UNLOCK_START_FRAME ? text1BlurOut : text1Blur;

    // Typing Timing Calculation
    // In LargeNotificationUI:
    // TYPING_START_FRAME (local) = 60
    // Global Typing Start = UNLOCK_START_FRAME + 60 = 60 + 60 = 120
    // Text Length approx 75 chars -> 75 frames duration
    // Global Typing End = 120 + 75 = 195
    const TYPING_GLOBAL_START = UNLOCK_START_FRAME + 60;
    const TYPING_GLOBAL_END = TYPING_GLOBAL_START + 75;

    // Text 2: "Et répond à votre question"
    // Appears when typing starts (120)
    // Disappears when typing ends (195)
    const TEXT_2_START = TYPING_GLOBAL_START;
    const TEXT_2_END = TYPING_GLOBAL_END;

    const showText2 = frame >= TEXT_2_START && frame < TEXT_2_END + 10;
    const text2Fade = interpolate(frame, [TEXT_2_START, TEXT_2_START + 20], [0, 1], { extrapolateRight: "clamp" });
    const text2Blur = interpolate(frame, [TEXT_2_START, TEXT_2_START + 20], [10, 0], { extrapolateRight: "clamp" });

    const text2FadeOut = interpolate(frame, [TEXT_2_END, TEXT_2_END + 10], [1, 0], { extrapolateRight: "clamp" });
    const text2BlurOut = interpolate(frame, [TEXT_2_END, TEXT_2_END + 10], [0, 10], { extrapolateRight: "clamp" });

    const text2OpacityCombined = text2Fade * text2FadeOut;
    const text2BlurCombined = frame > TEXT_2_END ? text2BlurOut : text2Blur;


    // Text 3: "Ce qui enrichira votre base de connaissances"
    // Appears at end of typing (195)
    // Disappears later with blur at EXIT_START
    const TEXT_3_START = TYPING_GLOBAL_END;
    const TEXT_3_END = EXIT_START - 10; // Fade out when phone starts leaving

    const showText3 = frame >= TEXT_3_START;
    const text3Fade = interpolate(frame, [TEXT_3_START, TEXT_3_START + 20], [0, 1], { extrapolateRight: "clamp" });
    const text3Blur = interpolate(frame, [TEXT_3_START, TEXT_3_START + 20], [10, 0], { extrapolateRight: "clamp" });

    const text3FadeOut = interpolate(frame, [TEXT_3_END, TEXT_3_END + 20], [1, 0], { extrapolateRight: "clamp" });
    const text3BlurOut = interpolate(frame, [TEXT_3_END, TEXT_3_END + 20], [0, 10], { extrapolateRight: "clamp" });

    const text3OpacityCombined = text3Fade * text3FadeOut;
    const text3BlurCombined = frame > TEXT_3_END ? text3BlurOut : text3Blur;


    // --- Layout Fixed to Variant 1 (Left - Right - Right) ---

    // Positions
    const leftPos = "left-[5%]";
    const rightPos = "right-[5%]";
    const topPos = "top-[25%]";

    const t1Pos = leftPos;
    const t1Align = "text-left";

    const t2Pos = rightPos;
    const t2Align = "text-right";

    const t3Pos = rightPos;
    const t3Align = "text-right";

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
            {showPhone && (
                <AbsoluteFill className="flex items-center justify-center">

                    {/* Text 1 */}
                    {showText1 && (
                        <div
                            className={`absolute ${t1Pos} ${topPos} w-[25%] z-20`}
                            style={{
                                opacity: text1OpacityCombined,
                                filter: `blur(${text1BlurCombined}px)`
                            }}
                        >
                            <FadeText
                                text="Un expert est notifié"
                                className={`text-7xl font-bold text-white leading-tight ${t1Align}`}
                                delay={200} // Word delay in ms
                                startFrame={NOTIFICATION_DELAY} // Sync start
                                auroraWords={["notifié"]}
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

                                    {/* Layer 1: App UI (Behind Lock Screen) */}
                                    <LargeNotificationUI startFrame={UNLOCK_START_FRAME} />

                                    {/* Layer 2: Lock Screen (On Top) */}
                                    <AbsoluteFill
                                        style={{
                                            transform: `translateY(${lockScreenY}%)`,
                                            opacity: lockScreenOpacity,
                                            zIndex: 20, // Increased z-index
                                        }}
                                    >
                                        {/* Background Wallpaper */}
                                        <div className="absolute inset-0">
                                            <Img src={fondEcranIPhone} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/20" /> {/* Dim overlay */}
                                        </div>

                                        {/* Clock / Time */}
                                        <div className="absolute top-20 w-full text-center">
                                            <div className="text-8xl font-thin text-white tracking-tight drop-shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>09:41</div>
                                            <div className="text-lg text-white/80 mt-1 font-medium">Mercredi 12 Septembre</div>
                                        </div>

                                        {/* Notification centered */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] dark">
                                            <AnimatedList startFrame={NOTIFICATION_DELAY} staggerFrames={10}>
                                                <LargeNotificationItem
                                                    name="ExpertFlow"
                                                    description="Quelles sont les limitations de l'API ?"
                                                    time="Maintenant"
                                                    color="#3b82f6"
                                                    icon={
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                                                        </svg>
                                                    }
                                                />
                                            </AnimatedList>
                                        </div>

                                        {/* Swipe Hint */}
                                        {frame < UNLOCK_START_FRAME && (
                                            <div className="absolute bottom-8 w-full flex justify-center animate-bounce">
                                                <div className="w-32 h-1 bg-white/50 rounded-full" />
                                            </div>
                                        )}
                                    </AbsoluteFill>

                                </AbsoluteFill>
                            </IPhoneFrame>
                        </div>
                    </div>

                    {/* Text 2 */}
                    {showText2 && (
                        <div
                            className={`absolute ${t2Pos} ${topPos} w-[25%] z-20`}
                            style={{
                                opacity: text2OpacityCombined,
                                filter: `blur(${text2BlurCombined}px)`
                            }}
                        >
                            <FadeText
                                text="Et répond à votre question"
                                className={`text-7xl font-bold text-white leading-tight ${t2Align}`}
                                delay={200}
                                startFrame={TEXT_2_START}
                                auroraWords={["répond"]}
                            />
                        </div>
                    )}

                    {/* Text 3 */}
                    {showText3 && (
                        <div
                            className={`absolute ${t3Pos} ${topPos} w-[25%] z-20`}
                            style={{
                                opacity: text3OpacityCombined,
                                filter: `blur(${text3BlurCombined}px)`
                            }}
                        >
                            <FadeText
                                text="Ce qui enrichira votre base de connaissances"
                                className={`text-7xl font-bold text-white leading-tight ${t3Align}`}
                                delay={200}
                                startFrame={TEXT_3_START}
                                auroraWords={["enrichira"]}
                            />
                        </div>
                    )}

                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
