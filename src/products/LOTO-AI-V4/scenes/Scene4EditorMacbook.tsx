import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";
import { ResponsiveSafari } from "@/_core/components/remotion/ResponsiveSafari";
import { GhostCursor } from "@/_core/components/remotion/GhostCursor";
import { EditorCockpitUI } from "../ui/EditorCockpitUI";
import { RefinedMacbook } from "@/_core/components/remotion/RefinedMacbook";

// Inner component for MacBook - gets its own timeline starting at 0
const MacbookContent: React.FC = () => {
    return (
        <AbsoluteFill
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
            }}
        >
            <div
                style={{
                    // RefinedMacbook has globalScale of 1.4, physical width 32rem (512px)
                    // That gives us 512 * 1.4 = 716.8px
                    // Using smaller scale to avoid oversized MacBook
                    // Moving up to center the screen when fully open
                    transform: "translateY(-300px) scale(0.9)",
                    transformOrigin: "center center",
                }}
            >
                <RefinedMacbook showGradient={false}>
                    <ResponsiveSafari url="loto-ai.app/editor" mode="default" className="dark">
                        <EditorCockpitUI
                            generateClickFrame={85}
                            typingStartFrame={90}
                        />
                    </ResponsiveSafari>
                </RefinedMacbook>
            </div>
        </AbsoluteFill>
    );
};

export const Scene4EditorMacbook: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Phase A: Text (frames 0-60)
    const phaseA = frame < 60;
    const phaseAOpacity = phaseA
        ? interpolate(frame, [50, 60], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 0;

    // Fade out
    const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Cursor keyframes are in scene-absolute time
    // Note: Adjusted for MacBook layout
    // The screen will be at a different position due to MacBook base
    // Original cursor targets: x: 1420, y: 300 for Generate button
    // With MacBook, the screen is offset upward by the base height
    // Need to adjust Y coordinate accordingly
    const cursorKeyframes = [
        { frame: 125, x: 1800, y: 900 },
        { frame: 145, x: 1420, y: 280, click: true }, // Slightly adjusted Y
        { frame: 225, x: 1900, y: -50 },
    ];

    return (
        <AbsoluteFill style={{ opacity: fadeOut }}>
            {/* Phase A: Text */}
            {phaseA && (
                <AbsoluteFill
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 20,
                        opacity: phaseAOpacity,
                    }}
                >
                    <TextGenerateEffect
                        words="AI drafts. You refine."
                        staggerFrames={8}
                        highlightWord="AI"
                        highlightColor="#0078FF"
                        className="text-center max-w-[1200px]"
                    />
                </AbsoluteFill>
            )}

            {/* Phase B: MacBook - uses Sequence to reset internal frame counter */}
            <Sequence from={60} durationInFrames={durationInFrames - 60}>
                <MacbookContent />
            </Sequence>

            {/* Cursor */}
            <AbsoluteFill style={{ zIndex: 50, pointerEvents: "none" }}>
                <GhostCursor keyframes={cursorKeyframes} size={48} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
