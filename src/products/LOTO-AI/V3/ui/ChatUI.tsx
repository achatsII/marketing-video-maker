import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { LotoAiV3Constants } from "../constants";

interface ChatMessage {
    id: string;
    type: "user" | "bot";
    text: string;
    isAlert?: boolean;
}

interface ChatUIProps {
    startFrame?: number;
    className?: string;
}

export const CHAT_TIMINGS = {
    user1Msg: 0,
    bot1Typing: 15,
    bot1Msg: 35,
    user2Typing: 70,
    user2Msg: 90,
    bot2Typing: 110,
    bot2Msg: 130,
    exitStart: 170,
};

export const CHAT_MESSAGES: ChatMessage[] = [
    {
        id: "1",
        type: "user",
        text: "Vanne principale bloquée. Photo ajoutée.",
    },
    {
        id: "2",
        type: "bot",
        text: "Noté. Photos ajoutées au dossier #402.",
        isAlert: false,
    },
    {
        id: "3",
        type: "user",
        text: "Je vérifie les autres points de coupure.",
    },
    {
        id: "4",
        type: "bot",
        text: "Attention : N'oublie pas le disjoncteur secondaire (Zone B).",
        isAlert: true,
    },
];

// ... Icons ...
const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
);
const CameraIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
);


const TypingDots: React.FC<{ frame: number; fps: number; side: "user" | "bot" }> = ({ frame, fps, side }) => (
    <div className={`flex ${side === "user" ? "justify-end" : "justify-start"}`}>
        <div
            className={`px-4 py-3 rounded-2xl flex gap-1 items-center h-10 ${side === "user"
                ? "bg-red-600/60 rounded-tr-sm"
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

    const visibleMessages = CHAT_MESSAGES.filter((_, index) => {
        if (index === 0) return localFrame >= t.user1Msg;
        if (index === 1) return localFrame >= t.bot1Msg;
        if (index === 2) return localFrame >= t.user2Msg;
        if (index === 3) return localFrame >= t.bot2Msg;
        return false;
    });

    // Typing logic
    const showBotTyping1 = localFrame >= t.bot1Typing && localFrame < t.bot1Msg;
    const showUserTyping2 = localFrame >= t.user2Typing && localFrame < t.user2Msg;
    const showBotTyping2 = localFrame >= t.bot2Typing && localFrame < t.bot2Msg;

    const isUserTyping = showUserTyping2;
    const isBotTyping = showBotTyping1 || showBotTyping2;
    const typingSide: "user" | "bot" | null = isUserTyping ? "user" : isBotTyping ? "bot" : null;

    return (
        <div
            className={`flex flex-col h-full bg-[#0f172a] text-white ${className}`}
            style={{ fontFamily: LotoAiV3Constants.FONT_FAMILY }}
        >
            {/* Dynamic Island spacer */}
            <div className="h-14" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-10">
                <BackIcon />
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                        background: LotoAiV3Constants.COLOR_PRIMARY,
                        color: 'white'
                    }}
                >
                    AI
                </div>
                <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm">LOTO-AI Assistant</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        En ligne • Dossier #402
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
                                    ? "rounded-2xl rounded-tr-sm text-white"
                                    : msg.isAlert
                                        ? "bg-[#1e2a39] border border-amber-500/50 rounded-2xl rounded-tl-sm text-amber-100" // Alert style
                                        : "bg-[#1e2a39] rounded-2xl rounded-tl-sm text-white"
                                    }`}
                                style={{
                                    backgroundColor: msg.type === "user" ? LotoAiV3Constants.COLOR_PRIMARY : undefined
                                }}
                            >
                                {msg.isAlert && (
                                    <div className="flex items-center gap-2 mb-1 pb-1 border-b border-white/10">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                        <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">Sécurité</span>
                                    </div>
                                )}
                                <span>{msg.text}</span>
                            </div>
                        </div>
                    );
                })}
                {typingSide && <TypingDots frame={localFrame} fps={fps} side={typingSide} />}
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#0f172a]">
                <div className="flex items-center gap-2 bg-[#1e2a39] rounded-full px-4 py-2.5 border border-white/5">
                    <div className="flex-1 text-sm text-white flex items-center h-5">
                        <span className="text-white/40">Décrivez le problème...</span>
                    </div>
                    <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                        <CameraIcon />
                    </div>
                </div>
            </div>
            <div className="h-4" /> {/* Home indicator spacer */}
        </div>
    );
};
