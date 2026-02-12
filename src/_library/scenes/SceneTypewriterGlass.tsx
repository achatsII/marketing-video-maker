import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
    Easing,
} from "remotion";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";
import { GhostCursor } from "@/_core/components/remotion/GhostCursor";
import { RemotionButton } from "@/_core/components/remotion/Button";
import { RemotionPlaceholdersInputGlass } from "@/_core/components/remotion/PlaceholdersInputGlass";
import { ShineBorder } from "@/_core/components/remotion/ShineBorder";

/**
 * SceneTypewriterGlass - 200 frames (~6.7s @ 30fps)
 *
 * Timeline:
 *   0-30   : Input field (glassmorphism) appear centered with spring entry
 *   31-45  : Smooth zoom (scale 3.5) onto the top-left corner of the field
 *   45-120 : Typewriter animation (10 words), camera follows the text cursor
 *   121-150: Progressive dezoom back to initial view
 *   151-172: Ghost cursor rises from bottom, clicks the "Envoyer" button
 *   172-195: ShineBorder flash + slide up + fade out exit
 */

const TEXT =
    "Comment améliorer le partage de savoir au sein de l'équipe ?";
const FRAMES_PER_CHAR = 1;
const TYPING_START = 45;

// Layout constants (1920×1080)
const SCREEN_CX = 960;
const SCREEN_CY = 540;
const INPUT_W = 900;
const INPUT_H = 72;
const INPUT_LEFT = (1920 - INPUT_W) / 2;
const INPUT_TOP = (1080 - INPUT_H) / 2;

const TEXT_PADDING_LEFT = 28;
const BUTTON_AREA_W = 70;
const CHAR_WIDTH = 9.6; // approx for Inter 18px

const TEXT_START_X = INPUT_LEFT + TEXT_PADDING_LEFT;
const TEXT_Y = INPUT_TOP + INPUT_H / 2;
const TEXT_END_X = Math.min(
    TEXT_START_X + TEXT.length * CHAR_WIDTH,
    INPUT_LEFT + INPUT_W - BUTTON_AREA_W - 16
);

// Button center (logical coordinates)
const BUTTON_CENTER_X = INPUT_LEFT + INPUT_W - BUTTON_AREA_W / 2 - 8;
const BUTTON_CENTER_Y = INPUT_TOP + INPUT_H / 2;

// Visual button position on screen at zoom 1.4x (for ghost cursor targeting)
const ZOOM_FINAL = 1.4;
const VISUAL_BTN_X =
    SCREEN_CX + (BUTTON_CENTER_X - SCREEN_CX) * ZOOM_FINAL;
const VISUAL_BTN_Y =
    SCREEN_CY + (BUTTON_CENTER_Y - SCREEN_CY) * ZOOM_FINAL;

export const SceneTypewriterGlass: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── PHASE 1: Spring entry (0-30) ───────────────────────────
    const entryScale = spring({
        frame,
        fps,
        config: { damping: 200, stiffness: 100 },
    });

    const entryOpacity = interpolate(frame, [0, 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // ─── CAMERA ZOOM ────────────────────────────────────────────
    const zoomIn = interpolate(frame, [30, 45], [1, 3.5], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
    });

    const zoomOut = interpolate(frame, [120, 150], [3.5, 1.4], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
    });

    const zoom = frame <= 120 ? zoomIn : zoomOut;

    // ─── FOCAL POINT (camera target) ───────────────────────────
    let focalX: number;
    let focalY: number;

    if (frame < 31) {
        focalX = SCREEN_CX;
        focalY = SCREEN_CY;
    } else if (frame < 45) {
        focalX = interpolate(frame, [30, 45], [SCREEN_CX, TEXT_START_X], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        });
        focalY = interpolate(frame, [30, 45], [SCREEN_CY, TEXT_Y], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        });
    } else if (frame <= 120) {
        const elapsed = Math.max(0, frame - TYPING_START);
        const currentChars = Math.min(
            Math.floor(elapsed / FRAMES_PER_CHAR),
            TEXT.length
        );
        focalX = Math.min(TEXT_START_X + currentChars * CHAR_WIDTH, TEXT_END_X);
        focalY = TEXT_Y;
    } else if (frame <= 150) {
        focalX = interpolate(frame, [120, 150], [TEXT_END_X, SCREEN_CX], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
        });
        focalY = interpolate(frame, [120, 150], [TEXT_Y, SCREEN_CY], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.inOut(Easing.cubic),
        });
    } else {
        focalX = SCREEN_CX;
        focalY = SCREEN_CY;
    }

    // ─── PHASE 5: Ghost cursor (151-180) ───────────────────────
    const cursorKeyframes = [
        { frame: 151, x: VISUAL_BTN_X + 100, y: 1080 + 50 },
        { frame: 167, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
        { frame: 172, x: VISUAL_BTN_X, y: VISUAL_BTN_Y, click: true },
        { frame: 185, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
    ];

    // Button scale-down/up on click
    const buttonScale =
        frame >= 170 && frame <= 176
            ? interpolate(frame, [170, 172, 175], [1, 0.88, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            })
            : 1;

    // ─── PHASE 6: ShineBorder + exit after click (172-195) ─────
    const CLICK_FRAME = 172;
    const EXIT_START = 185;
    const EXIT_END = 200;
    const showShine = frame >= CLICK_FRAME && frame < EXIT_START;
    const isExiting = frame >= EXIT_START;
    const exitOpacity = isExiting
        ? interpolate(frame, [EXIT_START, EXIT_END], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 1;
    const exitY = isExiting
        ? interpolate(frame, [EXIT_START, EXIT_END], [0, -60], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 0;

    // Show typing vs placeholder
    const showTyping = frame >= TYPING_START;

    return (
        <AbsoluteFill>
            {/* Camera wrapper */}
            <AbsoluteFill
                style={{
                    transformOrigin: `${focalX}px ${focalY}px`,
                    transform: `scale(${frame < 31 ? 1 : zoom})`,
                }}
            >
                {/* Input field wrapper — borderRadius here so ShineBorder inherits */}
                <div
                    style={{
                        position: "absolute",
                        left: INPUT_LEFT,
                        top: INPUT_TOP,
                        width: INPUT_W,
                        height: INPUT_H,
                        borderRadius: 48, // Reduced to match height/2 for capsule shape
                        transform: `scale(${entryScale}) translateY(${exitY}px)`,
                        opacity: entryOpacity * exitOpacity,
                        transformOrigin: "center center",
                    }}
                >
                    <RemotionPlaceholdersInputGlass
                        placeholder="Posez votre question..."
                        className="text-lg"
                        style={{
                            height: INPUT_H,
                            // Removed manual glassmorphism styles as they are handled by PlaceholdersInputGlass
                            paddingLeft: 0, // Padding handled inside Glass
                            paddingRight: 0,
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        }}
                        rightElement={
                            <RemotionButton
                                variant="default"
                                size="icon"
                                style={{
                                    transform: `scale(${buttonScale})`,
                                    borderRadius: 9999,
                                    width: 48,
                                    height: 48,
                                    marginRight: 8, // Add margin since padding was removed from container
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </RemotionButton>
                        }
                    >
                        {showTyping ? (
                            <TypingAnimation
                                text={TEXT}
                                startFrame={TYPING_START}
                                framesPerChar={FRAMES_PER_CHAR}
                                showCursor
                                className="text-white text-lg"
                            />
                        ) : undefined}
                    </RemotionPlaceholdersInputGlass>

                    {/* ShineBorder — appears on click, visible during exit */}
                    {showShine && (
                        <ShineBorder
                            borderWidth={2}
                            duration={3}
                            shineColor={["#0078FF", "#00D4FF", "#0078FF"]}
                            style={{ borderRadius: 48 }}
                        />
                    )}
                </div>
            </AbsoluteFill>

            {/* Ghost cursor — rendered outside camera so it isn't affected by zoom */}
            <GhostCursor keyframes={cursorKeyframes} color="black" size={42} />
        </AbsoluteFill>
    );
};
