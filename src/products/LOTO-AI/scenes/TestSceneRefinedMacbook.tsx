import { AbsoluteFill } from "remotion";
import { RefinedMacbook } from "@/_core/components/remotion/RefinedMacbook";
import { ResponsiveSafari } from "@/_core/components/remotion/ResponsiveSafari";
import { EditorCockpitUI } from "../ui/EditorCockpitUI";

export const TestSceneRefinedMacbook: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#FFFF]">
            <RefinedMacbook src="https://assets.aceternity.com/macbook.png" showGradient={false}>
                <ResponsiveSafari
                    url="loto-ai.app/test"
                    mode="default"
                    className="dark"
                    style={{ width: "100%", height: "100%", aspectRatio: "none" }}
                >
                    <div className="w-full h-full bg-[#0f1823] flex items-center justify-center text-white overflow-hidden">
                        <EditorCockpitUI generateClickFrame={100} typingStartFrame={110} />
                    </div>
                </ResponsiveSafari>
            </RefinedMacbook>
        </AbsoluteFill>
    );
};
