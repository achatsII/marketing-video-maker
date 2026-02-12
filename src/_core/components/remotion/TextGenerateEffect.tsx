import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  staggerFrames = 8,
  highlightWord,
  highlightColor = "#0078FF",
  startFrame = 0,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  staggerFrames?: number;
  highlightWord?: string;
  highlightColor?: string;
  startFrame?: number;
}) => {
  const currentFrame = useCurrentFrame();
  const frame = currentFrame - startFrame;
  const { fps } = useVideoConfig();
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold", className)}>
      <div className="text-white text-6xl leading-tight tracking-wide text-center">
        {wordsArray.map((word, idx) => {
          const delay = idx * staggerFrames;
          const opacity = spring({
            frame: frame - delay,
            fps,
            config: { damping: 20, stiffness: 100 },
          });

          const blur = filter
            ? interpolate(
              frame - delay,
              [0, staggerFrames],
              [10, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
            : 0;

          const isHighlight =
            highlightWord &&
            word.toLowerCase().replace(/[.,!?]/g, "") ===
            highlightWord.toLowerCase();

          return (
            <span
              key={idx}
              style={{
                opacity,
                filter: `blur(${blur}px)`,
                display: "inline-block",
                color: isHighlight ? highlightColor : "white",
                marginRight: "0.3em",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
