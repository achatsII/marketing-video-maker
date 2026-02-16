import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { NeonGradientCard } from "@/_core/components/remotion/NeonGradientCard";
import { DashboardUI } from "@/products/LOTO-AI-V2/ui/DashboardUI";
import { FadeText } from "@/_core/components/FadeText";

export const SceneDashboard: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    const entryProgress = spring({
        frame,
        fps,
        config: { damping: 15, stiffness: 40 },
    });

    const rotateX = interpolate(entryProgress, [0, 1], [15, 3]);
    const rotateY = interpolate(entryProgress, [0, 1], [-10, 0]);
    const translateY = interpolate(entryProgress, [0, 1], [100, 0]);
    const opacity = entryProgress;

    const scale = interpolate(frame, [0, 180], [1, 1.03], {
        extrapolateRight: "clamp",
    });

    const fadeOutStart = durationInFrames - 20;
    const fadeOut = interpolate(frame, [fadeOutStart, durationInFrames], [1, 0]);
    const blurOut = interpolate(frame, [fadeOutStart, durationInFrames], [0, 20]);

    return (
        <div style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeOut, filter: `blur(${blurOut}px)` }}>
            {/* Title Text */}
            <div className="absolute top-20 left-0 right-0 z-0 flex justify-center">
                <FadeText
                    text="Productivité Maximisée"
                    className="text-7xl font-bold text-white leading-tight text-center"
                    delay={100}
                    startFrame={0}
                    auroraWords={["Maximisée"]}
                />
            </div>

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    top: 100, // Push down slightly
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 20,
                    opacity,
                    transform: `
              perspective(1200px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(${translateY}px)
              scale(${scale})
            `,
                }}
            >
                <NeonGradientCard
                    width={950}
                    height={600}
                    borderRadius={20}
                    borderSize={2}
                    neonColors={{ firstColor: "#D32F2F", secondColor: "#FF5252" }} // Red neon
                >
                    <DashboardUI statsDelay={15} chartDelay={35} />
                </NeonGradientCard>
            </div>
        </div>
    );
};
