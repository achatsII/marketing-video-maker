import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";



// Interface simplified (no props needed)
interface SimplifiedDashboardUIProps {
  startFrame?: number;
  className?: string;
}

export const SimplifiedDashboardUI: React.FC<SimplifiedDashboardUIProps> = ({
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Internal Data
  const stats = [
    { id: "1", label: "Experts actifs", value: 1204, icon: "👥" },
    { id: "2", label: "Q&A créés", value: 8932, icon: "💬" },
    { id: "3", label: "Taux de réponse", value: 92, icon: "✅", suffix: "%" },
    { id: "4", label: "Temps moyen", value: 4, icon: "⚡", suffix: "min" },
  ];
  const chartData = [25, 40, 35, 60, 80, 65, 90];

  return (
    <div className={`w-full h-full bg-[#0f1823] text-white p-8 font-sans ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Knowledge Base Analytics
          </h1>
          <p className="text-white/40 text-sm mt-1">Vue d'overview de la base de connaissances</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#1e2a39] border border-white/10 text-xs text-white/60">
            Derniers 30 jours
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0078FF] to-[#00D4FF]" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const statDelay = i * 5;
          const statProgress = spring({
            frame: localFrame - statDelay,
            fps,
            config: { damping: 20, stiffness: 100 }
          });

          if (localFrame < statDelay) return <div key={stat.id} className="opacity-0" />;

          return (
            <div
              key={stat.id}
              className="bg-[#1e2a39] rounded-xl p-4 border border-white/5"
              style={{
                opacity: interpolate(statProgress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(statProgress, [0, 1], [20, 0])}px)`
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-[#0078FF] text-xs font-semibold bg-[#0078FF]/10 px-2 py-0.5 rounded-full">+12%</span>
              </div>
              <div className="text-2xl font-bold mb-0.5">
                {Math.round(interpolate(statProgress, [0, 1], [0, stat.value]))}
                {stat.suffix || ""}
              </div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="flex-1 bg-[#1e2a39]/80 backdrop-blur-sm rounded-xl p-4 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Utilisation - 30 derniers jours</p>
            <p className="text-xs text-white/50">Requêtes quotidiennes</p>
          </div>
          <span className="text-[#0078FF]">📈</span>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32">
          {chartData.map((value, index) => {
            const barDelay = 30 + index * 5;
            const barLocalFrame = localFrame - barDelay;

            const barProgress = interpolate(barLocalFrame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            const barHeight = (value / 100) * 100 * barProgress;

            return (
              <div
                key={index}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${barHeight}%`,
                  backgroundColor:
                    index === chartData.length - 2
                      ? "#0078FF"
                      : "rgba(0, 120, 255, 0.3)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 120, 255, 0.1), transparent)",
        }}
      />
    </div>
  );
};
