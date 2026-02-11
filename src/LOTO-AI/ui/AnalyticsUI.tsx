import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const KPICard = ({
  label,
  value,
  suffix,
  color,
  delay,
}: {
  label: string;
  value: number;
  suffix: string;
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

  const displayValue = Math.round(value * progress);

  return (
    <div
      style={{
        background: "#1a2332",
        borderRadius: 14,
        padding: "16px 18px",
        flex: 1,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <div style={{ color: "#6b7280", fontSize: 10, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ color, fontSize: 28, fontWeight: 800 }}>{suffix === "%" ? "" : suffix}{displayValue}{suffix === "%" ? "%" : ""}</span>
      </div>
      <div style={{ width: 30, height: 3, borderRadius: 2, background: color, marginTop: 8 }} />
    </div>
  );
};

const BarChart = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barHeights = [30, 45, 55, 40, 70, 85, 65, 90, 75, 95, 80, 100];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div style={{ background: "#1a2332", borderRadius: 14, padding: 16, marginTop: 12, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ color: "white", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
        Procedures Completed — 2024
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, flex: 1, paddingBottom: 6 }}>
        {barHeights.map((h, i) => {
          const barDelay = delay + i * 3;
          const barProgress = spring({
            frame: frame - barDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div key={i} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", gap: 3 }}>
              <div
                style={{
                  width: "100%",
                  height: `${h * barProgress}%`,
                  background: "linear-gradient(180deg, #0078FF, #0078FF80)",
                  borderRadius: "3px 3px 0 0",
                  minHeight: 1, // Ensure visibility
                }}
              />
              <span style={{ color: "#4a5a6a", fontSize: 8 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DonutChart = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const segments = [
    { label: "Electrical", pct: 42, color: "#0078FF" },
    { label: "Pneumatic", pct: 28, color: "#7928CA" },
    { label: "Hydraulic", pct: 18, color: "#f59e0b" },
    { label: "Thermal", pct: 12, color: "#ef4444" },
  ];

  // Build conic-gradient
  let accumulated = 0;
  const stops = segments.map((seg) => {
    const start = accumulated;
    accumulated += seg.pct * progress;
    return `${seg.color} ${start}% ${accumulated}%`;
  });
  stops.push(`#1a2332 ${accumulated}% 100%`);

  return (
    <div style={{ background: "#1a2332", borderRadius: 14, padding: 16, marginTop: 12, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ color: "white", fontSize: 12, fontWeight: 600, marginBottom: 14 }}>
        Energy Sources
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 20 }}>
        <div
          style={{
            width: 140, // Increased size
            height: 140, // Increased size
            borderRadius: "50%",
            background: `conic-gradient(${stops.join(", ")})`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 25, // adjusted for thicker ring if desired
              borderRadius: "50%",
              background: "#1a2332",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          {segments.map((seg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: seg.color }} />
                <span style={{ color: "#94a3b8", fontSize: 11 }}>{seg.label}</span>
              </div>
              <span style={{ color: "#6b7280", fontSize: 11, fontWeight: 600 }}>{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AnalyticsUI = ({
  kpiDelay = 5,
  chartDelay = 25,
}: {
  kpiDelay?: number;
  chartDelay?: number;
}) => {
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
      <div style={{ color: "white", fontSize: 16, fontWeight: 700, marginBottom: 14 }}>
        Team Productivity Analytics
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: 10 }}>
        <KPICard label="Time Saved" value={60} suffix="-" color="#10b981" delay={kpiDelay} />
        <KPICard label="Speed Multiplier" value={3} suffix="x" color="#0078FF" delay={kpiDelay + 5} />
        <KPICard label="Compliance Rate" value={95} suffix="%" color="#7928CA" delay={kpiDelay + 10} />
      </div>

      {/* Charts row */}
      <div style={{ display: "flex", gap: 12, flex: 1 }}>
        <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
          <BarChart delay={chartDelay} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <DonutChart delay={chartDelay + 10} />
        </div>
      </div>
    </div>
  );
};
