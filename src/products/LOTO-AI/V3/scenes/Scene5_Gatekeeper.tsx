import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { FadeText } from "@/_core/components/remotion/FadeText";
import { IPhoneFrame } from "@/_core/components/remotion/iPhone";
import { GatekeeperUI } from "../ui/GatekeeperUI";
import { LotoAiV3Constants } from "../constants";

// Using a placeholder wallpaper or color
const WALLPAPER_COLOR = "bg-gradient-to-b from-slate-900 to-slate-950";

export const Scene5_Gatekeeper: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Phone Animation
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
    const phoneOpacity = interpolate(phoneProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });
    const phoneEntranceY = interpolate(phoneProgress, [0, 1], [800, 0]);
    const phoneExitY = interpolate(phoneExitProgress, [0, 1], [0, -2000]);
    const phoneY = phoneEntranceY + phoneExitY;
    const phoneRotateX = interpolate(phoneProgress, [0, 1], [25, 0]);


    // Text Timing
    const NOTIFICATION_DELAY = 10;
    const TAP_FRAME = 40; // Approx when user taps
    const RESOLVED_FRAME = 140; // Approx when done

    const showText1 = frame >= NOTIFICATION_DELAY && frame < TAP_FRAME + 20;
    const text1Opacity = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 10, TAP_FRAME, TAP_FRAME + 20], [0, 1, 1, 0]);
    const text1Blur = interpolate(frame, [NOTIFICATION_DELAY, NOTIFICATION_DELAY + 10, TAP_FRAME, TAP_FRAME + 20], [10, 0, 0, 10]);

    const showText2 = frame >= TAP_FRAME + 20 && frame < RESOLVED_FRAME;
    const text2Opacity = interpolate(frame, [TAP_FRAME + 20, TAP_FRAME + 30, RESOLVED_FRAME - 10, RESOLVED_FRAME], [0, 1, 1, 0]);

    const showText3 = frame >= RESOLVED_FRAME;
    const text3Opacity = interpolate(frame, [RESOLVED_FRAME, RESOLVED_FRAME + 10, EXIT_START, EXIT_START + 20], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
            {/* Text Layers */}
            <div className="absolute top-[20%] w-full flex justify-center z-0">
                {showText1 && (
                    <div style={{ opacity: text1Opacity, filter: `blur(${text1Blur}px)` }}>
                        <FadeText text="Le Gatekeeper veille" className="text-7xl font-bold text-white text-center" auroraWords={["Gatekeeper"]} />
                    </div>
                )}
                {showText2 && (
                    <div style={{ opacity: text2Opacity }}>
                        <FadeText text="Correction automatique..." className="text-6xl font-medium text-white/80 text-center" />
                    </div>
                )}
                {showText3 && (
                    <div style={{ opacity: text3Opacity }}>
                        <FadeText text="100% Conforme." className="text-8xl font-bold text-green-400 text-center" auroraWords={["Conforme."]} />
                    </div>
                )}
            </div>

            {/* Phone */}
            <AbsoluteFill className="flex items-center justify-center z-10">
                <div style={{ perspective: '1000px' }}>
                    <div
                        style={{
                            transform: `translateY(${phoneY}px) rotateX(${phoneRotateX}deg) scale(${phoneScale})`,
                            opacity: phoneOpacity,
                            transformOrigin: 'center center',
                        }}
                    >
                        <IPhoneFrame width={500} darkMode>
                            <div className={`absolute inset-0 ${WALLPAPER_COLOR}`}>
                                <GatekeeperUI startFrame={0} />
                            </div>
                        </IPhoneFrame>
                    </div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
