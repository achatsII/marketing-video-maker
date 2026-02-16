import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from "remotion";

export const SceneLogoOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const SLIDE_START = 30;
    const slideProgress = spring({
        frame: frame - SLIDE_START,
        fps,
        config: { damping: 200, stiffness: 80, mass: 2 },
    });

    // Content Animation
    const scale = interpolate(slideProgress, [0, 1], [0.9, 1]);
    const opacity = interpolate(slideProgress, [0, 1], [0, 1]);
    const blur = interpolate(slideProgress, [0, 1], [10, 0]);

    // Fade to Black
    const BG_FADE_START = SLIDE_START + 60;
    const BG_FADE_DURATION = 30;
    const blackBgOpacity = interpolate(
        frame,
        [BG_FADE_START, BG_FADE_START + BG_FADE_DURATION],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="flex flex-col items-center gap-6"
                style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                }}
            >
                {/* Logo/Name */}
                <h1 className="text-9xl font-bold text-white tracking-tight">LOTO-AI</h1>

                {/* CTA / Slogan */}
                <h2 className="text-4xl font-medium text-red-500 uppercase tracking-widest">
                    Sécurisez vos opérations
                </h2>

                {/* Sub-CTA */}
                <div className="mt-8 px-8 py-3 border border-white/20 rounded-full text-white/60 text-xl">
                    loto-ai.com
                </div>
            </div>

            {/* Black Overlay for Fade Out */}
            <AbsoluteFill
                style={{
                    backgroundColor: "black",
                    opacity: blackBgOpacity,
                    pointerEvents: "none",
                }}
            />
        </AbsoluteFill>
    );
};
