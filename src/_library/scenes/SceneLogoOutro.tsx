import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    spring,
    interpolate,
} from "remotion";

export const SceneLogoOutro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ─── Animation Config ─────────────────────────────────────────

    // Phase 1: Slide Right & Hide Text (Reverse of Intro)
    // Start after a brief pause to let the viewer see the full logo
    const SLIDE_START = 30; // Wait 30 frames (1 sec)
    const slideProgress = spring({
        frame: frame - SLIDE_START,
        fps,
        config: { damping: 200, stiffness: 80, mass: 2 },
    });

    // Pictogram Animation
    // Intro: 115 -> 0. Outro: 0 -> 115.
    const pictogramX = interpolate(slideProgress, [0, 1], [0, 115]);

    // Text Reveal Mask
    // Intro: 160 -> 33. Outro: 33 -> 160.
    // At 33: Mask x=33, width ~122 (Full text visible)
    // At 160: Mask x=160, width ~5 (Text hidden)
    const maskX = interpolate(slideProgress, [0, 1], [33, 160]);

    // Global Centering Adjustment
    // Intro: -52.5 -> 0. Outro: 0 -> -52.5.
    // Keeps the visual center focused as the width changes
    const globalX = interpolate(slideProgress, [0, 1], [0, -52.5]);

    // Phase 2: Fade to Black using Overlay
    // Starts after the slide is mostly done
    const SLIDE_DURATION_APPROX = 40;
    const BG_FADE_START = SLIDE_START + SLIDE_DURATION_APPROX;
    const BG_FADE_DURATION = 30;

    const blackBgOpacity = interpolate(
        frame,
        [BG_FADE_START, BG_FADE_START + BG_FADE_DURATION],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    // Phase 0: Entrance (Blur + Fade In)
    const ENTRANCE_DURATION = 20;
    const entranceOpacity = interpolate(frame, [0, ENTRANCE_DURATION], [0, 1], {
        extrapolateRight: "clamp",
    });
    const entranceBlur = interpolate(frame, [0, ENTRANCE_DURATION], [10, 0], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "white", // Removed to allow transparency
            }}
        >
            <div
                style={{
                    width: 600,
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: entranceOpacity,
                    filter: `blur(${entranceBlur}px)`,
                    // No exit scale/opacity needed on the container itself 
                    // since we are fading a black overlay on top to close the scene
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 155 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <mask id="textShowMask">
                            {/* Mask initially reveals everything (x=33), then moves right to hide (x=160) */}
                            <rect x={maskX} y="0" width={Math.max(0, 155 - maskX + 10)} height="47" fill="white" />
                        </mask>
                    </defs>

                    <g style={{ transform: `translateX(${globalX}px)` }}>
                        {/* Part 1: Pictogram (Blue) - Moves independently */}
                        <g style={{ transform: `translateX(${pictogramX}px)` }}>
                            <path d="M32.7055 27.0476H30.792H19.1581V19.9643V15.3349V7.64368H32.7055V27.0476ZM32.7055 39.3682H19.1581V31.677H32.7055V39.3682ZM14.529 15.3349H0.981295V7.64368H14.529V15.3349ZM14.529 27.0476V31.677V39.3682H0.981295V19.9643H14.529V27.0476Z" fill="#0078FF" />
                        </g>

                        {/* Part 2: Text (White/Gray) - Stationary, masked */}
                        {/* Note: In Intro, fill was #F1F5F8 (light gray). If background is white, we might need darker text? 
                            The original Video.tsx uses a dark gradient background, so light text is correct.
                            Wait, SceneLogoIntro has no background color on AbsoluteFill, so it's transparent.
                            But Video.tsx puts it inside BackgroundGradientAnimation?
                            
                            Ah, SceneLogoIntro: 
                            <AbsoluteFill> <AbsoluteFill (black overlay) /> <div (logo) /> </AbsoluteFill>
                            
                            If I want to "close on a black background", I should probably keep the transparent background 
                            so the underlying gradient is visible initially?
                            
                            In Intro:
                            It starts with Black Overlay Opacity = 1.
                            Then Fades out to 0. Revealing the transparent background (which shows the gradient from Video.tsx).
                            
                            In Outro:
                            It should start with Black Overlay Opacity = 0 (Transparent, showing gradient).
                            Then Fade in to 1 (Solid Black).
                            
                            So I should NOT set backgroundColor="white" on the root AbsoluteFill.
                            I will remove that.
                        */}
                        <g mask="url(#textShowMask)">
                            <g>
                                <mask id="innerMask" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-11" y="-3" width="174" height="54">
                                    <path d="M-10.2812 -2.93749H162.917V50.3143H-10.2812V-2.93749Z" fill="white" />
                                </mask>
                                <g mask="url(#innerMask)">
                                    <path d="M53.5459 21.5833V15.7814C53.5459 14.3686 53.0563 13.709 51.907 13.709C50.6449 13.709 50.1174 14.4065 50.1174 15.819V21.5833H46.9907V11.1286H49.9105V12.24H49.9481C50.6075 11.1662 51.5302 10.7708 52.792 10.7708C54.6764 10.7708 56.6729 11.8259 56.6729 14.9144V21.5833H53.5459Z" fill="#F1F5F8" />
                                    <path d="M59.5177 21.5833V13.5019H57.973V11.1286H59.5177V7.64361H62.6447V11.1286H64.1517V13.5019H62.6447V21.5833H59.5177Z" fill="#F1F5F8" />
                                    <path d="M72.5348 15.1979C72.2901 14.1241 71.3482 13.4077 70.1424 13.4077C69.0122 13.4077 68.0329 14.0864 67.7877 15.1979H72.5348ZM67.7501 17.3069C67.9196 18.4936 68.9182 19.2851 70.1991 19.2851C71.047 19.2851 71.5929 18.9652 72.1013 18.3053H75.304C74.3054 20.5848 72.4029 21.9219 70.1991 21.9219C67.185 21.9219 64.661 19.4922 64.661 16.3845C64.661 13.3701 67.0722 10.7709 70.1424 10.7709C73.2694 10.7709 75.6618 13.2385 75.6618 16.4788C75.6618 16.7799 75.6427 17.0246 75.5863 17.3069H67.7501Z" fill="#F1F5F8" />
                                    <path d="M77.3955 7.64361H80.5224V21.5833H77.3955V7.64361Z" fill="#F1F5F8" />
                                    <path d="M82.7834 7.64361H85.9104V21.5833H82.7834V7.64361Z" fill="#F1F5F8" />
                                    <path d="M88.1709 11.1286H91.2976V21.5833H88.1709V11.1286ZM88.1709 7.64361H91.2976V10.0172H88.1709V7.64361Z" fill="#F1F5F8" />
                                    <path d="M101.263 16.4034C101.263 14.877 100.227 13.7091 98.7009 13.7091C97.3071 13.7091 96.1957 14.877 96.1957 16.3094C96.1957 17.7783 97.1941 19.0028 98.7009 19.0028C100.227 19.0028 101.263 17.9102 101.263 16.4034ZM101.244 20.3587C100.773 21.3573 99.6052 21.9219 98.3246 21.9219C95.2728 21.9219 93.069 19.5674 93.069 16.4222C93.069 13.2197 95.3107 10.7898 98.3246 10.7898C99.6804 10.7898 100.717 11.298 101.225 12.1083H101.263V11.1285H104.39V19.698C104.39 23.0158 103.701 25.6611 98.9476 25.6611H96.6094L96.6114 22.9401H98.9077C100.49 22.9401 101.244 22.6104 101.244 20.6601V20.3587Z" fill="#F1F5F8" />
                                    <path d="M113.922 15.1979C113.678 14.1241 112.736 13.4077 111.53 13.4077C110.4 13.4077 109.421 14.0864 109.175 15.1979H113.922ZM109.138 17.3069C109.307 18.4936 110.306 19.2851 111.587 19.2851C112.435 19.2851 112.98 18.9652 113.489 18.3053H116.692C115.693 20.5848 113.791 21.9219 111.587 21.9219C108.573 21.9219 106.049 19.4922 106.049 16.3845C106.049 13.3701 108.46 10.7709 111.53 10.7709C114.657 10.7709 117.049 13.2385 117.049 16.4788C117.049 16.7799 117.03 17.0246 116.974 17.3069H109.138Z" fill="#F1F5F8" />
                                    <path d="M125.338 21.5833V15.7814C125.338 14.3686 124.849 13.709 123.7 13.709C122.437 13.709 121.91 14.4065 121.91 15.819V21.5833H118.783V11.1286H121.703V12.24H121.741C122.4 11.1662 123.323 10.7708 124.585 10.7708C126.469 10.7708 128.465 11.8259 128.465 14.9144V21.5833H125.338Z" fill="#F1F5F8" />
                                    <path d="M138.073 15.1603C137.621 14.1805 136.811 13.69 135.737 13.69C134.306 13.69 133.326 14.8769 133.326 16.3469C133.326 17.8725 134.362 19.0028 135.812 19.0028C136.867 19.0028 137.602 18.5124 138.073 17.609H141.256C140.634 20.227 138.393 21.9219 135.718 21.9219C132.629 21.9219 130.18 19.4167 130.18 16.3281C130.18 13.2009 132.648 10.7709 135.662 10.7709C138.412 10.7709 140.653 12.5034 141.237 15.1603H138.073Z" fill="#F1F5F8" />
                                    <path d="M150.28 15.1979C150.035 14.1241 149.093 13.4077 147.888 13.4077C146.757 13.4077 145.778 14.0864 145.533 15.1979H150.28ZM145.495 17.3069C145.664 18.4936 146.663 19.2851 147.944 19.2851C148.792 19.2851 149.338 18.9652 149.846 18.3053H153.049C152.051 20.5848 150.148 21.9219 147.944 21.9219C144.93 21.9219 142.406 19.4922 142.406 16.3845C142.406 13.3701 144.817 10.7709 147.888 10.7709C151.014 10.7709 153.407 13.2385 153.407 16.4788C153.407 16.7799 153.388 17.0246 153.331 17.3069H145.495Z" fill="#F1F5F8" />
                                    <path d="M41.0377 25.4358H44.5979V39.3755H41.0377V25.4358Z" fill="#F1F5F8" />
                                    <path d="M53.5459 39.3753V33.5735C53.5459 32.1609 53.0563 31.501 51.907 31.501C50.6449 31.501 50.1174 32.1985 50.1174 33.6111V39.3753H46.9907V28.9206H49.9105V30.0321H49.9481C50.6075 28.9582 51.5302 28.5629 52.792 28.5629C54.6764 28.5629 56.6729 29.6179 56.6729 32.7067V39.3753H53.5459Z" fill="#F1F5F8" />
                                    <path d="M66.8264 34.1014C66.8264 32.6503 65.715 31.4824 64.1705 31.4824C62.7011 31.4824 61.5332 32.5748 61.5332 34.1014C61.5332 35.6835 62.6447 36.7949 64.1517 36.7949C65.6774 36.7949 66.8264 35.6459 66.8264 34.1014ZM66.8076 39.3753V38.2451H66.77C66.1861 39.2058 65.131 39.7143 63.6433 39.7143C60.4782 39.7143 58.4065 37.284 58.4065 34.1203C58.4065 30.993 60.5351 28.5631 63.5866 28.5631C64.7923 28.5631 65.7714 28.9206 66.6572 29.8061V25.4356H69.7836V39.3753H66.8076Z" fill="#F1F5F8" />
                                    <path d="M78.77 39.3754V38.2639H78.7323C78.2803 39.2249 77.4517 39.7141 76.0386 39.7141C73.8351 39.7141 72.0078 38.3956 72.0078 35.42V28.9207H75.1345V34.7789C75.1345 36.1539 75.6244 36.7947 76.8114 36.7947C77.998 36.7947 78.6007 36.0035 78.6007 34.7225V28.9207H81.7274V39.3754H78.77Z" fill="#F1F5F8" />
                                    <path d="M88.4343 31.8598C88.4155 31.2565 87.982 31.0682 87.4738 31.0682C86.9465 31.0682 86.5697 31.3693 86.5697 31.7655C86.5697 32.3304 87.0782 32.6127 88.5283 32.99C91.0155 33.6486 91.825 34.6472 91.825 36.1729C91.825 38.3581 89.9416 39.7331 87.5681 39.7331C85.2133 39.7331 83.5368 38.3957 83.3109 36.2669H86.419C86.513 36.9265 86.9841 37.2276 87.6057 37.2276C88.152 37.2276 88.6983 36.9077 88.6983 36.4183C88.6983 35.8339 88.3403 35.5328 86.7765 35.0424C84.1395 34.2331 83.4427 33.1971 83.4427 31.9726C83.4427 29.9004 85.3828 28.5631 87.4929 28.5631C89.7528 28.5631 91.3542 29.8061 91.5046 31.8598H88.4343Z" fill="#F1F5F8" />
                                    <path d="M94.0109 39.3753V31.2939H92.466V28.9206H94.0109V26.4474H97.1379V28.9206H98.6449V31.2939H97.1379V39.3753H94.0109Z" fill="#F1F5F8" />
                                    <path d="M99.9826 39.3753V28.9206H102.921V30.0321H102.959C103.505 28.9206 104.371 28.5629 105.577 28.5629V31.7091C103.712 31.7279 103.11 32.4244 103.11 33.6111V39.3753H99.9826Z" fill="#F1F5F8" />
                                    <path d="M107.235 28.9206H110.362V39.3753H107.235V28.9206ZM107.235 25.4358H110.362V27.8091H107.235V25.4358Z" fill="#F1F5F8" />
                                    <path d="M119.931 32.9899C119.687 31.9163 118.745 31.2 117.539 31.2C116.409 31.2 115.429 31.8785 115.184 32.9899H119.931ZM115.147 35.0989C115.316 36.2856 116.315 37.0771 117.596 37.0771C118.444 37.0771 118.989 36.7572 119.498 36.0973H122.701C121.702 38.3768 119.8 39.7142 117.596 39.7142C114.582 39.7142 112.058 37.2842 112.058 34.1766C112.058 31.1624 114.469 28.563 117.539 28.563C120.666 28.563 123.058 31.0305 123.058 34.2708C123.058 34.5719 123.039 34.8166 122.983 35.0989H115.147Z" fill="#F1F5F8" />
                                    <path d="M124.792 25.4358H127.919V39.3755H124.792V25.4358Z" fill="#F1F5F8" />
                                    <path d="M130.18 25.4358H133.307V39.3755H130.18V25.4358Z" fill="#F1F5F8" />
                                    <path d="M142.876 32.9899C142.632 31.9163 141.69 31.2 140.484 31.2C139.354 31.2 138.375 31.8785 138.13 32.9899H142.876ZM138.092 35.0989C138.261 36.2856 139.26 37.0771 140.541 37.0771C141.389 37.0771 141.935 36.7572 142.443 36.0973H145.646C144.647 38.3768 142.745 39.7142 140.541 39.7142C137.527 39.7142 135.003 37.2842 135.003 34.1766C135.003 31.1624 137.414 28.563 140.484 28.563C143.611 28.563 146.003 31.0305 146.003 34.2708C146.003 34.5719 145.984 34.8166 145.928 35.0989H138.092Z" fill="#F1F5F8" />
                                    <path d="M41.0377 7.64361H44.5979V21.5833H41.0377V7.64361Z" fill="#F1F5F8" />
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            {/* Black Overlay for Fade Out - on TOP */}
            <AbsoluteFill
                style={{
                    backgroundColor: "black",
                    opacity: blackBgOpacity,
                    pointerEvents: "none", // ensure it doesn't block interactions if any
                }}
            />
        </AbsoluteFill>
    );
};
