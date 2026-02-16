import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface ChatMessage {
    id: string;
    type: "user" | "bot";
    text: string;
    showSource?: boolean;
    isEscalation?: boolean;
    isImage?: boolean;
}

interface ChatUIProps {
    startFrame?: number;
    className?: string;
}

export const CHAT_TIMINGS = {
    user1Msg: 0,
    bot1Typing: 10,
    bot1Msg: 30,
    user2Typing: 60,
    user2Msg: 80,
    bot2Typing: 100,
    bot2Msg: 120,
    exitStart: 180,
};

export const CHAT_MESSAGES: ChatMessage[] = [
    {
        id: "1",
        type: "user",
        text: "Fuite d'huile détectée sur la vanne 3. Besoin de cadenasser.",
        showSource: false,
    },
    {
        id: "2",
        type: "bot",
        text: "Bien reçu. J'analyse la zone 'Usine Nord'. Une photo aiderait.",
        showSource: false,
    },
    {
        id: "3",
        type: "user",
        text: "Envoi de la photo...",
        showSource: false,
        isImage: true
    },
    {
        id: "4",
        type: "bot",
        text: "Identifié: Pompe Hydraulique P-102. Voici la fiche LOTO #QA-404.",
        isEscalation: false,
        showSource: true,
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

    const isBotTyping = (localFrame >= t.bot1Typing && localFrame < t.bot1Msg) || (localFrame >= t.bot2Typing && localFrame < t.bot2Msg);
    const isUserTyping = (localFrame >= t.user2Typing && localFrame < t.user2Msg);
    const typingSide = isUserTyping ? "user" : isBotTyping ? "bot" : null;

    return (
        <div
            className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <div className="h-14" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0f1823]/80 backdrop-blur-md sticky top-0 z-10">
                <div
                    className="w-8 h-8 rounded-full"
                    style={{
                        background: "linear-gradient(135deg, #D32F2F 0%, #FF5722 100%)",
                    }}
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">LOTO Assistant</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        Connecté
                    </span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-4">
                {visibleMessages.map((msg, index) => {
                    // Timing logic
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
                    const msgX = interpolate(msgProgress, [0, 1], [msg.type === "user" ? 30 : -30, 0]);

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
                                    ? "bg-[#D32F2F] rounded-2xl rounded-tr-sm"
                                    : "bg-[#1e2a39] rounded-2xl rounded-tl-sm"
                                    }`}
                            >
                                {msg.isImage ? (
                                    <div className="flex items-center justify-center bg-black/30 w-32 h-20 rounded-lg border border-white/10">
                                        <span className="text-white/50 text-xs">[PHOTO VANNE]</span>
                                    </div>
                                ) : (
                                    <span className="text-white">
                                        {msg.text}
                                    </span>
                                )}

                                {msg.showSource && (
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#D32F2F]/10">
                                            <span className="text-[10px] text-[#D32F2F] font-medium">Source: Manuel P-102</span>
                                        </div>
                                    </div>
                                )}
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
                        <span className="text-white/40">Décrivez l'incident...</span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#D32F2F] text-white">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
