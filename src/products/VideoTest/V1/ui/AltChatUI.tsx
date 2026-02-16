import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface ChatMessage {
    id: string;
    type: "user" | "bot";
    text: string;
    showSource?: boolean;
    isEscalation?: boolean;
}

interface AltChatUIProps {
    startFrame?: number;
    className?: string;
    /** Callback to notify parent of the current scroll progress (0-1) */
    onScrollProgress?: (progress: number) => void;
}

// ─── Exported timings so scenes can sync phone position ───
export const ALT_CHAT_TIMINGS = {
    // User 1: typing dots → message
    // user1Typing: 0,
    user1Msg: 0,
    // Bot 1: typing dots → message
    bot1Typing: 5,
    bot1Msg: 15,
    // User 2: typing dots → message
    user2Typing: 80,
    user2Msg: 95,
    // Bot 2 (escalation): typing dots → message
    bot2Typing: 110,
    bot2Msg: 125,
    // Exit: phone starts leaving
    exitStart: 170,
};

export const ALT_CHAT_MESSAGES: ChatMessage[] = [
    {
        id: "1",
        type: "user",
        text: "Quels sont nos objectifs Q3 ?",
        showSource: false,
    },
    {
        id: "2",
        type: "bot",
        text: "Nos objectifs Q3 sont : augmenter l'engagement de 15%, lancer Project Phoenix et réduire les tickets support de 10%.",
        showSource: true,
    },
    {
        id: "3",
        type: "user",
        text: "Quelles sont les limitations de l'API ?",
        showSource: false,
    },
    {
        id: "4",
        type: "bot",
        text: "Information manquante, nous allons demander de l'aide à un expert.",
        isEscalation: true,
    },
];

// Icon components
const ChatIcon = ({ active }: { active?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
);

const SearchIcon = ({ active }: { active?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
);

const ExpertsIcon = ({ active }: { active?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);

const ProfileIcon = ({ active }: { active?: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "#0078FF" : "currentColor"}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

// Typing dots component
const TypingDots: React.FC<{ frame: number; fps: number; side: "user" | "bot" }> = ({ frame, fps, side }) => (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
        <div
            className={`px-4 py-3 rounded-2xl flex gap-1 items-center h-10 ${side === "user"
                ? "bg-[#0078FF]/60 rounded-tr-sm"
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

export const AltChatUI: React.FC<AltChatUIProps> = ({
    startFrame = 0,
    className = "",
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const localFrame = frame - startFrame;

    const t = ALT_CHAT_TIMINGS;
    const messages = ALT_CHAT_MESSAGES;

    // Determine which messages are visible
    const visibleMessages = messages.filter((_, index) => {
        if (index === 0) return localFrame >= t.user1Msg;
        if (index === 1) return localFrame >= t.bot1Msg;
        if (index === 2) return localFrame >= t.user2Msg;
        if (index === 3) return localFrame >= t.bot2Msg;
        return false;
    });

    // Determine typing dots state
    //const showUserTyping1 = localFrame >= t.user1Typing && localFrame < t.user1Msg;
    const showBotTyping1 = localFrame >= t.bot1Typing && localFrame < t.bot1Msg;
    const showUserTyping2 = localFrame >= t.user2Typing && localFrame < t.user2Msg;
    const showBotTyping2 = localFrame >= t.bot2Typing && localFrame < t.bot2Msg;

    // Current typing indicator
    const isUserTyping = /*showUserTyping1 ||*/ showUserTyping2;
    const isBotTyping = showBotTyping1 || showBotTyping2;
    const typingSide: "user" | "bot" | null = isUserTyping ? "user" : isBotTyping ? "bot" : null;

    return (
        <div
            className={`flex flex-col h-full bg-[#0f1823] text-white ${className}`}
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* Dynamic Island spacer */}
            <div className="h-14" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0f1823]/80 backdrop-blur-md sticky top-0 z-10">
                <div
                    className="w-8 h-8 rounded-full"
                    style={{
                        background: "linear-gradient(135deg, #0078FF 0%, #00D4FF 100%)",
                    }}
                />
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">AI Assistant</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        En ligne
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
                                    ? "bg-[#0078FF] rounded-2xl rounded-tr-sm"
                                    : msg.isEscalation
                                        ? "bg-[#1e2a39] border border-[#f59e0b]/40 rounded-2xl rounded-tl-sm"
                                        : "bg-[#1e2a39] rounded-2xl rounded-tl-sm"
                                    }`}
                            >
                                {msg.isEscalation && (
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                        </svg>
                                        <span className="text-[#f59e0b] text-xs font-medium">Action requise</span>
                                    </div>
                                )}
                                <span className={msg.isEscalation ? "text-white/90" : "text-white"}>
                                    {msg.text}
                                </span>

                                {msg.showSource && msg.type === "bot" && !msg.isEscalation && (
                                    <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0078FF]/10">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#0078FF">
                                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                            </svg>
                                            <span className="text-[10px] text-[#0078FF] font-medium">Source: Q&A #127</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Typing indicator (for both user and bot) */}
                {typingSide && <TypingDots frame={localFrame} fps={fps} side={typingSide} />}
            </div>

            {/* Input bar - simplified, no typing */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#0f1823]">
                <div className="flex items-center gap-2 bg-[#1e2a39] rounded-full px-4 py-2.5 border border-white/5">
                    <div className="flex-1 text-sm text-white flex items-center h-5">
                        <span className="text-white/40">Posez votre question...</span>
                    </div>
                    <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                        <button className="text-white/40 hover:text-white transition-colors">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                        </button>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2d3b4e] text-white/20">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom nav */}
            <div className="flex justify-around py-3 border-t border-white/10 pb-6 bg-[#0f1823]">
                {[
                    { Icon: ChatIcon, label: "Chat", active: true },
                    { Icon: SearchIcon, label: "Recherche", active: false },
                    { Icon: ExpertsIcon, label: "Experts", active: false },
                    { Icon: ProfileIcon, label: "Profil", active: false },
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
