import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { cn } from "@/lib/utils";

export interface AnimatedListItemProps {
  children: React.ReactNode;
  index: number;
  startFrame: number;
  staggerFrames: number;
}

export const AnimatedListItem = ({
  children,
  index,
  startFrame,
  staggerFrames,
}: AnimatedListItemProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemStartFrame = startFrame + index * staggerFrames;
  const localFrame = frame - itemStartFrame;

  // Don't render if not yet visible
  if (localFrame < 0) return null;

  // Spring animation for scale and opacity
  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 40, stiffness: 350 },
  });

  const scale = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "center top",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
};

export interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  startFrame?: number;
  staggerFrames?: number;
  reverse?: boolean;
}

export const AnimatedList = ({
  children,
  className,
  startFrame = 0,
  staggerFrames = 15,
  reverse = true,
}: AnimatedListProps) => {
  const childrenArray = React.Children.toArray(children);

  // Optionally reverse to show newest first (like notifications)
  const orderedChildren = reverse ? [...childrenArray].reverse() : childrenArray;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {orderedChildren.map((child, index) => (
        <AnimatedListItem
          key={(child as React.ReactElement).key ?? index}
          index={index}
          startFrame={startFrame}
          staggerFrames={staggerFrames}
        >
          {child}
        </AnimatedListItem>
      ))}
    </div>
  );
};
