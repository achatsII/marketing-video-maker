import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

export const NeonGradientCard = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = { firstColor: "#0078FF", secondColor: "#00FFF1" },
  width = 800,
  height = 500,
}: {
  className?: string;
  children?: React.ReactNode;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: { firstColor: string; secondColor: string };
  width?: number;
  height?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 3 * fps;
  const progress = (frame % totalFrames) / totalFrames;
  const bgPos = progress * 200;

  const afterBlur = width / 3;

  return (
    <div
      className={cn("relative z-10", className)}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      <div
        className="relative size-full"
        style={{
          borderRadius: borderRadius - borderSize,
          background: "#0f1823",
          padding: 24,
        }}
      >
        {/* Neon border */}
        <div
          style={{
            position: "absolute",
            top: -borderSize,
            left: -borderSize,
            width: width + borderSize * 2,
            height: height + borderSize * 2,
            borderRadius,
            background: `linear-gradient(${bgPos}deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
            backgroundSize: "100% 200%",
            backgroundPosition: `center ${bgPos}%`,
            zIndex: -1,
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -borderSize,
            left: -borderSize,
            width: width + borderSize * 2,
            height: height + borderSize * 2,
            borderRadius,
            background: `linear-gradient(${bgPos}deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
            backgroundSize: "100% 200%",
            backgroundPosition: `center ${bgPos}%`,
            filter: `blur(${afterBlur}px)`,
            opacity: 0.5,
            zIndex: -2,
          }}
        />
        {children}
      </div>
    </div>
  );
};
