import React from "react";
import { cn } from "@/lib/utils";

/**
 * Remotion adaptation of src/components/ui/placeholders-and-vanish-input.tsx
 *
 * Changes from original:
 * - Removed all React state (useState, useEffect, useRef, useCallback)
 * - Removed canvas-based vanish animation
 * - Removed framer-motion (AnimatePresence, motion)
 * - Removed <form>/<input> interactive elements
 * - Converted to static visual component with children slot
 * - Added rightElement prop for custom submit button
 * - Applied dark theme colors directly (project is always dark-themed)
 */
export interface RemotionPlaceholdersInputProps {
  children?: React.ReactNode;
  placeholder?: string;
  rightElement?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const RemotionPlaceholdersInput: React.FC<
  RemotionPlaceholdersInputProps
> = ({ children, placeholder = "", rightElement, className, style }) => {
  return (
    <div
      className={cn(
        "w-full relative bg-zinc-800 h-12 rounded-full overflow-hidden",
        "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)]",
        className
      )}
      style={style}
    >
      <div className="flex items-center h-full pl-4 pr-2 gap-2">
        <div className="flex-1 text-white min-w-0 overflow-hidden whitespace-nowrap">
          {children || (
            <span className="text-white/40 font-normal">
              {placeholder}
            </span>
          )}
        </div>
        {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
};
