import React from "react";
import { cn } from "@/lib/utils";
// @ts-ignore
import GlassSurface from "../GlassSurface";

/**
 * Remotion adaptation of src/components/ui/placeholders-and-vanish-input.tsx
 * with Glassmorphism effect based on GlassSurface component.
 */
export interface RemotionPlaceholdersInputGlassProps {
    children?: React.ReactNode;
    placeholder?: string;
    rightElement?: React.ReactNode;
    className?: string; // Container className
    style?: React.CSSProperties;
}

export const RemotionPlaceholdersInputGlass: React.FC<
    RemotionPlaceholdersInputGlassProps
> = ({ children, placeholder = "", rightElement, className, style }) => {
    return (
        <div
            className={cn(
                "w-full relative h-12 rounded-full overflow-hidden",
                className
            )}
            style={style}
        >
            <GlassSurface
                width="100%"
                height="100%"
                borderRadius={24} // Matches h-12 (48px) / 2
                borderWidth={0.05}
                opacity={0.3}
                blur={8}
                className="[&_.glass-surface__content]:p-0"
            >
                <div className="flex items-center w-full h-full pl-4 pr-2 gap-2">
                    <div className="flex-1 text-white min-w-0 overflow-hidden whitespace-nowrap">
                        {children || (
                            <span className="text-white/70 font-normal">
                                {placeholder}
                            </span>
                        )}
                    </div>
                    {rightElement && (
                        <div className="flex-shrink-0 relative z-10">{rightElement}</div>
                    )}
                </div>
            </GlassSurface>
        </div>
    );
};
