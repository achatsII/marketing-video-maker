import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from "remotion";
import { FadeText } from "../components/FadeText";

// ── Message data ────────────────────────────────────────────────
interface Message {
    id: number;
    text: string;
    category: "rh" | "tech" | "ventes" | "expertise";
}

const MESSAGES: Message[] = [
    {
        id: 0,
        text: "Quelle est la politique exacte pour le remboursement des frais de télétravail cette année ?",
        category: "rh",
    },
    {
        id: 1,
        text: "Quelle est la procédure pour réinitialiser le serveur de production après une panne ?",
        category: "tech",
    },
    {
        id: 2,
        text: "Pour le Client X, est-ce qu'on offre un support 24/7 ou seulement durant les heures de bureau ?",
        category: "ventes",
    },
    {
        id: 3,
        text: "Qui est la personne responsable de valider les contrats de sous-traitance en Europe ?",
        category: "expertise",
    },
    {
        id: 4,
        text: "Comment dois-je déclarer un incident de harcèlement de manière anonyme ?",
        category: "rh",
    },
    {
        id: 5,
        text: "Quel type d'huile spécifique doit-on utiliser pour la maintenance de la machine CNC-402 ?",
        category: "tech",
    },
    {
        id: 6,
        text: "Quelles étaient les objections principales lors de la dernière présentation pour le projet Alpha ?",
        category: "ventes",
    },
    {
        id: 7,
        text: "Comment a-t-on résolu le problème de compatibilité avec l'API de Google l'an dernier ?",
        category: "expertise",
    },
    {
        id: 8,
        text: "Est-ce que j'ai droit à des jours de congé mobiles si je suis encore en période d'essai ?",
        category: "rh",
    },
    {
        id: 9,
        text: "Quels sont les arguments clés pour différencier notre produit de celui de notre concurrent ?",
        category: "expertise",
    },
];

// ── Category colors ─────────────────────────────────────────────
const CATEGORY_STYLES: Record<
    Message["category"],
    { bg: string; shadow: string }
> = {
    rh: {
        bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        shadow: "0 8px 32px rgba(102,126,234,0.35)",
    },
    tech: {
        bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        shadow: "0 8px 32px rgba(245,87,108,0.35)",
    },
    ventes: {
        bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        shadow: "0 8px 32px rgba(79,172,254,0.35)",
    },
    expertise: {
        bg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        shadow: "0 8px 32px rgba(67,233,123,0.35)",
    },
};

// ── Pseudo-random (deterministic per bubble) ────────────────────
function seededRandom(seed: number): number {
    const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
}

// ── Bubble layout ───────────────────────────────────────────────
interface BubbleConfig {
    msg: Message;
    x: number;
    y: number;
    depth: number;
    floatSpeed: number;
    floatAmplitude: number;
    floatPhase: number;
    entryDelay: number;
    rotation: number;
}

const FOCAL = 6;
const MAX_CAM_Z = 12;

function buildBubbles(): BubbleConfig[] {
    const duplicatedMessages = [
        ...MESSAGES,
        ...MESSAGES,
        ...MESSAGES,
    ].map((msg, index) => ({ ...msg, id: index }));

    const bubbles: BubbleConfig[] = duplicatedMessages.map((msg, i) => {
        const r1 = seededRandom(i * 3 + 1);
        const r2 = seededRandom(i * 3 + 2);
        const r3 = seededRandom(i * 3 + 3);
        const r4 = seededRandom(i * 7 + 5);
        const r5 = seededRandom(i * 11 + 7);
        const r6 = seededRandom(i * 13 + 9);

        return {
            msg,
            x: (r1 - 0.5) * 80,
            y: (r2 - 0.5) * 80,
            depth: 2 + r3 * 8, // 2 to 10
            floatSpeed: 0.3 + r4 * 0.5,
            floatAmplitude: 8 + r5 * 16,
            floatPhase: r6 * Math.PI * 2,
            entryDelay: i * 5,
            rotation: (r4 - 0.5) * 12,
        };
    });

    return bubbles;
}

const BUBBLES = buildBubbles();

function useCameraZ(delay: number = 0) {
    const frame = useCurrentFrame();

    // Matching the original timing + delay
    // Phase 1 (0 → 45): no camera movement
    // Phase 2 (45 → 105): camera rushes forward
    const zoomStart = 90 + delay;
    const zoomEnd = zoomStart + 60;

    // NOTE: Max camera Z is 12.
    const progress = interpolate(frame, [zoomStart, zoomEnd], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    return progress * MAX_CAM_Z;
}

// ── Single Bubble component ─────────────────────────────────────
const Bubble: React.FC<{
    config: BubbleConfig;
    cameraZ: number;
    bubblesDelay: number
}> = ({
    config,
    cameraZ,
    bubblesDelay,
}) => {
        const frame = useCurrentFrame();
        const { fps } = useVideoConfig();

        const entry = spring({
            frame: frame - config.entryDelay - bubblesDelay,
            fps,
            config: { damping: 14, stiffness: 100 },
        });

        if (entry <= 0.01) return null;

        const dist = config.depth - cameraZ;

        // Standard bubble culling
        if (dist <= 0.1) return null;

        const perspectiveScale = FOCAL / Math.max(0.01, dist);

        const projectedX = 50 + config.x * perspectiveScale;
        const projectedY = 50 + config.y * perspectiveScale;

        const floatY =
            Math.sin(frame * config.floatSpeed * 0.05 + config.floatPhase) *
            config.floatAmplitude;
        const floatX =
            Math.cos(frame * config.floatSpeed * 0.03 + config.floatPhase * 1.3) *
            config.floatAmplitude *
            0.5;
        const rotOsc =
            Math.sin(frame * config.floatSpeed * 0.04 + config.floatPhase * 0.7) *
            2;

        const blur = interpolate(dist, [0.3, 1.5, 5, 10], [8, 0, 0, 4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });

        const opacity = interpolate(dist, [0.2, 1, 8, 12], [0, 1, 0.6, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });

        const finalScale = perspectiveScale * entry;

        // Standard opacity
        const finalOpacity = opacity * entry;

        if (finalOpacity <= 0.01) return null;

        const catStyle = CATEGORY_STYLES[config.msg.category];
        // Z-Index Logic
        // Text is at "Text Depth" of roughly 6 (zIndex 400).
        const zIndex = Math.round(1000 - dist * 100);

        return (
            <div
                style={{
                    position: "absolute",
                    left: `${projectedX}%`,
                    top: `${projectedY}%`,
                    // Use standard width for transition bubble too, let perspective make it huge
                    width: 420,
                    padding: "18px 24px",
                    borderRadius: 20,
                    background: catStyle.bg,
                    color: "#fff",
                    fontSize: 16,
                    lineHeight: 1.45,
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    boxShadow: catStyle.shadow,
                    userSelect: "none" as const,
                    transform: `translate(-50%, -50%) scale(${finalScale}) translateY(${floatY}px) translateX(${floatX}px) rotate(${config.rotation + rotOsc}deg)`,
                    opacity: finalOpacity,
                    filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
                    zIndex,
                    pointerEvents: "none" as const,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {config.msg.text}
            </div>
        );
    };

export const SceneImmersiveBubbles: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const bubblesDelay = 60;
    const cameraZ = useCameraZ(bubblesDelay);

    // Text Animation
    const relativeBubbleFrame = frame - bubblesDelay;

    // Removed fade out logic as requested (transition bubble removed)
    // The text will stay visible or fade out naturally if needed,
    // but for now we keep it visible as the scene doesn't "end" with a bubble anymore.

    const scale = interpolate(
        frame,
        [0, durationInFrames],
        [1, 1.05],
        { extrapolateRight: "clamp" }
    );

    // Fixed Z-Index for text to sit in the "middle" of the bubbles
    const TEXT_Z_INDEX = 400;

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <AbsoluteFill style={{ transform: `scale(${scale})` }}>

                {/* Text Layer - statically placed but logically "in the middle" order-wise */}
                {/*
                    Note: To interleave, we need Bubbles and Text in same stacking context.
                    Bubbles are absolutely positioned. Text is AbsoluteFill.
                    If we put Text with zIndex 400, and Bubbles with zIndex computed,
                    they should interleave correctly if they are siblings.
                */}

                <AbsoluteFill
                    style={{
                        zIndex: TEXT_Z_INDEX,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 80,
                        // opacity: textOpacity, // Removed fade out
                    }}
                >
                    <FadeText
                        text="Et si vous mettiez fin aux questions sans réponse ?"
                        className="text-8xl font-bold text-center leading-none text-white"
                        direction="up"
                        delay={150}
                        initialDelay={300}
                        maxWordsPerLine={5}
                        auroraWords={["questions", "réponse"]}
                    />
                </AbsoluteFill>

                {/* Bubbles Layer */}
                {/*
                    We render bubbles as siblings to the text container.
                    AbsoluteFill creates a container.
                    If we just map bubbles here, they will be siblings to the Text AbsoluteFill.
                */}
                {BUBBLES.map((b) => (
                    <Bubble
                        key={b.msg.id}
                        config={b}
                        cameraZ={cameraZ}
                        bubblesDelay={bubblesDelay}
                    />
                ))}

            </AbsoluteFill>
        </AbsoluteFill>
    );
};
