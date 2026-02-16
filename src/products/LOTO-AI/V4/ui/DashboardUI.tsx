import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const StatCard = ({
    label,
    value,
    delay,
    color = "#D32F2F",
    suffix = "",
}: {
    label: string;
    value: number;
    delay: number;
    color?: string;
    suffix?: string;
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
                {displayValue}{suffix}
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

    // Data: Time spent (going down)
    const barHeights = [90, 85, 80, 75, 70, 60, 50, 40, 30, 25, 20, 15];
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
                Temps de rédaction (heures/mois) — Forte Baisse
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
                                    background: `linear-gradient(180deg, #D32F2F, #FF5722)`,
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
                LOTO Analytics
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 12 }}>
                <StatCard label="Procédures Générées" value={142} delay={statsDelay} color="#0078FF" />
                <StatCard
                    label="Score Conformité"
                    value={100}
                    delay={statsDelay + 5}
                    color="#10b981"
                    suffix="%"
                />
                <StatCard
                    label="Temps gagné / dossier"
                    value={45}
                    delay={statsDelay + 10}
                    color="#f59e0b"
                    suffix="min"
                />
            </div>

            {/* Chart */}
            <BarChart delay={chartDelay} />

            {/* Second stats row */}
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <StatCard
                    label="Incidents Évités"
                    value={12}
                    delay={statsDelay + 15}
                    color="#8b5cf6"
                />
                <StatCard
                    label="Audits Réussis"
                    value={24}
                    delay={statsDelay + 20}
                    color="#D32F2F"
                />
            </div>
        </div>
    );
};
