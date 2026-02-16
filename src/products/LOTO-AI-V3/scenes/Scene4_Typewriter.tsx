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
import { RemotionPlaceholdersInput } from "@/_core/components/remotion/PlaceholdersInput";
import { ShineBorder } from "@/_core/components/remotion/ShineBorder";
import { LotoAiV3Constants } from "../constants";

const TEXT = "Générer procédure #402 (Presse Hydraulique)...";

// ... constants adjusted from template ...
const FRAMES_PER_CHAR = 1.5; // Slightly faster
const TYPING_START = 45;
const TYPING_END = TYPING_START + TEXT.length * FRAMES_PER_CHAR; // approx 45 + 46*1.5 = 114

const SCREEN_CX = 960;
const SCREEN_CY = 540;
const INPUT_W = 1000; // Wider for longer text
const INPUT_H = 80;
const INPUT_LEFT = (1920 - INPUT_W) / 2;
const INPUT_TOP = (1080 - INPUT_H) / 2;
const CHAR_WIDTH = 9.6;
const TEXT_START_X = INPUT_LEFT + 28;
const TEXT_Y = INPUT_TOP + INPUT_H / 2;
const TEXT_END_X = Math.min(
    TEXT_START_X + TEXT.length * CHAR_WIDTH,
    INPUT_LEFT + INPUT_W - 80 // Button area
);
const BUTTON_CENTER_X = INPUT_LEFT + INPUT_W - 35 - 8;
const BUTTON_CENTER_Y = INPUT_TOP + INPUT_H / 2;
const ZOOM_FINAL = 1.4;
const VISUAL_BTN_X = SCREEN_CX + (BUTTON_CENTER_X - SCREEN_CX) * ZOOM_FINAL;
const VISUAL_BTN_Y = SCREEN_CY + (BUTTON_CENTER_Y - SCREEN_CY) * ZOOM_FINAL;

const DEZOOM_START = TYPING_END + 10;
const DEZOOM_END = DEZOOM_START + 30;
const CURSOR_START = DEZOOM_END + 1;
const CURSOR_ARRIVE = CURSOR_START + 20;
const CLICK_FRAME = CURSOR_ARRIVE + 5;
const EXIT_START = CLICK_FRAME + 15;
const EXIT_END = EXIT_START + 20;

export const Scene4_Typewriter: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entry
    const entryScale = spring({ frame, fps, config: { damping: 200, stiffness: 100 } });
    const entryOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

    // Zoom Logic
    const zoomIn = interpolate(frame, [30, 45], [1, 3.5], {
        extrapolateRight: "clamp", easing: Easing.out(Easing.cubic),
    });
    const zoomOut = interpolate(frame, [DEZOOM_START, DEZOOM_END], [3.5, 1.4], {
        extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic),
    });
    const zoom = frame <= DEZOOM_START ? zoomIn : zoomOut;

    // Focal Point Logic
    let focalX = SCREEN_CX;
    let focalY = SCREEN_CY;

    if (frame >= 30 && frame < 45) {
        focalX = interpolate(frame, [30, 45], [SCREEN_CX, TEXT_START_X], { easing: Easing.out(Easing.cubic) });
        focalY = interpolate(frame, [30, 45], [SCREEN_CY, TEXT_Y], { easing: Easing.out(Easing.cubic) });
    } else if (frame >= 45 && frame <= TYPING_END) {
        const elapsed = frame - TYPING_START;
        const smoothProgress = Math.min(elapsed / FRAMES_PER_CHAR, TEXT.length);
        focalX = Math.min(TEXT_START_X + smoothProgress * CHAR_WIDTH, TEXT_END_X);
        focalY = TEXT_Y;
    } else if (frame > TYPING_END && frame <= DEZOOM_END) { // Hold then Dezoom
        // Hold position until dezoom starts, then interpolate back
        if (frame > DEZOOM_START) {
            focalX = interpolate(frame, [DEZOOM_START, DEZOOM_END], [TEXT_END_X, SCREEN_CX], { easing: Easing.inOut(Easing.cubic) });
            focalY = interpolate(frame, [DEZOOM_START, DEZOOM_END], [TEXT_Y, SCREEN_CY], { easing: Easing.inOut(Easing.cubic) });
        } else {
            focalX = TEXT_END_X;
            focalY = TEXT_Y;
        }
    }

    // Ghost Cursor
    const cursorKeyframes = [
        { frame: CURSOR_START, x: VISUAL_BTN_X + 150, y: 1080 + 50 },
        { frame: CURSOR_ARRIVE, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
        { frame: CLICK_FRAME, x: VISUAL_BTN_X, y: VISUAL_BTN_Y, click: true },
        { frame: EXIT_START, x: VISUAL_BTN_X, y: VISUAL_BTN_Y },
    ];

    const buttonScale = frame >= CLICK_FRAME - 2 && frame <= CLICK_FRAME + 3
        ? interpolate(frame, [CLICK_FRAME - 2, CLICK_FRAME, CLICK_FRAME + 3], [1, 0.88, 1]) : 1;

    const showShine = frame >= CLICK_FRAME && frame < EXIT_START;
    const isExiting = frame >= EXIT_START;
    const exitOpacity = isExiting ? interpolate(frame, [EXIT_START, EXIT_END], [1, 0]) : 1;
    const exitY = isExiting ? interpolate(frame, [EXIT_START, EXIT_END], [0, -60]) : 0;
    const showTyping = frame >= TYPING_START;

    return (
        <AbsoluteFill>
            <AbsoluteFill
                style={{
                    transformOrigin: `${focalX}px ${focalY}px`,
                    transform: `scale(${frame < 30 ? 1 : zoom})`,
                }}
            >
                <div
                    style={{
                        position: "absolute", left: INPUT_LEFT, top: INPUT_TOP, width: INPUT_W,
                        borderRadius: 9999,
                        transform: `scale(${entryScale}) translateY(${exitY}px)`,
                        opacity: entryOpacity * exitOpacity,
                        transformOrigin: "center center",
                    }}
                >
                    <RemotionPlaceholdersInput
                        placeholder="Que voulez-vous générer ?"
                        className="text-2xl" // Increased text size
                        style={{
                            borderRadius: 9999, height: INPUT_H,
                            backgroundColor: "rgba(15, 23, 42, 0.6)", // Darker Slate
                            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            paddingLeft: 32, paddingRight: 10,
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
                            color: 'white',
                            fontFamily: LotoAiV3Constants.FONT_FAMILY,
                        }}
                        rightElement={
                            <RemotionButton
                                variant="default" size="icon"
                                style={{
                                    transform: `scale(${buttonScale})`, borderRadius: 9999,
                                    width: 56, height: 56,
                                    backgroundColor: LotoAiV3Constants.COLOR_PRIMARY, // Brand Red
                                    color: 'white'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
                            </RemotionButton>
                        }
                    >
                        {showTyping && (
                            <TypingAnimation
                                text={TEXT}
                                startFrame={TYPING_START}
                                framesPerChar={FRAMES_PER_CHAR}
                                showCursor
                                className="text-white text-2xl"
                            />
                        )}
                    </RemotionPlaceholdersInput>

                    {showShine && (
                        <ShineBorder borderWidth={2} duration={3} shineColor={[LotoAiV3Constants.COLOR_SECONDARY, "#fff", LotoAiV3Constants.COLOR_SECONDARY]} />
                    )}
                </div>
            </AbsoluteFill>
            <GhostCursor keyframes={cursorKeyframes} color="white" size={42} />
        </AbsoluteFill>
    );
};
