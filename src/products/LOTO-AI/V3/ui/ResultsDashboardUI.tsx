import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { LotoAiV3Constants } from "../constants";

const StatCard = ({ label, value, delay, color = "#0078FF", suffix = "" }: { label: string; value: number; delay: number; color?: string; suffix?: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const progress = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 80 } });
    const displayValue = Math.round(value * progress);

    return (
        <div
            style={{
                background: "#1e293b",
                borderRadius: 16,
                padding: "20px 24px",
                flex: 1,
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
                border: "1px solid rgba(255,255,255,0.05)"
            }}
        >
            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6, fontWeight: 500, fontFamily: LotoAiV3Constants.FONT_FAMILY }}>{label}</div>
            <div style={{ color: "white", fontSize: 28, fontWeight: 700, fontFamily: LotoAiV3Constants.FONT_FAMILY }}>{displayValue}{suffix}</div>
            <div style={{ width: 40, height: 3, borderRadius: 2, background: color, marginTop: 8 }} />
        </div>
    );
};

export const ResultsDashboardUI = ({ statsDelay = 10 }: { statsDelay?: number }) => {
    return (
        <div style={{ width: "100%", height: "100%", background: "#0f172a", display: "flex", flexDirection: "column", padding: 32, fontFamily: LotoAiV3Constants.FONT_FAMILY }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="text-2xl font-bold text-white">Rapport de Performance</div>
                <div className="text-sm text-slate-400">Derniers 30 Jours</div>
            </div>

            {/* Stats Row 1 */}
            <div className="flex gap-4 mb-4">
                <StatCard label="Temps Gagné (h/jour)" value={3} delay={statsDelay} color={LotoAiV3Constants.COLOR_SECONDARY} />
                <StatCard label="Procédures Générées" value={142} delay={statsDelay + 5} color={LotoAiV3Constants.COLOR_PRIMARY} />
                <StatCard label="Conformité" value={100} delay={statsDelay + 10} color="#22c55e" suffix="%" />
            </div>

            {/* Bottom Area (Fake Chart) */}
            <div className="bg-[#1e293b] rounded-2xl flex-1 border border-white/5 p-6 relative overflow-hidden">
                <div className="text-sm text-slate-400 font-medium mb-4">Évolution de la Conformité</div>
                <div className="flex items-end justify-between h-32 px-2 gap-2">
                    {[40, 45, 55, 60, 65, 75, 80, 85, 90, 95, 98, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-green-500/20 to-green-500 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.8 }} />
                    ))}
                </div>
            </div>
        </div>
    );
};
