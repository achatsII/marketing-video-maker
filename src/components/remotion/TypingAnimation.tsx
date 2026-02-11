import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

export const TypingAnimation = ({
  text,
  className,
  startFrame = 0,
  framesPerChar = 3,
  showCursor = true,
}: {
  text: string;
  className?: string;
  startFrame?: number;
  framesPerChar?: number;
  showCursor?: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.min(
    Math.floor(elapsed / framesPerChar),
    text.length
  );
  const displayedText = text.slice(0, charsToShow);
  const isTyping = charsToShow < text.length && elapsed > 0;

  // Blink cursor when not typing
  const blinkCycle = (frame % (fps / 2)) / (fps / 2);
  const cursorOpacity = isTyping ? 1 : blinkCycle < 0.5 ? 1 : 0;

  return (
    <span className={cn("leading-tight tracking-tight", className)}>
      {displayedText}
      {showCursor && elapsed > 0 && (
        <span style={{ opacity: cursorOpacity }}>|</span>
      )}
    </span>
  );
};
