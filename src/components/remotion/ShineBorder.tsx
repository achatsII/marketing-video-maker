import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

export const ShineBorder = ({
  borderWidth = 1,
  duration = 14,
  shineColor = "#0078FF",
  className,
  style,
}: {
  borderWidth?: number;
  duration?: number;
  shineColor?: string | string[];
  className?: string;
  style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = duration * fps;
  const progress = (frame % totalFrames) / totalFrames;
  const posX = progress * 300;
  const posY = progress * 300;

  const colors = Array.isArray(shineColor) ? shineColor.join(",") : shineColor;

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(transparent, transparent, ${colors}, transparent, transparent)`,
        backgroundSize: "300% 300%",
        backgroundPosition: `${posX}% ${posY}%`,
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: `${borderWidth}px`,
        ...style,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit]",
        className
      )}
    />
  );
};
