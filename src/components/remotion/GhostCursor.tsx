import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface CursorKeyframe {
  frame: number;
  x: number;
  y: number;
  click?: boolean;
}

export const GhostCursor = ({
  keyframes,
  size = 24,
  color = "black",
}: {
  keyframes: CursorKeyframe[];
  size?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (keyframes.length === 0) return null;

  const firstFrame = keyframes[0].frame;
  const lastFrame = keyframes[keyframes.length - 1].frame;

  // Hide cursor before first keyframe and after last keyframe
  if (frame < firstFrame || frame > lastFrame) return null;

  // Find current segment
  let segIndex = 0;
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame) segIndex = i;
  }

  const from = keyframes[segIndex];
  const to = keyframes[Math.min(segIndex + 1, keyframes.length - 1)];

  const segDuration = to.frame - from.frame;
  const segFrame = frame - from.frame;

  // Slower, smoother spring for more graceful movement
  const progress =
    segDuration > 0
      ? spring({
        frame: segFrame,
        fps,
        config: { damping: 40, stiffness: 60 },
        durationInFrames: segDuration,
      })
      : 1;

  // Quadratic Bézier curve with ample arcs
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curveStrength = dist * 0.55;
  const cpX = midX + (dy / (dist || 1)) * curveStrength;
  const cpY = midY - (dx / (dist || 1)) * curveStrength;

  const t = progress;
  const x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x;
  const y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y;

  // Compute rotation based on movement direction
  const tangentX = 2 * (1 - t) * (cpX - from.x) + 2 * t * (to.x - cpX);
  const tangentY = 2 * (1 - t) * (cpY - from.y) + 2 * t * (to.y - cpY);

  // When cursor is moving in this segment, use tangent angle
  // When stationary (from===to), look back at the last segment that moved to hold its final angle
  let rotationDeg = 0;
  if (dist > 1) {
    // This segment has actual movement — use live tangent
    rotationDeg = Math.atan2(tangentX, -tangentY) * (180 / Math.PI);
  } else {
    // Stationary segment — find last segment that had movement and use its arrival angle
    for (let i = segIndex - 1; i >= 0; i--) {
      const prevFrom = keyframes[i];
      const prevTo = keyframes[i + 1];
      const prevDx = prevTo.x - prevFrom.x;
      const prevDy = prevTo.y - prevFrom.y;
      const prevDist = Math.sqrt(prevDx * prevDx + prevDy * prevDy);
      if (prevDist > 1) {
        // Compute the final tangent of that previous moving segment
        const prevMidX = (prevFrom.x + prevTo.x) / 2;
        const prevMidY = (prevFrom.y + prevTo.y) / 2;
        const prevCurve = prevDist * 0.55;
        const prevCpX = prevMidX + (prevDy / prevDist) * prevCurve;
        const prevCpY = prevMidY - (prevDx / prevDist) * prevCurve;
        const ftx = 2 * (prevTo.x - prevCpX);
        const fty = 2 * (prevTo.y - prevCpY);
        rotationDeg = Math.atan2(ftx, -fty) * (180 / Math.PI);
        break;
      }
    }
  }

  // Click effect: show ripple at click keyframes
  const isClicking = to.click && segFrame >= segDuration - 5;
  const clickScale = isClicking
    ? interpolate(
      frame - (to.frame - 5),
      [0, 5, 10],
      [0, 1.5, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
    : 0;

  // Fade in from first keyframe, fade out at last keyframe
  const fadeIn = interpolate(frame, [firstFrame, firstFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [lastFrame - 10, lastFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = fadeIn * fadeOut;

  // Cursor Shrink Effect
  // Check if we are near any click keyframe (regardless of segment)
  const activeClickKeyframe = keyframes.find(k => k.click && Math.abs(frame - k.frame) <= 5);
  const cursorScale = activeClickKeyframe
    ? interpolate(frame - activeClickKeyframe.frame, [-3, 0, 3], [1, 0.75, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-25%, -10%) rotate(${rotationDeg}deg) scale(${cursorScale})`,
        transformOrigin: "25% 10%",
        zIndex: 100,
        pointerEvents: "none",
        opacity,
      }}
    >
      {/* Cursor SVG */}
      <svg
        width={size}
        height={size * 1.08}
        viewBox="0 0 50 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#ghostCursorShadow)">
          <path
            d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
            fill={color}
          />
          <path
            d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
            stroke="white"
            strokeWidth={2.25}
          />
        </g>
        <defs>
          <filter
            id="ghostCursorShadow"
            x={0.6}
            y={0.95}
            width={49.1}
            height={52.5}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={2.26} />
            <feGaussianBlur stdDeviation={2.26} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      {/* Click ripple */}
      {clickScale > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 30,
            height: 30,
            borderRadius: "50%",
            border: "2px solid rgba(0, 120, 255, 0.6)",
            transform: `translate(-30%, -30%) scale(${clickScale})`,
            opacity: interpolate(clickScale, [0, 1.5], [1, 0]),
          }}
        />
      )}
    </div>
  );
};

// Mobile tap indicator
export const TapIndicator = ({
  x,
  y,
  tapFrame,
}: {
  x: number;
  y: number;
  tapFrame: number;
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - tapFrame;

  if (localFrame < 0 || localFrame > 20) return null;

  const scale = interpolate(localFrame, [0, 5, 15, 20], [0, 1, 1.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(localFrame, [0, 5, 15, 20], [0, 0.6, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "rgba(0, 120, 255, 0.3)",
        border: "2px solid rgba(0, 120, 255, 0.5)",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        zIndex: 100,
      }}
    />
  );
};
