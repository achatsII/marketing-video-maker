import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { BackgroundGradientAnimation } from "@/_core/components/remotion/BackgroundGradientAnimation";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { SimplifiedNotificationUI } from "../ui/SimplifiedNotificationUI";
import { AnimatedList } from "@/_core/components/remotion/AnimatedList";
import { NotificationItem } from "../ui/NotificationItem";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import fondEcranIPhone from "../fondEcranIPhone.jpg";

export const Scene5_ExpertFeature_Alt: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animation Timings
    const NOTIFICATION_DELAY = 110;
    const UNLOCK_START_FRAME = 160;

    // Phase A: Title
    const showTitle = frame < 60;
    const titleOpacity = interpolate(frame, [40, 60], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Text Overlay Logic with fade/blur transitions
    // Text 1: Notification
    const text1Fade = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text1FadeOut = interpolate(frame, [UNLOCK_START_FRAME, UNLOCK_START_FRAME + 20], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text1Blur = interpolate(frame, [UNLOCK_START_FRAME, UNLOCK_START_FRAME + 20], [0, 10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const showTextNotif = frame >= NOTIFICATION_DELAY && frame < UNLOCK_START_FRAME + 20;

    // Text 2: Response
    const text2Fade = interpolate(frame, [220, 240], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text2FadeOut = interpolate(frame, [270, 290], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text2Blur = interpolate(frame, [270, 290], [0, 10], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const showTextTyping = frame >= 220 && frame < 290;

    // Text 3: Enrichment (starts immediately after text 2)
    const text3Fade = interpolate(frame, [290, 310], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const text3Blur = 0; // No blur needed for last text
    const showTextEnrich = frame >= 290;

    // Phone appear animation
    const showPhone = frame >= 90;
    const phoneScale = spring({
        frame: frame - 90,
        fps,
        config: { damping: 20, stiffness: 100 },
    });

    // Lock Screen "Sweep Up" Animation
    // Slides from Y=0 to Y=-100% (revealing what's behind)
    const unlockProgress = spring({
        frame: frame - UNLOCK_START_FRAME,
        fps,
        config: { damping: 20, stiffness: 80 }, // Slower sweep
    });

    const lockScreenY = interpolate(unlockProgress, [0, 1], [0, -100], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    const lockScreenOpacity = interpolate(unlockProgress, [0.8, 1], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });


    return (
        <AbsoluteFill>
            <BackgroundGradientAnimation
                gradientBackgroundStart="rgb(12, 20, 35)"
                gradientBackgroundEnd="rgb(8, 15, 28)"
                firstColor="0, 180, 120"
                secondColor="0, 120, 255"
                thirdColor="0, 150, 180"
                fourthColor="0, 100, 150"
                fifthColor="0, 200, 160"
                size="85%"
                blendingValue="hard-light"
                containerClassName="absolute inset-0"
            >
                {/* Phase A: Title */}
                {showTitle && (
                    <AbsoluteFill
                        className="flex items-center justify-center"
                        style={{ opacity: titleOpacity }}
                    >
                        <div className="text-center px-20">
                            <TextGenerateEffect
                                words="Pas de réponse ?"
                                highlightWord="notifié"
                                highlightColor="#0078FF"
                                staggerFrames={10}
                                className="text-5xl font-bold"
                            />
                        </div>
                    </AbsoluteFill>
                )}

                <AbsoluteFill className="flex items-center justify-center">
                    {showPhone && (
                        <>
                            {/* Text 1: Un expert est notifié (Left) */}
                            {showTextNotif && (
                                <div
                                    className="absolute left-[10%] top-[40%] w-[30%] z-20 text-right"
                                    style={{
                                        opacity: text1Fade * text1FadeOut,
                                        filter: `blur(${text1Blur}px)`
                                    }}
                                >
                                    <TextGenerateEffect
                                        words="Un expert est notifié"
                                        className="text-4xl font-bold text-white leading-tight"
                                        staggerFrames={5}
                                        startFrame={NOTIFICATION_DELAY}
                                    />
                                </div>
                            )}

                            {/* Text 2: Et répond à votre question (Right) */}
                            {showTextTyping && (
                                <div
                                    className="absolute right-[10%] top-[35%] w-[30%] z-20 text-left"
                                    style={{
                                        opacity: text2Fade * text2FadeOut,
                                        filter: `blur(${text2Blur}px)`
                                    }}
                                >
                                    <TextGenerateEffect
                                        words="Et répond à votre question"
                                        className="text-4xl font-bold text-white leading-tight"
                                        staggerFrames={5}
                                        startFrame={220}
                                    />
                                </div>
                            )}

                            {/* Text 3: Enrichissement (Right) */}
                            {showTextEnrich && (
                                <div
                                    className="absolute right-[10%] top-[35%] w-[30%] z-20 text-left"
                                    style={{
                                        opacity: text3Fade,
                                        filter: `blur(${text3Blur}px)`
                                    }}
                                >
                                    <TextGenerateEffect
                                        words="Ce qui enrichira votre base de connaissances"
                                        className="text-4xl font-bold text-white leading-tight"
                                        highlightWord="enrichira"
                                        highlightColor="#22c55e"
                                        staggerFrames={5}
                                        startFrame={290}
                                    />
                                </div>
                            )}

                            <div
                                style={{
                                    transform: `scale(${phoneScale * 0.85})`,
                                    opacity: phoneScale,
                                }}
                            >
                                <IPhoneFrame width={380} darkMode>
                                    <AbsoluteFill className="bg-black overflow-hidden rounded-[40px]">

                                        {/* Layer 1: App UI (Behind Lock Screen) */}
                                        <SimplifiedNotificationUI startFrame={UNLOCK_START_FRAME} />

                                        {/* Layer 2: Lock Screen (On Top) */}
                                        <AbsoluteFill
                                            style={{
                                                transform: `translateY(${lockScreenY}%)`,
                                                opacity: lockScreenOpacity,
                                                zIndex: 10,
                                            }}
                                        >
                                            {/* Background Wallpaper */}
                                            <div className="absolute inset-0">
                                                <Img src={fondEcranIPhone} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/20" /> {/* Dim overlay */}
                                            </div>

                                            {/* Clock / Time (Optional context) */}
                                            <div className="absolute top-16 w-full text-center">
                                                <div className="text-6xl font-thin text-white tracking-tight drop-shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>09:41</div>
                                                <div className="text-lg text-white/80 mt-1 font-medium">Mercredi 12 Septembre</div>
                                            </div>

                                            {/* Notification centered */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] dark">
                                                <AnimatedList startFrame={NOTIFICATION_DELAY} staggerFrames={10}>
                                                    <NotificationItem
                                                        name="ExpertFlow"
                                                        description="Vous avez une nouvelle question à répondre"
                                                        time="Maintenant"
                                                        color="#3b82f6"
                                                        icon={
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
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
                        </>
                    )}
                </AbsoluteFill>
            </BackgroundGradientAnimation>
        </AbsoluteFill>
    );
};
