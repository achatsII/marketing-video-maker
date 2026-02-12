import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { cn } from "@/lib/utils";

export interface FlipWordsProps {
  words: string[];
  framesPerWord?: number;
  className?: string;
}

export const FlipWords = ({
  words,
  framesPerWord = 60,
  className,
}: FlipWordsProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate current word index
  const currentIndex = Math.min(
    Math.floor(frame / framesPerWord),
    words.length - 1
  );
  const localFrame = frame - currentIndex * framesPerWord;

  const currentWord = words[currentIndex];

  // Enter animation (spring)
  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const enterY = interpolate(enterProgress, [0, 1], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterOpacity = interpolate(enterProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterBlur = interpolate(enterProgress, [0, 1], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation (last 15 frames before word change)
  const exitStart = framesPerWord - 15;
  const isExiting = localFrame >= exitStart && currentIndex < words.length - 1;

  const exitProgress = isExiting
    ? interpolate(localFrame, [exitStart, framesPerWord], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const exitY = interpolate(exitProgress, [0, 1], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitX = interpolate(exitProgress, [0, 1], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBlur = interpolate(exitProgress, [0, 1], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Combined transforms
  const opacity = enterOpacity * exitOpacity;
  const translateY = enterY + exitY;
  const translateX = exitX;
  const scale = isExiting ? exitScale : 1;
  const blur = enterBlur + exitBlur;

  return (
    <div
      className={cn(
        "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100 px-2",
        className
      )}
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      {currentWord.split(" ").map((word, wordIndex) => {
        // Stagger animation for each word
        const wordDelay = wordIndex * 9; // ~0.3s at 30fps
        const wordLocalFrame = localFrame - wordDelay;

        const wordProgress =
          wordLocalFrame > 0
            ? spring({
                frame: wordLocalFrame,
                fps,
                config: { damping: 20, stiffness: 100 },
              })
            : 0;

        const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const wordY = interpolate(wordProgress, [0, 1], [10, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const wordBlur = interpolate(wordProgress, [0, 1], [8, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={word + wordIndex}
            className="inline-block whitespace-nowrap"
            style={{
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
              filter: `blur(${wordBlur}px)`,
            }}
          >
            {word.split("").map((letter, letterIndex) => {
              // Stagger animation for each letter
              const letterDelay = wordDelay + letterIndex * 1.5; // ~0.05s at 30fps
              const letterLocalFrame = localFrame - letterDelay;

              const letterProgress =
                letterLocalFrame > 0
                  ? spring({
                      frame: letterLocalFrame,
                      fps,
                      config: { damping: 20, stiffness: 100 },
                    })
                  : 0;

              const letterOpacity = interpolate(letterProgress, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const letterY = interpolate(letterProgress, [0, 1], [10, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <span
                  key={word + letterIndex}
                  className="inline-block"
                  style={{
                    opacity: letterOpacity,
                    transform: `translateY(${letterY}px)`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
            <span className="inline-block">&nbsp;</span>
          </span>
        );
      })}
    </div>
  );
};
