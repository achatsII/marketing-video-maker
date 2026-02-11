import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface DiagonalWipeProps {
    children: React.ReactNode;
    /** Direction of the wipe animation */
    direction?: "left-to-right" | "right-to-left";
    /** Angle in degrees (default: 45) */
    angle?: number;
    /** Frame at which the wipe animation starts */
    startFrame: number;
    /** Duration of the wipe animation in frames */
    durationFrames: number;
    /** Blur amount for soft edge (default: 20) */
    blurAmount?: number;
    /** Optional className for the container */
    className?: string;
}

export const DiagonalWipe: React.FC<DiagonalWipeProps> = ({
    children,
    direction = "left-to-right",
    angle = 45,
    startFrame,
    durationFrames,
    blurAmount = 20,
    className = "",
}) => {
    const frame = useCurrentFrame();

    // Calculate wipe progress (0 to 1)
    const progress = interpolate(
        frame,
        [startFrame, startFrame + durationFrames],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Calculate the mask gradient position based on direction and progress
    const getGradientStyle = (): React.CSSProperties => {
        const angleRad = (angle * Math.PI) / 180;

        // Gradient angle for CSS (perpendicular to the wipe direction)
        const gradientAngle = direction === "left-to-right"
            ? 90 + angle
            : 90 - angle;

        // Position of the gradient (0% = fully visible, 100% = fully hidden)
        const gradientPos = interpolate(progress, [0, 1], [-50, 110]);

        // Create a soft gradient mask using CSS mask-image
        const maskGradient = direction === "left-to-right"
            ? `linear-gradient(${gradientAngle}deg, transparent ${gradientPos - blurAmount}%, black ${gradientPos}%)`
            : `linear-gradient(${gradientAngle}deg, black ${100 - gradientPos}%, transparent ${100 - gradientPos + blurAmount}%)`;

        return {
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
        };
    };

    return (
        <div
            className={className}
            style={{
                ...getGradientStyle(),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}
        >
            {children}
        </div>
    );
};
