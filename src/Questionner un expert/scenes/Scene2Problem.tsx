import { useCurrentFrame, interpolate } from "remotion";
import { WordRotate } from "../../components/remotion/WordRotate";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [105, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden", opacity }}>
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
        <WordRotate
          words={[
            "Questions répétées.",
            "Réponses perdues.",
            "Experts surchargés.",
          ]}
          framesPerWord={40}
          className="text-white text-7xl font-bold text-center"
        />
      </div>
    </div>
  );
};
