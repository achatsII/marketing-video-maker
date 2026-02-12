import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TapIndicator } from "@/_core/components/remotion/GhostCursor";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";

interface NotificationItem {
  id: string;
  question: string;
  author: string;
  time: string;
  priority: "high" | "medium" | "low";
}

interface SimplifiedNotificationUIProps {
  startFrame?: number;
  className?: string; // Add className prop
}

// Icon components (reused for consistency)
const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const NotificationsIcon = ({ active }: { active?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
  </svg>
);

const QnAIcon = ({ active }: { active?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" />
  </svg>
);

const SettingsIcon = ({ active }: { active?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0 .59-.22l1.92-3.32c.12-.22.08-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

export const SimplifiedNotificationUI: React.FC<SimplifiedNotificationUIProps> = ({
  startFrame = 0,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  // Internal Logic & Timing
  const TAP_QUESTION_FRAME = 40;  // User taps the notification
  const TYPING_START_FRAME = 60;  // Expert starts typing
  const TAP_SUBMIT_FRAME = 190;   // User taps submit (after typing completes)



  const fullResponse = "Pour configurer le SSO, accédez à Paramètres > Sécurité. Copiez l'URL de métadonnées et importez-la dans votre IdP.";

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e",
  };

  // Internal Data
  const notifications: NotificationItem[] = [
    {
      id: "1",
      question: "Comment configurer l'authentification SSO pour les nouveaux clients ?",
      author: "Marie L.",
      time: "Il y a 5 min",
      priority: "high",
    },
    {
      id: "2",
      question: "Quelle est la procédure de backup des données sensibles ?",
      author: "Thomas D.",
      time: "Il y a 12 min",
      priority: "medium",
    },
  ];

  return (
    <div
      className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Dynamic Island spacer - Increased */}
      <div className="h-14" />

      {/* Content Area with Slide Transition */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex w-[200%] h-full transition-transform"
          style={{
            transform: `translateX(-${interpolate(
              spring({
                frame: localFrame - TAP_QUESTION_FRAME,
                fps,
                config: { damping: 30, stiffness: 300 },
              }),
              [0, 1],
              [0, 50],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            )}%)`,
          }}
        >
          {/* View 1: Notification List */}
          <div className="w-[50%] h-full flex flex-col relative">
            {/* Header 1 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0f1823]">
              <span className="font-semibold text-base">Questions en attente</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#0078FF]/20 text-[#0078FF]">
                {notifications.length} en attente
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3 px-4 py-4">
              {notifications.map((notif, index) => {
                const notifDelay = index * 15;
                const notifLocalFrame = localFrame - notifDelay;

                const notifProgress =
                  notifLocalFrame > 0
                    ? spring({
                      frame: notifLocalFrame,
                      fps,
                      config: { damping: 20, stiffness: 120 },
                    })
                    : 0;

                const scale = interpolate(notifProgress, [0, 1], [0.8, 1], { extrapolateRight: "clamp" });
                const opacity = interpolate(notifProgress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

                if (notifProgress === 0) return null;

                return (
                  <div
                    key={notif.id}
                    className="bg-[#1e2a39] rounded-xl p-4 border border-white/5 relative overflow-hidden group"
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                    }}
                  >
                    {/* Active state simulation when tapped */}
                    {index === 0 && localFrame > TAP_QUESTION_FRAME - 5 && localFrame < TAP_QUESTION_FRAME + 20 && (
                      <div className="absolute inset-0 bg-[#0078FF]/10 z-0" />
                    )}

                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-snug mb-2">
                          {notif.question}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span>{notif.author}</span>
                          <span>•</span>
                          <span>{notif.time}</span>
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: priorityColors[notif.priority] }}
                      />
                    </div>
                  </div>
                );
              })}
              {/* Tap Indicator on first item */}
              <TapIndicator x={190} y={80} tapFrame={TAP_QUESTION_FRAME} />
            </div>
          </div>

          {/* View 2: Response UI */}
          <div className="w-[50%] h-full flex flex-col relative">
            {/* Header 2 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0f1823]">
              <span className="font-semibold text-base">Répondre</span>
              <div className="w-8" />
            </div>

            <div className="flex-1 flex flex-col gap-4 px-4 py-4">
              {/* Question Card */}
              <div className="bg-[#1e2a39] rounded-xl p-4 border border-white/5">
                <p className="text-xs text-white/50 mb-2">Question posée</p>
                <p className="text-sm font-medium leading-snug">{notifications[0].question}</p>
              </div>

              {/* Response Area */}
              <div className="flex-1 bg-[#1e2a39] rounded-xl p-4 border border-white/5 flex flex-col">
                <p className="text-xs text-white/50 mb-3">Votre réponse</p>
                <div className="flex-1 bg-[#0f1823] rounded-lg p-3 text-sm text-white/90 leading-relaxed text-xs">
                  <TypingAnimation
                    text={fullResponse}
                    startFrame={startFrame + TYPING_START_FRAME}
                    framesPerChar={1}
                    showCursor={true}
                  />
                </div>
              </div>

              {/* Mic Button */}
              <div className="flex justify-center py-2">
                <button
                  className="w-14 h-14 rounded-full bg-[#1e2a39] border border-white/10 flex items-center justify-center text-white/50"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                </button>
              </div>

              {/* Submit Button */}
              <button
                className={`w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 relative overflow-hidden ${localFrame > TAP_SUBMIT_FRAME ? "bg-[#22c55e]" : "bg-[#0078FF]"}`}
              >
                {localFrame > TAP_SUBMIT_FRAME ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    Envoyé !
                  </span>
                ) : (
                  "Soumettre la réponse"
                )}
              </button>


            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex justify-around py-3 border-t border-white/10 pb-6 bg-[#0f1823]">
        {[
          { Icon: HomeIcon, label: "Accueil", active: false },
          { Icon: NotificationsIcon, label: "Notifs", active: true },
          { Icon: QnAIcon, label: "Q&A", active: false },
          { Icon: SettingsIcon, label: "Config", active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1 ${item.active ? "text-[#0078FF]" : "text-white/40"
              }`}
          >
            <item.Icon active={item.active} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
