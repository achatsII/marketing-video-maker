import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const StatusBadge = ({ status }: { status: "approved" | "review" | "draft" }) => {
  const colors = {
    approved: { bg: "#10b98120", text: "#10b981", label: "Approved" },
    review: { bg: "#f59e0b20", text: "#f59e0b", label: "In Review" },
    draft: { bg: "#ef444420", text: "#ef4444", label: "Draft" },
  };
  const c = colors[status];
  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        fontSize: 10,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 12,
        display: "inline-block",
      }}
    >
      {c.label}
    </div>
  );
};

const ProcedureCard = ({
  title,
  equipment,
  status,
  delay,
  isHighlighted = false,
}: {
  title: string;
  equipment: string;
  status: "approved" | "review" | "draft";
  delay: number;
  isHighlighted?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        background: isHighlighted ? "#1e2d42" : "#1a2332",
        borderRadius: 14,
        padding: "16px 18px",
        opacity: progress,
        transform: `translateY(${y}px)`,
        border: isHighlighted ? "1px solid #0078FF40" : "1px solid transparent",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{title}</div>
        <StatusBadge status={status} />
      </div>
      <div style={{ color: "#6b7280", fontSize: 11 }}>{equipment}</div>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ background: "#0078FF20", color: "#0078FF", fontSize: 9, padding: "2px 8px", borderRadius: 8 }}>
          Electrical
        </div>
        <div style={{ background: "#7928CA20", color: "#7928CA", fontSize: 9, padding: "2px 8px", borderRadius: 8 }}>
          Hydraulic
        </div>
      </div>
    </div>
  );
};

const MetricPill = ({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: string;
  color: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        background: "#1a2332",
        borderRadius: 12,
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: progress,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      <div>
        <div style={{ color: "#6b7280", fontSize: 10, fontWeight: 500 }}>{label}</div>
        <div style={{ color: "white", fontSize: 16, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
};

export const DashboardUI = ({
  cardsDelay = 10,
  highlightCardIndex = -1,
}: {
  cardsDelay?: number;
  highlightCardIndex?: number;
}) => {
  const procedures = [
    { title: "LOTO-2024-087", equipment: "Compressor Unit C-401", status: "approved" as const },
    { title: "LOTO-2024-092", equipment: "Hydraulic Press HP-12", status: "review" as const },
    { title: "LOTO-2024-095", equipment: "Conveyor Belt CB-7", status: "draft" as const },
    { title: "LOTO-2024-098", equipment: "Steam Turbine ST-3", status: "approved" as const },
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
        <div style={{ color: "white", fontSize: 18, fontWeight: 700 }}>LOTO Sheets</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Approved", "Pending"].map((tab, i) => (
            <div
              key={tab}
              style={{
                padding: "5px 14px",
                borderRadius: 16,
                fontSize: 10,
                fontWeight: 500,
                background: i === 0 ? "#0078FF" : "#1a2332",
                color: i === 0 ? "white" : "#6b7280",
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <MetricPill label="Total Sheets" value="142" color="#0078FF" delay={cardsDelay} />
        <MetricPill label="Compliance" value="95.2%" color="#10b981" delay={cardsDelay + 4} />
        <MetricPill label="Pending Review" value="12" color="#f59e0b" delay={cardsDelay + 8} />
      </div>

      {/* Procedure cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {procedures.map((proc, i) => (
          <ProcedureCard
            key={i}
            title={proc.title}
            equipment={proc.equipment}
            status={proc.status}
            delay={cardsDelay + 12 + i * 6}
            isHighlighted={i === highlightCardIndex}
          />
        ))}
      </div>
    </div>
  );
};
