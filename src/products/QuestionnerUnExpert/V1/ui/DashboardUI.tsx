import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const StatCard = ({
  label,
  value,
  delay,
  color = "#0078FF",
}: {
  label: string;
  value: number;
  delay: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const displayValue = Math.round(value * progress);
  const formatted = displayValue.toLocaleString("fr-FR");

  return (
    <div
      style={{
        background: "#1a2332",
        borderRadius: 16,
        padding: "20px 24px",
        flex: 1,
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      }}
    >
      <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 6, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ color: "white", fontSize: 28, fontWeight: 700 }}>
        {formatted}
      </div>
      <div
        style={{
          width: 40,
          height: 3,
          borderRadius: 2,
          background: color,
          marginTop: 8,
        }}
      />
    </div>
  );
};

const BarChart = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barHeights = [40, 55, 35, 65, 80, 60, 90, 75, 50, 85, 70, 95];
  const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

  return (
    <div
      style={{
        background: "#1a2332",
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
      }}
    >
      <div style={{ color: "white", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
        Questions résolues — 12 derniers mois
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          height: 120,
        }}
      >
        {barHeights.map((h, i) => {
          const barDelay = delay + i * 3;
          const barProgress = spring({
            frame: frame - barDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: h * barProgress,
                  background: `linear-gradient(180deg, #0078FF, #0078FF80)`,
                  borderRadius: "4px 4px 0 0",
                }}
              />
              <span style={{ color: "#6b7280", fontSize: 9 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DashboardUI = ({
  statsDelay = 10,
  chartDelay = 30,
}: {
  statsDelay?: number;
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
        padding: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Dashboard
      </div>

      {/* Time filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["7J", "30J", "90J", "Tout"].map((period, i) => (
          <div
            key={period}
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 500,
              background: i === 1 ? "#0078FF" : "#1a2332",
              color: i === 1 ? "white" : "#6b7280",
            }}
          >
            {period}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 12 }}>
        <StatCard label="Experts actifs" value={1204} delay={statsDelay} />
        <StatCard
          label="Q&A créées"
          value={8932}
          delay={statsDelay + 5}
          color="#10b981"
        />
        <StatCard
          label="Taux de réponse"
          value={92}
          delay={statsDelay + 10}
          color="#f59e0b"
        />
      </div>

      {/* Chart */}
      <BarChart delay={chartDelay} />

      {/* Second stats row */}
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <StatCard
          label="Mes réponses"
          value={112}
          delay={statsDelay + 15}
          color="#8b5cf6"
        />
        <StatCard
          label="Vues de mes réponses"
          value={4876}
          delay={statsDelay + 20}
          color="#0078FF"
        />
      </div>
    </div>
  );
};
