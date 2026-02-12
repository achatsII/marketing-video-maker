import React from "react";
import {
    useCurrentFrame,
    useVideoConfig,
    interpolate,
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
export const RefinedMacbook: React.FC<{
    src?: string;
    showGradient?: boolean;
    title?: React.ReactNode;
    badge?: React.ReactNode;
    children?: React.ReactNode;
    scrollOut?: boolean;
    scrollOutStartFrame?: number;
    scrollOutDuration?: number;
}> = ({
    src,
    showGradient,
    title,
    badge,
    children,
    scrollOut = true,
    scrollOutStartFrame,
    scrollOutDuration = 30,
}) => {
        const frame = useCurrentFrame();
        const { durationInFrames } = useVideoConfig();

        // Base is designed at 32rem (512px). Screen is 1203px (High Res).
        const baseScale = 2.8; // ~2.35

        // Global scale reduces the giant component back to normal visual size
        const globalScale = 0.5;

        // ─── Animation Config ───
        // The animation is now "Continuous" (One stroke from bottom to top)
        // Frame 0: Starts at bottom (offscreen or low)
        // Frame X: Arrives at center -> Split occurs
        // Frame End: Chassis is offscreen top, Safari is centered/floating

        const SPLIT_FRAME = 50; // Frame where the "Split" happens (Center)

        // 1. Continuous Chassis Motion (Bottom -> Top Offscreen)
        // It moves continuously without pause.
        const mvStart = 800; // Start Y (Below)
        const mvEnd = -2500;   // End Y (Above) - Large value to clear screen
        const chassisY = interpolate(frame, [0, durationInFrames], [mvStart, mvEnd], {
            easing: Easing.linear, // Or smooth continuous ease
        });

        // 2. Safari Motion (Follows Chassis -> Stops at Center)
        const yAtSplit = interpolate(SPLIT_FRAME, [0, durationInFrames], [mvStart, mvEnd]);

        // Safari Y: Follows chassis until SPLIT_FRAME, then interpolates to 0.
        const safariY = frame < SPLIT_FRAME
            ? chassisY
            : interpolate(frame, [SPLIT_FRAME, SPLIT_FRAME + 40], [yAtSplit, 0], {
                easing: Easing.out(Easing.cubic),
                extrapolateRight: "clamp",
            });

        // 3. Opening/Unfold Animation (Safari Only)
        // Starts at -20deg (Locked to Background) -> Then rotates to 0deg (Facing Front) AFTER Split.
        // Scales also transition from "Tilted properties" (1.2, 0.6) to "Native Flat" (1, 1).

        // Rotation
        const rotate = interpolate(frame, [0, SPLIT_FRAME, SPLIT_FRAME + 40], [-20, -20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        });

        // Scale X (Width distortion due to tilt -> Native)
        const scaleX = interpolate(frame, [0, SPLIT_FRAME, SPLIT_FRAME + 40], [1.2, 1.2, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        });

        // Scale Y (Height foreshortening due to tilt -> Native)
        const scaleY = interpolate(frame, [0, SPLIT_FRAME, SPLIT_FRAME + 40], [0.6, 0.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        });


        // 4. "Drop" Animation to simulate Top Axis Pivot
        // When rotating -20 -> 0 around Bottom, the Top edge rises.
        // To make it look like it's hanging from the Top, we must drop it down by the amount it rises.
        // Rise = H - (H * cos(20deg)). H=753. cos(20)=0.94. Rise ~ 45px.
        const safariDropY = interpolate(frame, [SPLIT_FRAME, SPLIT_FRAME + 40], [0, 46], {
            easing: Easing.out(Easing.cubic),
            extrapolateRight: "clamp",
        });

        // 5. Scale / Drift (Floating effect)
        const scaleDrift = interpolate(frame, [SPLIT_FRAME, SPLIT_FRAME + 60], [1, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });

        return (
            <div
                style={{
                    // Global Container - Fixed Scale, Perspective
                    transform: `scale(${globalScale})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    perspective: "2000px", // Increased perspective for better 3D depth
                    transformOrigin: "center top",
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                }}
            >
                {title && (
                    <h2 className="mb-20 text-center text-3xl font-bold text-white">
                        {title}
                    </h2>
                )}

                {/* ─── CHASSIS GROUP (Lid Back + Base) ────────────────────────── */}
                {/* Moves linearly from Bottom to Top (chassisY) */}
                <div
                    style={{
                        transform: `translateY(${chassisY}px)`,
                        transformStyle: "preserve-3d",
                        zIndex: 10, // Background layer
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/* Lid Back - FIXED Inclination (-20deg) - Attached to Chassis */}
                    <div className="relative" style={{ perspective: "800px", zIndex: 10 }}>
                        <div
                            style={{
                                transform: `scaleX(1.2) scaleY(0.6) rotateX(-20deg)`,
                                transformOrigin: "bottom", // Hinge Pivot
                                transformStyle: "preserve-3d",
                            }}
                            className="relative h-[753px] w-[1203px] rounded-2xl bg-[#010101] p-2"
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

                        {/* ─── SAFARI GROUP (Moved Inside Lid Container) ────────────────────────── */}
                        {/* Relative Y = (Desired World Y) - (Chassis World Y) */}
                        <div
                            style={{
                                transform: `translateY(${safariY - chassisY + safariDropY}px)`,
                                zIndex: 50,
                                position: "absolute",
                                inset: 0, // Locks position to Lid Back
                                perspective: "800px",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div
                                style={{
                                    width: "1203px",
                                    height: "753px",
                                    borderRadius: "1rem",
                                    backgroundColor: "#010101",
                                    padding: "0.5rem",
                                    // Rotation + Peel + Dynamic Scale
                                    transform: `rotateX(${rotate}deg) scaleX(${scaleX}) scaleY(${scaleY}) scale(${scaleDrift})`,
                                    transformOrigin: "bottom",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div className="absolute inset-0 rounded-lg bg-[#272729]" />
                                {children ? (
                                    <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg">
                                        {children}
                                    </div>
                                ) : src ? (
                                    <Img src={src} className="h-full w-full rounded-lg object-cover" />
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Base (Keyboard) - Scaled to match width */}
                    <div
                        style={{
                            transform: `scale(${baseScale})`,
                            transformOrigin: "top center",
                            marginTop: "-1px",
                            zIndex: 20, // Sit above back, but below Safari
                            position: "relative",
                        }}
                    >
                        <div className="relative -z-[5] h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-[#272729]">
                            {/* ... Base Content ... */}
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
                </div>



            </div>
        );
    };
// Removed local Lid component as logic is now integrated directly for splitting



// ─── UTILS (Keypad, etc.) ───────────────────────────────────────────
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

const Keypad: React.FC = () => {
    // ... (Content identical to MacBookScroll) ...
    // To save tokens, I will assume the user has the Keypad code or I can paste it fully.
    // I will paste it fully to ensure it works out of the box.
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

const SpeakerGrid: React.FC = () => (
    <div
        className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
        style={{
            backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
            backgroundSize: "3px 3px",
        }}
    />
);

const Trackpad: React.FC = () => (
    <div
        className="mx-auto my-1 h-32 w-[40%] rounded-xl"
        style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
    />
);

const OptionKey: React.FC<{ className: string }> = ({ className }) => (
    <svg fill="none" version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
        <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
        <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
        <rect id="_Transparent_Rectangle_" className="st0" width="32" height="32" stroke="none" />
    </svg>
);

const AceternityLogo: React.FC = () => (
    <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white">
        <path
            d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
            stroke="currentColor" strokeWidth="15" strokeMiterlimit="3.86874" strokeLinecap="round"
        />
    </svg>
);
