import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const MobileCaptureUI = ({
  captureFrame = 9999,
}: {
  captureFrame?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash effect on capture
  const flashOpacity = frame >= captureFrame && frame < captureFrame + 8
    ? interpolate(frame - captureFrame, [0, 3, 8], [0.8, 0.8, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Photo thumbnail appears after capture
  const photoProgress = spring({
    frame: frame - captureFrame - 5,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const showPhoto = frame >= captureFrame + 5;

  // Note field appears after photo
  const noteProgress = spring({
    frame: frame - captureFrame - 20,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0a0f18",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Status bar */}
      <div style={{ padding: "12px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "white", fontSize: 11, fontWeight: 600 }}>LOTO-AI</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ background: "#10b981", width: 6, height: 6, borderRadius: "50%" }} />
          <span style={{ color: "#10b981", fontSize: 9 }}>Offline Ready</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: "4px 16px 12px" }}>
        <div style={{ color: "white", fontSize: 15, fontWeight: 700 }}>Field Capture</div>
        <div style={{ color: "#6b7280", fontSize: 10 }}>Compressor C-401</div>
      </div>

      {/* Camera viewfinder */}
      <div
        style={{
          margin: "0 16px",
          background: "#131d2a",
          borderRadius: 16,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #1a2332",
        }}
      >
        {/* Crosshair */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 60, height: 60, border: "1.5px solid #0078FF40", borderRadius: 8 }} />
        </div>
        {/* Corner marks */}
        {[
          { top: 14, left: 14 },
          { top: 14, right: 14 },
          { bottom: 14, left: 14 },
          { bottom: 14, right: 14 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 16,
              height: 16,
              borderColor: "#0078FF80",
              borderWidth: 2,
              borderStyle: "solid",
              borderRadius: 2,
              borderRightColor: i % 2 === 0 ? "transparent" : "#0078FF80",
              borderLeftColor: i % 2 === 0 ? "#0078FF80" : "transparent",
              borderTopColor: i < 2 ? "#0078FF80" : "transparent",
              borderBottomColor: i >= 2 ? "#0078FF80" : "transparent",
            } as React.CSSProperties}
          />
        ))}
        <div style={{ color: "#4a5a6a", fontSize: 12 }}>📷 Point at equipment</div>

        {/* Flash overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: flashOpacity,
            borderRadius: 16,
          }}
        />
      </div>

      {/* Capture button */}
      <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "3px solid #0078FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#0078FF" }} />
        </div>
      </div>

      {/* Photo thumbnail after capture */}
      {showPhoto && (
        <div
          style={{
            margin: "0 16px",
            padding: 12,
            background: "#131d2a",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: photoProgress,
            transform: `scale(${interpolate(photoProgress, [0, 1], [0.8, 1])})`,
            border: "1px solid #10b98130",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: "#1a2332",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            🖼️
          </div>
          <div>
            <div style={{ color: "white", fontSize: 11, fontWeight: 500 }}>Photo captured</div>
            <div style={{ color: "#10b981", fontSize: 9 }}>AI analyzing energy sources...</div>
          </div>
          <div style={{ marginLeft: "auto", color: "#10b981", fontSize: 14 }}>✓</div>
        </div>
      )}

      {/* Quick note */}
      {frame >= captureFrame + 20 && (
        <div
          style={{
            margin: "10px 16px 0",
            padding: 12,
            background: "#131d2a",
            borderRadius: 12,
            opacity: noteProgress,
            border: "1px solid #1a2332",
          }}
        >
          <div style={{ color: "#6b7280", fontSize: 9, fontWeight: 600, marginBottom: 6, textTransform: "uppercase" }}>
            Voice Note
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#0078FF20", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#0078FF", fontSize: 10 }}>🎤</span>
            </div>
            <div style={{ flex: 1, height: 3, borderRadius: 2, background: "#1a2332", overflow: "hidden" }}>
              <div
                style={{
                  width: `${interpolate(noteProgress, [0, 1], [0, 70])}%`,
                  height: "100%",
                  background: "#0078FF",
                  borderRadius: 2,
                }}
              />
            </div>
            <span style={{ color: "#6b7280", fontSize: 9 }}>0:04</span>
          </div>
        </div>
      )}
    </div>
  );
};
