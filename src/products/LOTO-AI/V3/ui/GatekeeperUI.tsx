import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TapIndicator } from "@/_core/components/remotion/GhostCursor";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";
import { GatekeeperItem, NotificationItemProps } from "./GatekeeperItem";
import { LotoAiV3Constants } from "../constants";

interface GatekeeperUIProps {
    startFrame?: number;
    className?: string;
}

// Icons
const AlertIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
const CheckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export const GatekeeperUI: React.FC<GatekeeperUIProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const TAP_ALERT_FRAME = 40;
    const FIXING_START_FRAME = 60;
    const FIXING_DURATION = 60;
    const DONE_FRAME = FIXING_START_FRAME + FIXING_DURATION + 20;

    const notifications: NotificationItemProps[] = [
        {
            name: "LOTO-AI Gatekeeper",
            description: "⚠️ Non-conformité détectée: CSA Z460",
            time: "Maintenant",
            icon: <AlertIcon />,
            color: "#dc2626", // Red 600
        },
    ];

    return (
        <div
            className={`flex flex-col h-full bg-[#0f172a] text-white ${className}`}
            style={{ fontFamily: LotoAiV3Constants.FONT_FAMILY }}
        >
            <div className="h-20" /> {/* Spacer */}

            <div className="flex-1 overflow-hidden relative">
                <div
                    className="flex w-[200%] h-full transition-transform"
                    style={{
                        transform: `translateX(-${interpolate(
                            spring({
                                frame: localFrame - TAP_ALERT_FRAME,
                                fps,
                                config: { damping: 30, stiffness: 300 },
                            }),
                            [0, 1],
                            [0, 50],
                            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                        )}%)`,
                    }}
                >
                    {/* View 1: Lock Screen Notifications */}
                    <div className="w-[50%] h-full flex flex-col relative px-6 py-6 items-center">
                        <GatekeeperItem {...notifications[0]} />
                        <TapIndicator x={250} y={100} tapFrame={TAP_ALERT_FRAME} />
                    </div>

                    {/* View 2: Resolution UI */}
                    <div className="w-[50%] h-full flex flex-col relative px-6 py-6">
                        <div className="bg-[#1e293b] rounded-3xl p-6 border border-white/10 flex flex-col gap-6 h-full">

                            {/* Header */}
                            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500">
                                    <AlertIcon />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">Analyse Normative</div>
                                    <div className="text-sm text-red-400">1 Erreur Critique</div>
                                </div>
                            </div>

                            {/* Analysis */}
                            <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-white/80 leading-relaxed border border-white/5">
                                &gt; Scanning compliance...<br />
                                &gt; Detected: Hydraulic Press #402<br />
                                <span className="text-red-400">&gt; ERROR: Missing secondary isolation point (Valve V2).</span>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                <button
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 relative overflow-hidden flex items-center justify-center gap-2
                                        ${localFrame > DONE_FRAME ? "bg-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]" : "bg-white text-black hover:bg-gray-100"}
                                    `}
                                >
                                    {localFrame > DONE_FRAME ? (
                                        <>
                                            <CheckIcon /> Conforme (CSA Z460)
                                        </>
                                    ) : (
                                        localFrame > FIXING_START_FRAME ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Correction automatique...
                                            </span>
                                        ) : "Corriger la procédure"
                                    )}
                                    {/* Progress bar overlay during fixing */}
                                    {localFrame > FIXING_START_FRAME && localFrame <= DONE_FRAME && (
                                        <div
                                            className="absolute bottom-0 left-0 h-1 bg-blue-500"
                                            style={{
                                                width: `${interpolate(localFrame, [FIXING_START_FRAME, DONE_FRAME], [0, 100], { extrapolateRight: "clamp" })}%`
                                            }}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
