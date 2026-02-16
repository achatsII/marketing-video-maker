import { useCurrentFrame, interpolate } from "remotion";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Scale drift
  const scale = interpolate(frame, [0, 150], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const opacity = interpolate(frame, [130, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        overflow: "hidden",
        opacity,
      }}
    >
      <div style={{ transform: `scale(${scale})`, width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <TextGenerateEffect
            words="Vos experts partent. Leur savoir aussi."
            className="text-center max-w-[1200px]"
            staggerFrames={10}
            highlightWord="savoir"
            highlightColor="#0078FF"
          />
        </div>
      </div>
    </div>
  );
};
