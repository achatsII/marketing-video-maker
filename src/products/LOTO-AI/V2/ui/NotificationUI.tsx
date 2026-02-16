import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TapIndicator } from "@/_core/components/remotion/GhostCursor";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";
import { NotificationItem } from "./NotificationItem";

interface NotificationUIProps {
    startFrame?: number;
    className?: string;
}

export const NotificationUI: React.FC<NotificationUIProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    // Timings
    const TAP_FRAME = 40;
    const RESPONSE_START = 60;
    const SUBMIT_FRAME = 160;

    const botResponse = "Ajout de l'étape de verrouillage Cadenas C-12 au point d'isolation.";

    return (
        <div
            className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <div className="h-20" /> {/* Spacer */}

            <div className="flex-1 overflow-hidden relative">
                <div
                    className="flex w-[200%] h-full transition-transform"
                    style={{
                        transform: `translateX(-${interpolate(
                            spring({
                                frame: localFrame - TAP_FRAME,
                                fps,
                                config: { damping: 30, stiffness: 300 },
                            }),
                            [0, 1],
                            [0, 50],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )}%)`,
                    }}
                >
                    {/* Panel 1: Notifications */}
                    <div className="w-[50%] h-full flex flex-col items-center px-6 py-10">
                        {/* Header */}
                        <div className="w-full flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Alertes Sécurité</h2>
                            <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-sm font-medium">1 Critique</span>
                        </div>

                        {/* Notification Card */}
                        <div className="w-full">
                            <NotificationItem
                                name="LOTO Guard"
                                description="Non-conformité détectée : Cadenas manquant sur Vanne 12."
                                time="À l'instant"
                                color="#D32F2F"
                                icon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                }
                            />
                        </div>

                        <TapIndicator x={250} y={150} tapFrame={TAP_FRAME} />
                    </div>

                    {/* Panel 2: Review & Fix */}
                    <div className="w-[50%] h-full flex flex-col px-6 py-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2" /></svg>
                            </div>
                            <h3 className="text-lg font-bold">Correction Requise</h3>
                        </div>

                        <div className="bg-[#1e2a39] rounded-2xl p-6 border border-white/5 flex-1 flex flex-col">
                            <p className="text-sm text-white/50 mb-2">Suggestion de l'IA</p>
                            <div className="bg-[#0f1823] p-4 rounded-xl text-white/90 text-lg leading-relaxed mb-6 flex-1">
                                <TypingAnimation
                                    text={botResponse}
                                    startFrame={startFrame + RESPONSE_START}
                                    framesPerChar={1}
                                    showCursor
                                />
                            </div>

                            <button
                                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${localFrame > SUBMIT_FRAME ? "bg-green-500 text-white" : "bg-[#D32F2F] text-white"
                                    }`}
                            >
                                {localFrame > SUBMIT_FRAME ? "Correction Appliquée" : "Appliquer la correction"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
