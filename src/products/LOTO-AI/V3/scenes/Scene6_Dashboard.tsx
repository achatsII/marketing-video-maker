import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { NeonGradientCard } from "@/_core/components/remotion/NeonGradientCard";
import { ResultsDashboardUI } from "../ui/ResultsDashboardUI";
import { FadeText } from "@/_core/components/remotion/FadeText";
import { LotoAiV3Constants } from "../constants";

export const Scene6_Dashboard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entryProgress = spring({ frame, fps, config: { damping: 15, stiffness: 40 } });

    const rotateX = interpolate(entryProgress, [0, 1], [15, 3]);
    const rotateY = interpolate(entryProgress, [0, 1], [-10, 0]);
    const translateY = interpolate(entryProgress, [0, 1], [100, 0]);
    const opacity = entryProgress;
    const scale = interpolate(frame, [0, 180], [1, 1.03], { extrapolateRight: "clamp" });

    // Text Overlay
    const showText = frame > 30;
    const textOpacity = interpolate(frame, [30, 60], [0, 1]);

    return (
        <AbsoluteFill style={{ overflow: "hidden" }}>
            {/* Text Background/Overlay */}
            {showText && (
                <div className="absolute top-[15%] left-0 w-full flex flex-col items-center justify-center z-10" style={{ opacity: textOpacity }}>
                    <FadeText
                        text="Enquêtez. Générez. Sécurisez."
                        className="text-6xl font-bold text-white tracking-widest uppercase text-center"
                        auroraWords={["Sécurisez."]}
                    />
                </div>
            )}

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    top: "15%", // Shift down a bit
                    zIndex: 20,
                    opacity,
                    transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
                }}
            >
                <NeonGradientCard
                    width={1000}
                    height={600}
                    borderRadius={20}
                    borderSize={3}
                    neonColors={{ firstColor: LotoAiV3Constants.COLOR_PRIMARY, secondColor: LotoAiV3Constants.COLOR_SECONDARY }}
                >
                    <ResultsDashboardUI statsDelay={15} />
                </NeonGradientCard>
            </div>
        </AbsoluteFill>
    );
};
