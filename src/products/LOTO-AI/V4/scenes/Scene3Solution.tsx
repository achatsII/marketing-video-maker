import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Sequence
} from "remotion";
import { TypingAnimation } from "@/_core/components/remotion/TypingAnimation";
import { GhostCursor } from "@/_core/components/remotion/GhostCursor";
import { RemotionButton } from "@/_core/components/remotion/Button";
import { RemotionPlaceholdersInput } from "@/_core/components/remotion/PlaceholdersInput";
import { ShineBorder } from "@/_core/components/remotion/ShineBorder";
import { TextGenerateEffect } from "@/_core/components/remotion/TextGenerateEffect";

/**
 * Scene3Solution
 * Customized for LOTO-AI: "Générer procédure LOTO pompe hydraulique..."
 */

const TEXT = "Générer procédure LOTO pompe hydraulique...";
const FRAMES_PER_CHAR = 2; // Faster typing
const TYPING_START = 45;

const TYPING_END = TYPING_START + TEXT.length * FRAMES_PER_CHAR; // 45 + 43*2 = 131

// Layout constants (1920×1080)
const SCREEN_CX = 960;
const SCREEN_CY = 540;
const INPUT_W = 900;
const INPUT_H = 72;
const INPUT_LEFT = (1920 - INPUT_W) / 2;
const INPUT_TOP = (1080 - INPUT_H) / 2;

const TEXT_PADDING_LEFT = 28;
const BUTTON_AREA_W = 70;
const CHAR_WIDTH = 9.6;

const TEXT_START_X = INPUT_LEFT + TEXT_PADDING_LEFT;
const TEXT_Y = INPUT_TOP + INPUT_H / 2;
const TEXT_END_X = Math.min(
  TEXT_START_X + TEXT.length * CHAR_WIDTH,
  INPUT_LEFT + INPUT_W - BUTTON_AREA_W - 16
);

const BUTTON_CENTER_X = INPUT_LEFT + INPUT_W - BUTTON_AREA_W / 2 - 8;
const BUTTON_CENTER_Y = INPUT_TOP + INPUT_H / 2;

const ZOOM_FINAL = 1.4;
const VISUAL_BTN_X = SCREEN_CX + (BUTTON_CENTER_X - SCREEN_CX) * ZOOM_FINAL;
const VISUAL_BTN_Y = SCREEN_CY + (BUTTON_CENTER_Y - SCREEN_CY) * ZOOM_FINAL;

const DEZOOM_START = TYPING_END + 15;
const DEZOOM_END = DEZOOM_START + 30;
const CURSOR_START = DEZOOM_END + 1;
const CURSOR_ARRIVE = CURSOR_START + 20;
const CLICK_FRAME = CURSOR_ARRIVE + 5;
const EXIT_START = CLICK_FRAME + 15;
const EXIT_END = EXIT_START + 15; // Fade out UI

export const Scene3Solution: React.FC = () => {
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

  const zoomOut = interpolate(frame, [TYPING_END, DEZOOM_END], [3.5, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const zoom = frame <= TYPING_END ? zoomIn : zoomOut;

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
  } else if (frame <= TYPING_END) {
    const elapsed = Math.max(0, frame - TYPING_START);
    const smoothProgress = Math.min(elapsed / FRAMES_PER_CHAR, TEXT.length);
    focalX = Math.min(TEXT_START_X + smoothProgress * CHAR_WIDTH, TEXT_END_X);
    focalY = TEXT_Y;
  } else if (frame <= DEZOOM_END) {
    focalX = interpolate(frame, [TYPING_END, DEZOOM_END], [TEXT_END_X, SCREEN_CX], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
    focalY = interpolate(frame, [TYPING_END, DEZOOM_END], [TEXT_Y, SCREEN_CY], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
  } else {
    focalX = SCREEN_CX;
    focalY = SCREEN_CY;
  }

  // ─── PHASE 5: Ghost cursor ─────────────────────────────────
  const cursorKeyframes = [
    { frame: CURSOR_START, x: VISUAL_BTN_X + 100, y: 1080 + 50 },
    { frame: CURSOR_ARRIVE, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
    { frame: CLICK_FRAME, x: VISUAL_BTN_X, y: VISUAL_BTN_Y, click: true },
    { frame: EXIT_START, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
  ];

  // Button scale-down/up on click
  const buttonScale =
    frame >= CLICK_FRAME - 2 && frame <= CLICK_FRAME + 3
      ? interpolate(frame, [CLICK_FRAME - 2, CLICK_FRAME, CLICK_FRAME + 3], [1, 0.88, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
      : 1;

  // ─── PHASE 6: ShineBorder + exit after click ───────────────
  const showShine = frame >= CLICK_FRAME && frame < EXIT_START + 10;
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

  const showTyping = frame >= TYPING_START;

  // Reveal Text "Sherlock Holmes Industriel"
  const revealStart = CLICK_FRAME + 10;
  const showReveal = frame >= revealStart;

  return (
    <AbsoluteFill>
      {/* Camera wrapper */}
      <AbsoluteFill
        style={{
          transformOrigin: `${focalX}px ${focalY}px`,
          transform: `scale(${frame < 31 ? 1 : zoom})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: INPUT_LEFT,
            top: INPUT_TOP,
            width: INPUT_W,
            borderRadius: 9999,
            transform: `scale(${entryScale}) translateY(${exitY}px)`,
            opacity: entryOpacity * exitOpacity,
            transformOrigin: "center center",
          }}
        >
          <RemotionPlaceholdersInput
            placeholder="Intervention..."
            className="text-lg"
            style={{
              borderRadius: 9999,
              height: INPUT_H,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              paddingLeft: 28,
              paddingRight: 10,
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
          </RemotionPlaceholdersInput>

          {showShine && (
            <ShineBorder
              borderWidth={2}
              duration={3}
              shineColor={["#D32F2F", "#FF5722", "#D32F2F"]}
            />
          )}
        </div>
      </AbsoluteFill>

      {/* Ghost cursor */}
      <GhostCursor keyframes={cursorKeyframes} color="white" size={42} />

      {/* REVEAL TEXT */}
      {showReveal && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', top: 50 }}>
          <Sequence from={revealStart}>
            <TextGenerateEffect
              words="LOTO-AI: Le Sherlock Holmes Industriel"
              className="text-7xl font-bold text-center text-white"
              highlightWord="Sherlock"
              highlightColor="#D32F2F"
            />
          </Sequence>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};