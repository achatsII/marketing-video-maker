import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { TextGenerateEffect } from "../../components/remotion/TextGenerateEffect";
import { Safari } from "@/components/ui/safari";
import { QAListUI } from "../ui/QAListUI";
import { GhostCursor } from "../../components/remotion/GhostCursor";

export const Scene6Knowledge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase A: text (frames 0-60)
  const phaseA = frame < 60;
  const phaseAOpacity = phaseA
    ? interpolate(frame, [50, 60], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  // Phase B: UI (frames 60-210)
  const phaseBFrame = frame - 60;
  const safariProgress = spring({
    frame: phaseBFrame,
    fps,
    config: { damping: 15, stiffness: 60 },
  });
  const safariScale = interpolate(safariProgress, [0, 1], [0.9, 1]);
  const safariOpacity = frame >= 60 ? safariProgress : 0;

  // Focus Zoom Logic (Click on Engineering Tab at frame 95)
  // Tab is at (120, 168). Center is (450, 281.5). Delta needed: (+330, +113.5)
  const focusZoom = interpolate(frame, [80, 95, 105, 120], [1, 2.5, 2.5, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease)
  });
  const focusX = interpolate(frame, [80, 95, 105, 120], [0, 330, 330, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease)
  });
  const focusY = interpolate(frame, [80, 95, 105, 120], [0, 115, 115, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease)
  });

  // Fade out
  const fadeOut = interpolate(frame, [195, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ghost cursor — enter → click "Engineering" tab → exit
  // 900px container: Engineering tab ≈ x:120, y:168
  const cursorKeyframes = [
    { frame: 75, x: 950, y: 600 },                // enter from bottom-right
    { frame: 95, x: 120, y: 168, click: true },
    { frame: 105, x: 120, y: 168 },
    { frame: 140, x: 500, y: -300 },               // exit top-left
  ];

  return (
    <div className="dark" style={{ width: 1920, height: 1080, overflow: "hidden", opacity: fadeOut }}>
      {/* Phase A */}
      {phaseA && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: phaseAOpacity,
          }}
        >
          <TextGenerateEffect
            words="Chaque réponse enrichit la base."
            staggerFrames={10}
            highlightWord="enrichit"
            highlightColor="#0078FF"
            className="text-center"
          />
        </div>
      )}

      {/* Phase B */}
      {frame >= 60 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: safariOpacity,
            transform: `scale(${safariScale})`,
          }}
        >
          <div style={{
            width: 900,
            height: 563, // Fixed height for reliable transform center
            position: "relative",
            transform: `scale(${focusZoom}) translate(${focusX}px, ${focusY}px)`,
            transformOrigin: "center center",
          }}>
            <Safari url="questionner-un-expert.app/knowledge" mode="default">
              <QAListUI
                activeFilter={phaseBFrame >= 35 ? "Engineering" : "Tous"}
                staggerDelay={8}
              />
            </Safari>
            <GhostCursor keyframes={cursorKeyframes} size={48} />
          </div>
        </div>
      )}
    </div>
  );
};
