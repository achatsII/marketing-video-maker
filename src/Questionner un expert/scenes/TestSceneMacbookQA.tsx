import React from "react";
import { AbsoluteFill } from "remotion";
import { MacbookScroll } from "../../components/remotion/MacbookScroll";
import { QAListUI } from "../ui/QAListUI";
import { ResponsiveSafari } from "../../components/remotion/ResponsiveSafari";

export const TestSceneMacbookQA: React.FC = () => {
    return (
        <AbsoluteFill>

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
                    {/* 
                      TEST: MacbookScroll with ResponsiveSafari inside.
                      This ensures no distortion regardless of virtualWidth.
                    */}
                    <MacbookScroll showGradient={false} scrollOut={true} scrollOutDuration={30}>
                        <ResponsiveSafari url="knowledge-base.app" style={{ width: "100%", height: "100%", aspectRatio: "none" }}>
                            <QAListUI />
                        </ResponsiveSafari>
                    </MacbookScroll>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
