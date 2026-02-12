import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";

export const RespondUI = ({
  typingStartFrame = 30,
  submitFrame = 90,
  toastFrame = 100,
}: {
  typingStartFrame?: number;
  submitFrame?: number;
  toastFrame?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Toast animation
  const toastProgress = spring({
    frame: frame - toastFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Submit button active state with blue halo
  const isSubmitting = frame >= submitFrame && frame < submitFrame + 10;
  const submitScale = isSubmitting
    ? interpolate(frame - submitFrame, [0, 5, 10], [1, 0.95, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 1;

  // Blue halo glow on submit
  const haloOpacity = isSubmitting
    ? interpolate(frame - submitFrame, [0, 3, 10], [0, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f1823",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Toast notification — positioned below Dynamic Island */}
      {frame >= toastFrame && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: "50%",
            transform: `translateX(-50%) translateY(${interpolate(
              toastProgress,
              [0, 1],
              [-40, 0]
            )}px)`,
            opacity: toastProgress,
            background: "#065f46",
            border: "1px solid #10b981",
            borderRadius: 12,
            padding: "10px 20px",
            color: "#6ee7b7",
            fontSize: 13,
            fontWeight: 600,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}
        >
          ✓ Réponse enregistrée
        </div>
      )}

      {/* Spacer for Dynamic Island */}
      <div style={{ height: 40, flexShrink: 0 }} />

      {/* Header */}
      <div
        style={{
          padding: "12px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ color: "#6b7280", fontSize: 20 }}>←</span>
        <span style={{ color: "white", fontSize: 17, fontWeight: 600 }}>
          Répondre à la question
        </span>
      </div>

      {/* Question card */}
      <div
        style={{
          margin: "0 20px 16px",
          background: "#1a2332",
          borderRadius: 14,
          padding: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#374151",
            }}
          />
          <div>
            <div style={{ color: "white", fontSize: 13, fontWeight: 500 }}>
              Sophie Martin
            </div>
            <div style={{ color: "#6b7280", fontSize: 11 }}>
              Il y a 2 heures
            </div>
          </div>
        </div>
        <div style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.5 }}>
          Comment fonctionne le processus de remboursement client ?
        </div>
      </div>

      {/* Answer area */}
      <div style={{ margin: "0 20px", flex: 1 }}>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Votre réponse
        </div>
        <div
          style={{
            background: "#1a2332",
            borderRadius: 14,
            padding: 14,
            minHeight: 100,
            position: "relative",
          }}
        >
          <div style={{ color: "#e0e0e0", fontSize: 13, lineHeight: 1.6 }}>
            <TypingAnimation
              text="Allez dans Facturation, sélectionnez la transaction, puis cliquez sur Rembourser."
              startFrame={typingStartFrame}
              framesPerChar={1}
              showCursor={true}
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div style={{ padding: 16 }}>
        <div
          style={{
            background: "#0078FF",
            borderRadius: 12,
            padding: "14px 0",
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: 600,
            transform: `scale(${submitScale})`,
            boxShadow: haloOpacity > 0
              ? `0 0 ${24 * haloOpacity}px rgba(0, 120, 255, ${0.7 * haloOpacity}), 0 0 ${48 * haloOpacity}px rgba(0, 120, 255, ${0.4 * haloOpacity})`
              : "none",
          }}
        >
          Envoyer la réponse
        </div>
      </div>
    </div>
  );
};
