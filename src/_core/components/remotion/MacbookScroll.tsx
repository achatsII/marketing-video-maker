import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  Easing,
} from "remotion";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from "@tabler/icons-react";

// ─── Main component ────────────────────────────────────────────────
// ─── Main component ────────────────────────────────────────────────
export const MacbookScroll: React.FC<{
  src?: string;
  showGradient?: boolean;
  title?: React.ReactNode;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  scrollOut?: boolean; // New prop to control exit animation
  scrollOutStartFrame?: number;
  scrollOutDuration?: number;
  virtualWidth?: number; // New prop for generic scaling
}> = ({
  src,
  showGradient,
  title,
  badge,
  children,
  scrollOut = true,
  scrollOutStartFrame,
  scrollOutDuration = 30,
  virtualWidth = 900, // Default virtual width if not specified
}) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // Screen dimensions constants
    const SCREEN_WIDTH = 512;
    const SCREEN_HEIGHT = 384;

    // Calculate scaling
    const scale = SCREEN_WIDTH / virtualWidth;
    const virtualHeight = SCREEN_HEIGHT / scale;

    // If start frame is not provided, we calculate it so the animation ENDS exactly at the end of the sequence
    // (or slightly before/after depending on preference, here we align end of anim with end of scene)
    const actualStartFrame = scrollOutStartFrame ?? (durationInFrames - scrollOutDuration);

    // Phase 1 (frames 0-30): MacBook enters from bottom
    const enterProgress = spring({ frame, fps, config: { damping: 200 } });
    const enterY = interpolate(enterProgress, [0, 1], [600, 0]);

    // Phase 2 (frames 10-60): Lid opens
    const progress = interpolate(frame, [10, 60], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    });

    const scaleX = interpolate(progress, [0, 1], [1.2, 1.5]);
    const scaleY = interpolate(progress, [0, 1], [0.6, 1.5]);
    const rotate = interpolate(frame, [10, 12, 60], [-28, -28, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Phase 3: Whole MacBook scrolls up and fully out of view
    // Only applied if scrollOut is true
    const scrollUp = scrollOut
      ? interpolate(
        frame,
        [actualStartFrame, actualStartFrame + scrollOutDuration],
        [0, -1800],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.inOut(Easing.quad),
        }
      )
      : 0;

    // Global scale: bigger MacBook (1.4x)
    const globalScale = 1.4;

    return (
      <div
        style={{
          transform: `translateY(${enterY + scrollUp}px) scale(${globalScale})`,
          // ... rest is same
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          perspective: "800px",
          transformOrigin: "center top",
          position: "relative",
        }}
      >
        {title && (
          <h2 className="mb-20 text-center text-3xl font-bold text-white">
            {title}
          </h2>
        )}

        {/* ── Lid ─────────────────────────────────────────── */}
        <Lid
          src={src}
          scaleX={scaleX}
          scaleY={scaleY}
          rotate={rotate}
        >
          {/* We inject the scaling container directly here */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "black",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: virtualWidth,
                height: virtualHeight,
                transform: `scale(${scale})`,
                transformOrigin: "center center",
                position: "relative",
                minWidth: virtualWidth,
                minHeight: virtualHeight,
              }}
            >
              {children}
            </div>
          </div>
        </Lid>

        {/* ── Base area ───────────────────────────────────── */}
        <div className="relative -z-[5] h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
          {/* above keyboard bar */}
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
          </div>
          <div className="relative flex">
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
            <div className="mx-auto h-full w-[80%]">
              <Keypad />
            </div>
            <div className="mx-auto h-full w-[10%] overflow-hidden">
              <SpeakerGrid />
            </div>
          </div>
          <Trackpad />
          <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
          {showGradient && (
            <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-black via-black to-transparent" />
          )}
          {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
        </div>
      </div>
    );
  };

// ─── Lid ────────────────────────────────────────────────────────────
const Lid: React.FC<{
  scaleX: number;
  scaleY: number;
  rotate: number;
  src?: string;
  children?: React.ReactNode;
}> = ({ scaleX, scaleY, rotate, src, children }) => {
  return (
    <div className="relative" style={{ perspective: "800px" }}>
      {/* Closed back of the lid */}
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px #171717 inset" }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
      </div>
      {/* Opening screen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "32rem",
          height: "24rem",
          borderRadius: "1rem",
          backgroundColor: "#010101",
          padding: "0.5rem",
          transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotate}deg)`,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        {children ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
              overflow: "hidden", // Ensure content stays inside
            }}
          >
            {children}
          </div>
        ) : src ? (
          <Img
            src={src}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
              objectFit: "cover",
              objectPosition: "left top",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

// ─── KBtn (exact copy from original) ────────────────────────────────
const KBtn: React.FC<{
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}> = ({ className, children, childrenClassName, backlit = true }) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Keypad (exact copy — all 6 rows with every key) ────────────────
const Keypad: React.FC = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">esc</KBtn>
        <KBtn><IconBrightnessDown className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F1</span></KBtn>
        <KBtn><IconBrightnessUp className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F2</span></KBtn>
        <KBtn><IconTable className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F3</span></KBtn>
        <KBtn><IconSearch className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F4</span></KBtn>
        <KBtn><IconMicrophone className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F5</span></KBtn>
        <KBtn><IconMoon className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F6</span></KBtn>
        <KBtn><IconPlayerTrackPrev className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F7</span></KBtn>
        <KBtn><IconPlayerSkipForward className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F8</span></KBtn>
        <KBtn><IconPlayerTrackNext className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F9</span></KBtn>
        <KBtn><IconVolume3 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F10</span></KBtn>
        <KBtn><IconVolume2 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F11</span></KBtn>
        <KBtn><IconVolume className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F12</span></KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn><span className="block">~</span><span className="mt-1 block">`</span></KBtn>
        <KBtn><span className="block">!</span><span className="block">1</span></KBtn>
        <KBtn><span className="block">@</span><span className="block">2</span></KBtn>
        <KBtn><span className="block">#</span><span className="block">3</span></KBtn>
        <KBtn><span className="block">$</span><span className="block">4</span></KBtn>
        <KBtn><span className="block">%</span><span className="block">5</span></KBtn>
        <KBtn><span className="block">^</span><span className="block">6</span></KBtn>
        <KBtn><span className="block">&amp;</span><span className="block">7</span></KBtn>
        <KBtn><span className="block">*</span><span className="block">8</span></KBtn>
        <KBtn><span className="block">(</span><span className="block">9</span></KBtn>
        <KBtn><span className="block">)</span><span className="block">0</span></KBtn>
        <KBtn><span className="block">&mdash;</span><span className="block">_</span></KBtn>
        <KBtn><span className="block">+</span><span className="block"> = </span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">tab</KBtn>
        <KBtn><span className="block">Q</span></KBtn>
        <KBtn><span className="block">W</span></KBtn>
        <KBtn><span className="block">E</span></KBtn>
        <KBtn><span className="block">R</span></KBtn>
        <KBtn><span className="block">T</span></KBtn>
        <KBtn><span className="block">Y</span></KBtn>
        <KBtn><span className="block">U</span></KBtn>
        <KBtn><span className="block">I</span></KBtn>
        <KBtn><span className="block">O</span></KBtn>
        <KBtn><span className="block">P</span></KBtn>
        <KBtn><span className="block">{`{`}</span><span className="block">{`[`}</span></KBtn>
        <KBtn><span className="block">{`}`}</span><span className="block">{`]`}</span></KBtn>
        <KBtn><span className="block">{`|`}</span><span className="block">{`\\`}</span></KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">caps lock</KBtn>
        <KBtn><span className="block">A</span></KBtn>
        <KBtn><span className="block">S</span></KBtn>
        <KBtn><span className="block">D</span></KBtn>
        <KBtn><span className="block">F</span></KBtn>
        <KBtn><span className="block">G</span></KBtn>
        <KBtn><span className="block">H</span></KBtn>
        <KBtn><span className="block">J</span></KBtn>
        <KBtn><span className="block">K</span></KBtn>
        <KBtn><span className="block">L</span></KBtn>
        <KBtn><span className="block">{`:`}</span><span className="block">{`;`}</span></KBtn>
        <KBtn><span className="block">{`"`}</span><span className="block">{`'`}</span></KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">shift</KBtn>
        <KBtn><span className="block">Z</span></KBtn>
        <KBtn><span className="block">X</span></KBtn>
        <KBtn><span className="block">C</span></KBtn>
        <KBtn><span className="block">V</span></KBtn>
        <KBtn><span className="block">B</span></KBtn>
        <KBtn><span className="block">N</span></KBtn>
        <KBtn><span className="block">M</span></KBtn>
        <KBtn><span className="block">{`<`}</span><span className="block">{`,`}</span></KBtn>
        <KBtn><span className="block">{`>`}</span><span className="block">{`.`}</span></KBtn>
        <KBtn><span className="block">{`?`}</span><span className="block">{`/`}</span></KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </div>

      {/* Sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><span className="block">fn</span></div>
          <div className="flex w-full justify-start pl-1"><IconWorld className="h-[6px] w-[6px]" /></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconChevronUp className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">control</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">option</span></div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">option</span></div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6"><IconCaretUpFilled className="h-[6px] w-[6px]" /></KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6"><IconCaretLeftFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretDownFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretRightFilled className="h-[6px] w-[6px]" /></KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SpeakerGrid (exact copy) ───────────────────────────────────────
const SpeakerGrid: React.FC = () => (
  <div
    className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
    style={{
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    }}
  />
);

// ─── Trackpad (exact copy) ──────────────────────────────────────────
const Trackpad: React.FC = () => (
  <div
    className="mx-auto my-1 h-32 w-[40%] rounded-xl"
    style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
  />
);

// ─── OptionKey (exact copy) ─────────────────────────────────────────
const OptionKey: React.FC<{ className: string }> = ({ className }) => (
  <svg fill="none" version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
    <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
    <rect id="_Transparent_Rectangle_" className="st0" width="32" height="32" stroke="none" />
  </svg>
);

// ─── AceternityLogo (exact copy) ────────────────────────────────────
const AceternityLogo: React.FC = () => (
  <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white">
    <path
      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
      stroke="currentColor" strokeWidth="15" strokeMiterlimit="3.86874" strokeLinecap="round"
    />
  </svg>
);
