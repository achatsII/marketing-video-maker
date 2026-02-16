import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from "remotion";
import { LotoAiV3Constants } from "../constants";

export const Scene1_Reveal: React.FC = () => {
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
    // Starts opaque black, fades out as text appears to reveal underlying gradient
    const bgOpacity = interpolate(entranceProgress, [0, 0.8], [1, 0], {
        extrapolateRight: "clamp",
    });

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
            <AbsoluteFill className="flex flex-col items-center justify-center p-20">
                <h1
                    className="text-9xl font-bold text-white tracking-tighter text-center leading-none"
                    style={{
                        transform: `scale(${entranceScale})`,
                        opacity: entranceOpacity,
                        filter: `blur(${entranceBlur}px)`,
                        fontFamily: LotoAiV3Constants.FONT_FAMILY,
                    }}
                >
                    {LotoAiV3Constants.PRODUCT_NAME}
                </h1>
                <h2
                    className="text-4xl font-medium text-white/80 mt-8 tracking-wide uppercase"
                    style={{
                        opacity: interpolate(frame, [40, 70], [0, 1]),
                        transform: `translateY(${interpolate(frame, [40, 70], [20, 0])}px)`,
                        fontFamily: LotoAiV3Constants.FONT_FAMILY,
                        color: LotoAiV3Constants.COLOR_SECONDARY,
                    }}
                >
                    {LotoAiV3Constants.TAGLINE}
                </h2>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
