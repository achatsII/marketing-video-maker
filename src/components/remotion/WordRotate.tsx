import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { cn } from "@/lib/utils";

export const WordRotate = ({
  words,
  framesPerWord = 40,
  className,
  renderWord,
}: {
  words: string[];
  framesPerWord?: number;
  className?: string;
  renderWord?: (word: string) => React.ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentIndex = Math.min(
    Math.floor(frame / framesPerWord),
    words.length - 1
  );
  const localFrame = frame - currentIndex * framesPerWord;

  // Enter animation
  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const enterY = interpolate(enterProgress, [0, 1], [40, 0]);
  const enterOpacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Exit animation (last 10 frames of each word)
  const exitStart = framesPerWord - 10;
  const isExiting = localFrame >= exitStart && currentIndex < words.length - 1;
  const exitOpacity = isExiting
    ? interpolate(
      localFrame,
      [exitStart, framesPerWord],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
    : 1;
  const exitY = isExiting
    ? interpolate(
      localFrame,
      [exitStart, framesPerWord],
      [0, -30],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
    : 0;

  // Calculate width transition
  const prevIndex = (currentIndex - 1 + words.length) % words.length;
  const prevWord = words[prevIndex];
  const currentWord = words[currentIndex];
  // Approximate width: 0.55em per character (tuned for tighter spacing)
  const prevWidth = prevWord.length * 0.55;
  const currentWidth = currentWord.length * 0.55;

  const width = interpolate(enterProgress, [0, 1], [prevWidth, currentWidth]);

  return (
    <div
      className={cn("overflow-hidden py-2 relative inline-flex justify-start", className)}
      style={{ width: `${width}em` }}
    >
      <div
        className="absolute left-0 top-0 w-full h-full flex items-center justify-start"
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{
            opacity: enterOpacity * exitOpacity,
            transform: `translateY(${enterY + exitY}px)`,
          }}
        >
          {renderWord ? renderWord(words[currentIndex]) : words[currentIndex]}
        </div>
      </div>
    </div>
  );
};
