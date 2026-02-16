import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface ChatMessage {
    id: string;
    type: "user" | "bot";
    text: string;
    showSource?: boolean;
    isAlert?: boolean;
}

interface ChatUIProps {
    startFrame?: number;
    className?: string;
}

export const CHAT_TIMINGS = {
    user1Msg: 10,
    bot1Typing: 25,
    bot1Msg: 45,
    user2Typing: 80,
    user2Msg: 95,
    bot2Typing: 110,
    bot2Msg: 130,
    exitStart: 180,
};

export const CHAT_MESSAGES: ChatMessage[] = [
    {
        id: "1",
        type: "user",
        text: "Vanne 3 fuit. Impossible de fermer complètement.",
        showSource: false,
    },
    {
        id: "2",
        type: "bot",
        text: "Signalement critique reçu. Veuillez envoyer une photo pour validation de l'isolation alternative.",
        isAlert: true,
    },
    {
        id: "3",
        type: "user",
        text: "[Photo envoyée]", // Simulated image message
        showSource: false,
    },
    {
        id: "4",
        type: "bot",
        text: "Analyse terminée. Procédure de dérivation générée (Code: SAFE-402).",
        showSource: false,
    },
];

const TypingDots: React.FC<{ frame: number; fps: number; side: "user" | "bot" }> = ({ frame, fps, side }) => (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
        <div
            className={`px-4 py-3 rounded-2xl flex gap-1 items-center h-10 ${side === "user"
                ? "bg-[#D32F2F]/60 rounded-tr-sm"
                : "bg-[#1e2a39] rounded-tl-sm"
                }`}
        >
            {[0, 1, 2].map((i) => {
                const dotFrame = frame - i * 5;
                const dotOpacity = 0.3 + 0.7 * Math.abs(Math.sin((dotFrame / fps) * Math.PI * 2));
                return (
                    <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/70"
                        style={{ opacity: dotOpacity }}
                    />
                );
            })}
        </div>
    </div>
);

export const ChatUI: React.FC<ChatUIProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const t = CHAT_TIMINGS;
    const messages = CHAT_MESSAGES;

    const visibleMessages = messages.filter((_, index) => {
        if (index === 0) return localFrame >= t.user1Msg;
        if (index === 1) return localFrame >= t.bot1Msg;
        if (index === 2) return localFrame >= t.user2Msg;
        if (index === 3) return localFrame >= t.bot2Msg;
        return false;
    });

    const showBotTyping1 = localFrame >= t.bot1Typing && localFrame < t.bot1Msg;
    const showUserTyping2 = localFrame >= t.user2Typing && localFrame < t.user2Msg;
    const showBotTyping2 = localFrame >= t.bot2Typing && localFrame < t.bot2Msg;

    const isUserTyping = showUserTyping2;
    const isBotTyping = showBotTyping1 || showBotTyping2;
    const typingSide: "user" | "bot" | null = isUserTyping ? "user" : isBotTyping ? "bot" : null;

    return (
        <div
            className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <div className="h-14" /> {/* Dynamic Island Spacer */}

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0f1823]/80 backdrop-blur-md sticky top-0 z-10">
                <div
                    className="w-8 h-8 rounded-full"
                    style={{
                        background: "linear-gradient(135deg, #D32F2F 0%, #FF5252 100%)",
                    }}
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">LOTO Assistant</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Connecté (Sécurisé)
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-4">
                {visibleMessages.map((msg, index) => {
                    let appearFrame = 0;
                    if (index === 0) appearFrame = t.user1Msg;
                    if (index === 1) appearFrame = t.bot1Msg;
                    if (index === 2) appearFrame = t.user2Msg;
                    if (index === 3) appearFrame = t.bot2Msg;

                    const msgLocalFrame = localFrame - appearFrame;
                    const msgProgress = spring({
                        frame: msgLocalFrame,
                        fps,
                        config: { damping: 20, stiffness: 100 },
                    });

                    const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);
                    const msgX = interpolate(
                        msgProgress,
                        [0, 1],
                        [msg.type === "user" ? 30 : -30, 0]
                    );

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                            style={{
                                opacity: msgOpacity,
                                transform: `translateX(${msgX}px)`,
                            }}
                        >
                            <div
                                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.type === "user"
                                    ? "bg-[#D32F2F] rounded-2xl rounded-tr-sm" // Red for User (Report)
                                    : msg.isAlert
                                        ? "bg-[#1e2a39] border border-[#f59e0b]/40 rounded-2xl rounded-tl-sm ring-1 ring-[#f59e0b]/20"
                                        : "bg-[#1e2a39] rounded-2xl rounded-tl-sm"
                                    }`}
                            >
                                {msg.isAlert && (
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        <span className="text-[#f59e0b] text-xs font-medium">Sécurité Requise</span>
                                    </div>
                                )}
                                <span className="text-white">
                                    {msg.text}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {typingSide && <TypingDots frame={localFrame} fps={fps} side={typingSide} />}
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#0f1823]">
                <div className="flex items-center gap-2 bg-[#1e2a39] rounded-full px-4 py-2.5 border border-white/5">
                    <div className="flex-1 text-sm text-white flex items-center h-5">
                        <span className="text-white/40">Décrivez l'anomalie...</span>
                    </div>
                    <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                        {/* Mic Icon */}
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D32F2F] text-white">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
