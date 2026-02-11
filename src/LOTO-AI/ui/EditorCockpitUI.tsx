import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";


const EvidencePanel = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        flex: 1,
        background: "#131d2a",
        borderRadius: 12,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: progress,
        overflow: "hidden",
      }}
    >
      <div style={{ color: "#6b7280", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
        Investigation Hub
      </div>

      {/* Photo evidence */}
      <div
        style={{
          background: "#1a2332",
          borderRadius: 10,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #2a3a4a",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 4 }}>📷</div>
          <div style={{ color: "#6b7280", fontSize: 10 }}>Equipment Photo</div>
          <div style={{ color: "#4a5a6a", fontSize: 9, marginTop: 2 }}>Compressor C-401 — Valve Panel</div>
        </div>
      </div>

      {/* Field notes */}
      <div style={{ background: "#1a2332", borderRadius: 10, padding: 12 }}>
        <div style={{ color: "#6b7280", fontSize: 10, fontWeight: 600, marginBottom: 6 }}>Field Notes</div>
        <div style={{ color: "#94a3b8", fontSize: 10, lineHeight: 1.6 }}>
          Main disconnect located on NE wall. 3 energy sources identified: electrical 480V, pneumatic 120 PSI, hydraulic.
        </div>
      </div>

      {/* AI badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          background: "#0078FF15",
          borderRadius: 8,
          border: "1px solid #0078FF30",
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0078FF" }} />
        <div style={{ color: "#0078FF", fontSize: 10, fontWeight: 500 }}>AI Analysis Ready</div>
      </div>
    </div>
  );
};

const ProcedureStep = ({
  step,
  title,
  energyType,
  color,
  delay,
}: {
  step: number;
  title: React.ReactNode;
  energyType: string;
  color: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: color + "20",
          color: color,
          fontSize: 14,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {step}
      </div>
      <div>
        <div style={{ color: "white", fontSize: 13, fontWeight: 500 }}>{title}</div>
        <div style={{ color: "#9ca3af", fontSize: 11, marginTop: 2 }}>{energyType}</div>
      </div>
    </div>
  );
};

export const EditorCockpitUI = ({
  generateClickFrame = 9999,
  typingStartFrame = 9999,
}: {
  generateClickFrame?: number;
  typingStartFrame?: number;
}) => {
  const frame = useCurrentFrame();

  const btnGlow = frame >= generateClickFrame && frame < generateClickFrame + 15
    ? interpolate(frame - generateClickFrame, [0, 7, 15], [0, 1, 0], {
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
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Left: Evidence */}
      <div style={{ width: "38%", padding: 14, display: "flex", flexDirection: "column" }}>
        <EvidencePanel delay={5} />
      </div>

      {/* Right: Procedure editor */}
      <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", borderLeft: "1px solid #1a2332" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 700 }}>LOTO-2024-087</div>
            <div style={{ color: "#6b7280", fontSize: 10 }}>Compressor Unit C-401</div>
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
            ✨ Generate with AI
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          <ProcedureStep step={1} title="Isolate main electrical disconnect" energyType="Electrical — 480V" color="#f59e0b" delay={15} />
          <ProcedureStep step={2} title="Bleed pneumatic pressure" energyType="Pneumatic — 120 PSI" color="#0078FF" delay={20} />
          <ProcedureStep step={3} title="Release hydraulic stored energy" energyType="Hydraulic" color="#ef4444" delay={25} />

          {/* AI-generated steps */}
          {frame >= typingStartFrame && (
            <>
              {/* Step 4: Verification */}
              <ProcedureStep
                step={4}
                title="Verify zero energy state on all circuits"
                energyType="Verification"
                color="#10b981"
                delay={typingStartFrame}
              />

              {/* Step 5: Lockout (starts after Step 4 is mostly done, e.g., +40 frames) */}
              {frame >= typingStartFrame + 5 && (
                <ProcedureStep
                  step={5}
                  title="Apply personal lock on main disconnect"
                  energyType="Lockout procedure"
                  color="#ef4444"
                  delay={typingStartFrame + 5}
                />
              )}

              {/* Step 6: Try-out (starts after Step 5, e.g., +80 frames from start) */}
              {frame >= typingStartFrame + 10 && (
                <ProcedureStep
                  step={6}
                  title="Attempt to start equipment (Try-out)"
                  energyType="Try-out test"
                  color="#f59e0b"
                  delay={typingStartFrame + 10}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
