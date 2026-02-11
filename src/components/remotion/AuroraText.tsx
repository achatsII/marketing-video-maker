import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const AuroraText = ({
  children,
  className = "",
  colors = ["#cc00ffff", "#ff0080ff"],
  speed = 2,
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cycleDuration = (10 / speed) * fps;
  const pos = interpolate(frame % cycleDuration, [0, cycleDuration], [200, 0]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
          backgroundSize: "200% auto",
          backgroundPosition: `${pos}% 50%`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </span>
    </span>
  );
};
