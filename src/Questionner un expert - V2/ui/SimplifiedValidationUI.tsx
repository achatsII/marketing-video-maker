import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface ValidationItem {
  id: string;
  question: string;
  answer: string;
  lastUsed: string;
  usageCount: number;
}

interface SimplifiedValidationUIProps {
  validations: ValidationItem[];
  showValidated?: boolean;
  startFrame?: number;
  className?: string;
}

export const SimplifiedValidationUI: React.FC<SimplifiedValidationUIProps> = ({
  validations,
  showValidated = false,
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  return (
    <div
      className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="font-semibold text-base">Validation des réponses</span>
        <span className="text-xs px-2 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b]">
          {validations.length} à valider
        </span>
      </div>

      {/* Info banner */}
      <div className="mx-4 mt-4 p-3 bg-[#0078FF]/10 rounded-lg border border-[#0078FF]/20">
        <p className="text-xs text-[#0078FF]">
          💡 Ces réponses ont été utilisées récemment. Confirmez leur validité.
        </p>
      </div>

      {/* Validation List */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-4">
        {validations.map((item, index) => {
          const cardDelay = index * 20;
          const cardLocalFrame = localFrame - cardDelay;

          const cardProgress =
            cardLocalFrame > 0
              ? spring({
                  frame: cardLocalFrame,
                  fps,
                  config: { damping: 15, stiffness: 100 },
                })
              : 0;

          const scale = interpolate(cardProgress, [0, 1], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const opacity = interpolate(cardProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const y = interpolate(cardProgress, [0, 1], [20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Validated animation
          const validatedFrame = cardLocalFrame - 40;
          const showCheckmark = showValidated && validatedFrame > 0 && index === 0;

          const checkProgress = showCheckmark
            ? spring({
                frame: validatedFrame,
                fps,
                config: { damping: 10, stiffness: 200 },
              })
            : 0;

          if (cardProgress === 0) return null;

          return (
            <div
              key={item.id}
              className="bg-[#1e2a39] rounded-xl p-4 border border-white/5 relative overflow-hidden"
              style={{
                transform: `scale(${scale}) translateY(${y}px)`,
                opacity,
              }}
            >
              {/* Validated overlay */}
              {showCheckmark && (
                <div
                  className="absolute inset-0 bg-[#22c55e]/20 flex items-center justify-center"
                  style={{
                    opacity: checkProgress,
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full bg-[#22c55e] flex items-center justify-center"
                    style={{
                      transform: `scale(${checkProgress})`,
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Question */}
              <p className="text-xs text-white/50 mb-1">Question</p>
              <p className="text-sm font-medium mb-3">{item.question}</p>

              {/* Answer preview */}
              <p className="text-xs text-white/50 mb-1">Réponse</p>
              <p className="text-xs text-white/70 mb-3 line-clamp-2">
                {item.answer}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                <span>Dernière utilisation: {item.lastUsed}</span>
                <span>{item.usageCount} utilisations</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 bg-[#22c55e] rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                  <span>✓</span> Toujours valide
                </button>
                <button className="flex-1 py-2.5 bg-[#1e2a39] border border-white/10 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                  <span>✎</span> Mettre à jour
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around py-2 border-t border-white/10">
        {[
          { icon: "home", label: "Accueil", active: false },
          { icon: "check", label: "Validation", active: true },
          { icon: "book", label: "Q&A", active: false },
          { icon: "stats", label: "Stats", active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1 ${
              item.active ? "text-[#0078FF]" : "text-white/40"
            }`}
          >
            <span className="text-xl">
              {item.icon === "home" && "🏠"}
              {item.icon === "check" && "✅"}
              {item.icon === "book" && "📚"}
              {item.icon === "stats" && "📊"}
            </span>
            <span className="text-[10px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
