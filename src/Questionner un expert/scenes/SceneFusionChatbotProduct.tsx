import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from "remotion";
import { MacbookScroll } from "../../components/remotion/MacbookScroll";
import { ChatbotUI } from "../ui/ChatbotUI";
import { Safari } from "@/components/ui/safari";
import { GhostCursor } from "../../components/remotion/GhostCursor";

export const SceneFusionChatbotProduct: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Fade out at the end
    const fadeOut = interpolate(
        frame,
        [durationInFrames - 15, durationInFrames],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Timeline:
    // 0-60: Mac opens | 65-88: cursor enters | 90: click text field
    // 93-132: typing Q2 (39 chars × 1 frame) | 135-155: cursor → send btn
    // 155: click send | 165: AI responds | 170-195: cursor exits
    const cursorKeyframes = [
        { frame: 65, x: 1950, y: 1150 },              // enter from bottom-right
        { frame: 88, x: 880, y: 720 },                // arrive at text field
        { frame: 90, x: 880, y: 720, click: true },   // click text field
        { frame: 135, x: 880, y: 720 },               // stay while typing finishes
        { frame: 155, x: 1380, y: 850, click: true }, // move to send button & click
        { frame: 195, x: 1950, y: -100 },             // exit top-right
    ];

    return (
        <AbsoluteFill style={{ opacity: fadeOut }}>


            <AbsoluteFill style={{ zIndex: 10, top: 120 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        transform: "scale(0.85)",
                    }}
                >
                    {/* By default MacbookScroll assumes a virtual width of 900px, which fits our designs */}
                    <MacbookScroll
                        showGradient={false}
                        scrollOut={true}
                    >
                        <Safari
                            url="questionner-un-expert.app"
                            mode="default"
                            style={{
                                width: "100%",
                                height: "100%",
                                aspectRatio: "none",
                                border: "none"
                            }}
                        >
                            <ChatbotUI
                                q1TypingStart={9999}
                                q1SendClick={9999}
                                q1ResponseFrame={9999}
                                q2TypingStart={93}
                                q2SendClick={155}
                                q2ResponseFrame={165}
                            />
                        </Safari>
                    </MacbookScroll>
                </div>
            </AbsoluteFill>

            {/* Cursor rendered above everything */}
            <AbsoluteFill style={{ zIndex: 50, pointerEvents: "none" }}>
                <GhostCursor keyframes={cursorKeyframes} size={48} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
