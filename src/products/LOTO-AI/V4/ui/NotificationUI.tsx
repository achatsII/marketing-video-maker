import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TapIndicator } from "@/_core/components/remotion/GhostCursor";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";
import { AnimatedList } from "@/_core/components/remotion/AnimatedList";
import { NotificationItem } from "./NotificationItem";
import { Img } from "remotion";

const WARNING_ICON = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-6h-2v-4h2v4z" />
    </svg>
);

const INFO_ICON = (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
);

export const NotificationUI: React.FC<{ startFrame?: number; className?: string }> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const TAP_QUESTION_FRAME = 40;
    const TYPING_START_FRAME = 60;
    const TAP_SUBMIT_FRAME = 190;

    const fullResponse = "Erreur critique CSA Z460: Point de coupure principal non verrouillé. Ajoutez une photo avant de continuer.";

    return (
        <div className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`} style={{ fontFamily: "Inter, sans-serif" }}>
            <div className="h-20" />

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
                            [0, 1], [0, 50], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )}%)`,
                    }}
                >
                    {/* View 1: Notifications */}
                    <div className="w-[50%] h-full flex flex-col relative">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f1823]">
                            <span className="font-semibold text-lg text-red-500">Alertes Sécurité</span>
                            <span className="text-sm px-3 py-1.5 rounded-full bg-red-500/20 text-red-500">1 Critique</span>
                        </div>

                        <div className="flex-1 px-6 py-6">
                            <AnimatedList startFrame={0} staggerFrames={10}>
                                <NotificationItem
                                    name="LOTO-AI Gatekeeper"
                                    description="Non-conformité détectée (CSA Z460)"
                                    time="À l'instant"
                                    color="#ef4444"
                                    icon={WARNING_ICON}
                                />
                                <div className="h-4" />
                                <NotificationItem
                                    name="Système"
                                    description="Procédure #QA-404 générée avec succès"
                                    time="Il y a 2 min"
                                    color="#22c55e"
                                    icon={INFO_ICON}
                                />
                            </AnimatedList>
                            <TapIndicator x={250} y={100} tapFrame={TAP_QUESTION_FRAME} />
                        </div>
                    </div>

                    {/* View 2: Detail */}
                    <div className="w-[50%] h-full flex flex-col relative">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f1823]">
                            <span className="font-semibold text-lg">Détail Alerte</span>
                            <div className="w-8" />
                        </div>

                        <div className="flex-1 flex flex-col gap-6 px-6 py-6">
                            <div className="bg-[#1e2a39] rounded-2xl p-6 border border-red-500/50">
                                <p className="text-sm text-white/50 mb-3">Statut</p>
                                <p className="text-lg font-bold leading-snug text-red-500">Validation Bloquée</p>
                            </div>

                            <div className="flex-1 bg-[#1e2a39] rounded-2xl p-6 border border-white/5 flex flex-col">
                                <p className="text-sm text-white/50 mb-4">Analyse IA</p>
                                <div className="flex-1 bg-[#0f1823] rounded-xl p-4 text-base text-white/90 leading-relaxed">
                                    <TypingAnimation
                                        text={fullResponse}
                                        startFrame={startFrame + TYPING_START_FRAME}
                                        framesPerChar={1}
                                        showCursor={true}
                                    />
                                </div>
                            </div>

                            <button
                                className={`w-full py-4 rounded-2xl font-medium text-base transition-all duration-200 ${localFrame > TAP_SUBMIT_FRAME ? "bg-red-500" : "bg-[#0078FF]"}`}
                            >
                                {localFrame > TAP_SUBMIT_FRAME ? "Redirection..." : "Corriger l'écart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <div className="flex justify-around py-4 border-t border-white/10 pb-8 bg-[#0f1823]">
                <div className="text-white/40 text-xs">Accueil</div>
                <div className="text-[#0078FF] text-xs font-bold">Alertes</div>
                <div className="text-white/40 text-xs">Profil</div>
            </div>
        </div>
    );
}
