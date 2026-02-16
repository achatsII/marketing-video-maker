import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
    spring,
    Easing,
} from "remotion";

// ── Message data ────────────────────────────────────────────────
interface Message {
    id: number;
    text: string;
    category: "admin" | "risk" | "chaos";
}

const MESSAGES: Message[] = [
    { id: 0, text: "Encore oublié l'étape 4 de la procédure...", category: "risk" },
    { id: 1, text: "Où est le permis de travail papier ?", category: "chaos" },
    { id: 2, text: "L'écriture est illisible sur cette fiche...", category: "chaos" },
    { id: 3, text: "Amende CNESST potentielle : 10 000$", category: "risk" },
    { id: 4, text: "Je dois resaisir tout ça dans Excel ce soir", category: "admin" },
    { id: 5, text: "Pas de réseau pour vérifier la norme", category: "chaos" },
    { id: 6, text: "3 heures perdues en paperasse", category: "admin" },
    { id: 7, text: "Est-ce que cette vanne est vraiment fermée ?", category: "risk" },
    { id: 8, text: "Audit de sécurité demain... on est pas prêts", category: "risk" },
    { id: 9, text: "Le fichier Excel a crashé", category: "admin" },
];

// ── Category colors ─────────────────────────────────────────────
const CATEGORY_STYLES: Record<
    Message["category"],
    { bg: string; shadow: string }
> = {
    admin: { // Purple/Blue
        bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        shadow: "0 8px 32px rgba(102,126,234,0.35)",
    },
    risk: { // Red/Orange (Critical)
        bg: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        shadow: "0 8px 32px rgba(255, 65, 108, 0.35)",
    },
    chaos: { // Grey/Dark
        bg: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        shadow: "0 8px 32px rgba(44, 62, 80, 0.35)",
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

function buildBubbles(): BubbleConfig[] {
    const duplicatedMessages = [
        ...MESSAGES,
        ...MESSAGES,
        ...MESSAGES,
    ].map((msg, index) => ({ ...msg, id: index }));

    return duplicatedMessages.map((msg, i) => {
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
            depth: 2 + r3 * 8,
            floatSpeed: 0.3 + r4 * 0.5,
            floatAmplitude: 8 + r5 * 16,
            floatPhase: r6 * Math.PI * 2,
            entryDelay: i * 5,
            rotation: (r4 - 0.5) * 12,
        };
    });
}

const BUBBLES = buildBubbles();

// ── 3D Camera ───────────────────────────────────────────────────
const FOCAL = 6;
const MAX_CAM_Z = 12;

function useCameraZ() {
    const frame = useCurrentFrame();

    const zoomStart = 90;
    const zoomEnd = zoomStart + 60;

    const progress = interpolate(frame, [zoomStart, zoomEnd], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    return progress * MAX_CAM_Z;
}

// ── Single Bubble component ─────────────────────────────────────
const Bubble: React.FC<{ config: BubbleConfig; cameraZ: number }> = ({
    config,
    cameraZ,
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entry = spring({
        frame: frame - config.entryDelay,
        fps,
        config: { damping: 14, stiffness: 100 },
    });

    if (entry <= 0.01) return null;

    const dist = config.depth - cameraZ;
    if (dist <= 0.1) return null;

    const perspectiveScale = FOCAL / dist;

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
    const finalOpacity = opacity * entry;

    if (finalOpacity <= 0.01) return null;

    const catStyle = CATEGORY_STYLES[config.msg.category];

    return (
        <div
            style={{
                position: "absolute",
                left: `${projectedX}%`,
                top: `${projectedY}%`,
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
                zIndex: Math.round(1000 - dist * 100),
                pointerEvents: "none" as const,
            }}
        >
            {config.msg.text}
        </div>
    );
};

// ── Scene ───────────────────────────────────────────────────────
export const SceneFloatingBubbles: React.FC = () => {
    const cameraZ = useCameraZ();

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            {BUBBLES.map((b) => (
                <Bubble key={b.msg.id} config={b} cameraZ={cameraZ} />
            ))}
        </AbsoluteFill>
    );
};
