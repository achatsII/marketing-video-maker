import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

export const MovingBorder = ({
  children,
  borderRadius = "1.75rem",
  containerClassName,
  borderClassName,
  className,
  duration = 3000,
}: {
  children: React.ReactNode;
  borderRadius?: string;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  duration?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Simulate border movement along a rect path using frame
  const totalFrames = (duration / 1000) * fps;
  const progress = (frame % totalFrames) / totalFrames;

  // Move a glow along the perimeter (simplified as angle)
  const angle = progress * 360;

  return (
    <div
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {/* Rotating glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from ${angle}deg, transparent 0%, transparent 70%, #0ea5e9 85%, transparent 100%)`,
            borderRadius: `calc(${borderRadius} * 0.96)`,
          }}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </div>
  );
};
