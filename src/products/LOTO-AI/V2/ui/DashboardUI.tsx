import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const StatCard = ({
    label,
    value,
    suffix = "",
    delay,
    color = "#0078FF",
}: {
    label: string;
    value: number;
    suffix?: string;
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
                {formatted}{suffix}
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

    // Upward trend
    const barHeights = [30, 35, 40, 45, 42, 55, 60, 65, 80, 85, 90, 100];
    const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

    return (
        <div
            style={{
                background: "#1a2332",
                borderRadius: 16,
                padding: 20,
                marginTop: 16,
                flex: 1,
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div style={{ color: "white", fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
                Audits & Procédures Conformes
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 12, // Increased gap
                    height: "100%", // Fill rest of card
                    paddingBottom: 20
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
                                height: "100%"
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: `${h * barProgress}%`,
                                    background: `linear-gradient(180deg, #D32F2F, #D32F2F60)`, // Red gradient
                                    borderRadius: "4px 4px 0 0",
                                    marginTop: "auto"
                                }}
                            />
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
                padding: 32,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 32
                }}
            >
                <div style={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                    LOTO Analytics
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ background: "#22c55e20", color: "#22c55e", padding: "4px 12px", borderRadius: 99, fontSize: 12 }}>
                        Système Sécurisé
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 16 }}>
                <StatCard label="Taux de Conformité" value={100} suffix="%" delay={statsDelay} color="#22c55e" />
                <StatCard
                    label="Réduction Temps Admin"
                    value={66}
                    suffix="%"
                    delay={statsDelay + 5}
                    color="#3b82f6"
                />
                <StatCard
                    label="Accidents (365j)"
                    value={0}
                    delay={statsDelay + 10}
                    color="#22c55e"
                />
            </div>

            {/* Chart */}
            <BarChart delay={chartDelay} />
        </div>
    );
};
