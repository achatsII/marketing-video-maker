import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Animate gradient blobs using frame-driven transforms
  const cycle = (frame / durationInFrames) * 360;

  const blob1X = Math.cos((cycle * Math.PI) / 180) * 20;
  const blob1Y = Math.sin((cycle * Math.PI) / 180) * 20;
  const blob2X = Math.sin(((cycle + 90) * Math.PI) / 180) * 30;
  const blob2Y = Math.cos(((cycle + 90) * Math.PI) / 180) * 15;
  const blob3X = Math.cos(((cycle + 180) * Math.PI) / 180) * 25;
  const blob3Y = Math.sin(((cycle + 180) * Math.PI) / 180) * 25;
  const blob4X = Math.sin(((cycle + 270) * Math.PI) / 180) * 15;
  const blob4Y = Math.cos(((cycle + 270) * Math.PI) / 180) * 30;
  const blob5X = Math.cos(((cycle + 45) * Math.PI) / 180) * 20;
  const blob5Y = Math.sin(((cycle + 135) * Math.PI) / 180) * 20;

  const blobStyle = (color: string, x: number, y: number, opacity = 1) => ({
    position: "absolute" as const,
    background: `radial-gradient(circle at center, rgba(${color}, 0.8) 0, rgba(${color}, 0) 50%)`,
    mixBlendMode: blendingValue as React.CSSProperties["mixBlendMode"],
    width: size,
    height: size,
    top: `calc(50% - ${size} / 2)`,
    left: `calc(50% - ${size} / 2)`,
    transform: `translate(${x}%, ${y}%)`,
    opacity,
  });

  return (
    <div
      className={cn(
        "h-full w-full relative overflow-hidden",
        containerClassName
      )}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      <div
        className={cn("absolute inset-0 z-10", className)}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </div>
      <div className="absolute inset-0 blur-lg" style={{ filter: "blur(40px)" }}>
        <div style={blobStyle(firstColor, blob1X, blob1Y)} />
        <div style={blobStyle(secondColor, blob2X, blob2Y)} />
        <div style={blobStyle(thirdColor, blob3X, blob3Y)} />
        <div style={blobStyle(fourthColor, blob4X, blob4Y, 0.7)} />
        <div style={blobStyle(fifthColor, blob5X, blob5Y)} />
      </div>
    </div>
  );
};
