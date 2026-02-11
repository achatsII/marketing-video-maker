import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const CheckItem = ({
  label,
  norm,
  delay,
  auditStartFrame,
}: {
  label: string;
  norm: string;
  delay: number;
  auditStartFrame: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // After audit starts, items turn green with stagger
  const auditDelay = auditStartFrame + delay;
  const checkProgress = spring({
    frame: frame - auditDelay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const isChecked = checkProgress > 0.5;
  const iconColor = isChecked ? "#10b981" : "#6b7280";
  const bgColor = isChecked ? "#10b98110" : "#1a2332";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: bgColor,
        borderRadius: 10,
        opacity: enterProgress,
        transform: `translateY(${interpolate(enterProgress, [0, 1], [15, 0])}px)`,
        border: `1px solid ${isChecked ? "#10b98130" : "transparent"}`,
      }}
    >
      {/* Check circle */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: `2px solid ${iconColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: isChecked ? "#10b98120" : "transparent",
        }}
      >
        {isChecked && (
          <div
            style={{
              color: "#10b981",
              fontSize: 11,
              fontWeight: 700,
              transform: `scale(${interpolate(checkProgress, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
            }}
          >
            ✓
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "white", fontSize: 11, fontWeight: 500 }}>{label}</div>
        <div style={{ color: "#4a5a6a", fontSize: 9, marginTop: 1 }}>{norm}</div>
      </div>
    </div>
  );
};

export const ComplianceUI = ({
  enterDelay = 5,
  auditStartFrame = 9999,
}: {
  enterDelay?: number;
  auditStartFrame?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Score counter
  const scoreProgress = spring({
    frame: frame - auditStartFrame - 30,
    fps,
    config: { damping: 20, stiffness: 60 },
  });
  const score = Math.round(97 * Math.max(0, scoreProgress));

  // Button glow
  const btnGlowFrame = auditStartFrame;
  const btnGlow = frame >= btnGlowFrame - 5 && frame < btnGlowFrame + 10
    ? interpolate(frame - (btnGlowFrame - 5), [0, 7, 15], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const checks = [
    { label: "Energy sources identified", norm: "CSA Z460 §6.2" },
    { label: "Lockout sequence complete", norm: "RSST Art. 188.2" },
    { label: "Verification procedure defined", norm: "CSA Z460 §6.4" },
    { label: "Arc Flash warning included", norm: "CSA Z462" },
    { label: "Re-energization steps documented", norm: "CSA Z460 §6.6" },
  ];

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
        padding: 20,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ color: "white", fontSize: 16, fontWeight: 700 }}>Compliance Audit</div>
          <div style={{ color: "#6b7280", fontSize: 10 }}>LOTO-2024-087 — Compressor C-401</div>
        </div>
        <div
          style={{
            background: "#0078FF",
            color: "white",
            fontSize: 10,
            fontWeight: 600,
            padding: "6px 14px",
            borderRadius: 8,
            boxShadow: btnGlow > 0 ? `0 0 ${20 * btnGlow}px #0078FF80` : "none",
          }}
        >
          Run Audit
        </div>
      </div>

      {/* Score */}
      <div
        style={{
          background: "#1a2332",
          borderRadius: 14,
          padding: "14px 20px",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: score >= 90 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444",
          }}
        >
          {score}%
        </div>
        <div>
          <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>
            {score >= 90 ? "Compliant" : "Analyzing..."}
          </div>
          <div style={{ color: "#6b7280", fontSize: 10 }}>CSA Z460 / RSST</div>
        </div>
        {/* Norm badges */}
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          <div style={{ background: "#0078FF20", color: "#0078FF", fontSize: 9, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>
            CSA Z460
          </div>
          <div style={{ background: "#7928CA20", color: "#7928CA", fontSize: 9, padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>
            RSST
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {checks.map((check, i) => (
          <CheckItem
            key={i}
            label={check.label}
            norm={check.norm}
            delay={enterDelay + i * 5}
            auditStartFrame={auditStartFrame}
          />
        ))}
      </div>
    </div>
  );
};
