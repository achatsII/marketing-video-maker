import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from "remotion";

const APP_NAME = "LOTO-AI";
const SUBTITLE = "L'accélérateur de conformité";

export const SceneAppNameReveal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // ─── Entrance Animation ───
    const START_DELAY = 15;
    const entranceProgress = spring({
        frame: frame - START_DELAY,
        fps,
        config: { damping: 200, stiffness: 50, mass: 3 },
    });

    const entranceScale = interpolate(entranceProgress, [0, 1], [1.2, 1]);
    const entranceOpacity = interpolate(entranceProgress, [0, 1], [0, 1]);
    const entranceBlur = interpolate(entranceProgress, [0, 1], [20, 0]);

    // Background Transition: Black -> Transparent
    const bgOpacity = interpolate(entranceProgress, [0, 0.8], [1, 0], {
        extrapolateRight: "clamp",
    });

    // Subtitle Animation
    const subtitleProgress = spring({
        frame: frame - START_DELAY - 20,
        fps,
        config: { damping: 200, stiffness: 50 },
    });
    const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
    const subtitleY = interpolate(subtitleProgress, [0, 1], [20, 0]);


    // ─── Exit Animation ───
    const EXIT_DURATION = 30;
    const exitStart = durationInFrames - EXIT_DURATION;

    const exitProgress = spring({
        frame: frame - exitStart,
        fps,
        config: { damping: 20, stiffness: 80 },
    });

    // Exit values
    const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
    const exitBlur = interpolate(exitProgress, [0, 1], [0, 20]);
    const exitScale = interpolate(exitProgress, [0, 1], [1, 1.1]);

    // Combine values
    const scale = frame < exitStart ? entranceScale : exitScale;
    const opacity = frame < exitStart ? entranceOpacity : exitOpacity;
    const blur = frame < exitStart ? entranceBlur : exitBlur;

    return (
        <AbsoluteFill>
            {/* Background Overlay */}
            <AbsoluteFill
                style={{
                    backgroundColor: "black",
                    opacity: bgOpacity
                }}
            />

            {/* Centered Text */}
            <AbsoluteFill className="flex flex-col items-center justify-center p-20 gap-4">
                <h1
                    className="text-9xl font-bold text-white tracking-tight text-center leading-tight"
                    style={{
                        transform: `scale(${scale})`,
                        opacity,
                        filter: `blur(${blur}px)`,
                        color: "#ffffff" // Main white
                    }}
                >
                    {APP_NAME}
                </h1>
                <h2
                    className="text-3xl font-medium text-red-500 tracking-wide text-center uppercase"
                    style={{
                        transform: `scale(${scale}) translateY(${subtitleY}px)`,
                        opacity: frame < exitStart ? subtitleOpacity : exitOpacity,
                        filter: `blur(${blur}px)`,
                    }}
                >
                    {SUBTITLE}
                </h2>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
