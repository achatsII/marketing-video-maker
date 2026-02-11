import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { AuroraText } from '@/components/remotion/AuroraText';
// @ts-ignore
import GlassSurface from '@/components/GlassSurface';

// Common Props
interface RespondToQuestionProps {
    variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const RespondToQuestion: React.FC<RespondToQuestionProps> = ({ variant = 'v1' }) => {
    return (
        <AbsoluteFill className="flex items-center justify-center p-8">
            {variant === 'v1' && <Version1 />}
            {variant === 'v2' && <Version2 />}
            {variant === 'v3' && <Version3 />}

        </AbsoluteFill>
    );
};

// Version 1: Glass Card with Aurora Question
const Version1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrySpring = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 80 },
    });

    const scale = interpolate(entrySpring, [0, 1], [0.92, 1]);
    const opacity = entrySpring;

    return (
        <div
            className="w-full max-w-3xl space-y-8"
            style={{
                transform: `scale(${scale})`,
                opacity,
            }}
        >
            {/* Question Card */}
            <div className="relative rounded-3xl overflow-hidden">
                {/* Glass background */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-xl border border-white/20" />

                <div className="relative p-10 space-y-4">
                    <h2 className="text-5xl font-bold leading-tight text-white">
                        What is the best way to implement{' '}
                        <AuroraText>'Liquid Glass'</AuroraText> UI style?
                    </h2>
                    <p className="text-xl text-white/50">Asked by Jane Doe • 2 days ago</p>
                </div>
            </div>

            {/* Answer Area */}
            <div className="relative rounded-3xl overflow-hidden">
                {/* Glass background */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-xl border border-white/10" />

                <div className="relative p-10 space-y-6">
                    <h3 className="text-3xl font-semibold text-white">
                        Your <AuroraText>Answer</AuroraText>
                    </h3>

                    <div className="bg-black/20 rounded-2xl p-6 min-h-[200px] border border-white/5">
                        <p className="text-white/30 text-xl italic">Type your expert answer here...</p>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">
                        Submit Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

// Version 2: Dark Glass with Glow Effects
const Version2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrySpring = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 80 },
    });

    const scale = interpolate(entrySpring, [0, 1], [0.95, 1]);
    const opacity = entrySpring;

    // Animated glow
    const glowIntensity = interpolate(
        frame % 60,
        [0, 30, 60],
        [0.3, 0.6, 0.3],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <div
            className="w-full max-w-3xl space-y-8"
            style={{
                transform: `scale(${scale})`,
                opacity,
            }}
        >
            {/* Question Card with Animated Glow */}
            <div className="relative">
                {/* Glow effect */}
                <div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl"
                    style={{ opacity: glowIntensity }}
                />

                <div className="relative rounded-3xl overflow-hidden bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 p-10 space-y-4">
                    <h2 className="text-5xl font-bold leading-tight">
                        <span className="text-white">How to create </span>
                        <AuroraText>stunning UI</AuroraText>
                        <span className="text-white"> designs?</span>
                    </h2>
                    <p className="text-xl text-gray-400">Asked by Jane Doe • 2 days ago</p>
                </div>
            </div>

            {/* Answer Input with Subtle Border */}
            <div className="relative rounded-3xl overflow-hidden bg-gray-900/90 backdrop-blur-xl border border-gray-700/50">
                <div className="p-10 space-y-6">
                    <h3 className="text-3xl font-semibold text-white flex items-center gap-3">
                        Your Expert <AuroraText>Response</AuroraText>
                    </h3>

                    <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 min-h-[200px] border border-gray-700/30">
                        <p className="text-gray-500 text-xl">Share your knowledge...</p>
                    </div>

                    {/* Button with glow */}
                    <div className="relative">
                        <div
                            className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-50"
                        />
                        <button className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl">
                            Publish Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Version 3: Minimalist Dark with Accent
const Version3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrySpring = spring({
        frame,
        fps,
        config: { damping: 100, stiffness: 80 },
    });

    const translateY = interpolate(entrySpring, [0, 1], [40, 0]);
    const opacity = entrySpring;

    return (
        <div
            className="w-full max-w-3xl space-y-10"
            style={{
                transform: `translateY(${translateY}px)`,
                opacity,
            }}
        >
            {/* Question - Clean Typography */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-white/40 text-sm uppercase tracking-wider font-semibold">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    Question
                </div>

                <h2 className="text-6xl font-bold leading-tight text-white">
                    Best practices for{' '}
                    <span className="relative inline-block">
                        <AuroraText>modern UI</AuroraText>
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </span>
                    {' '}development?
                </h2>

                <p className="text-xl text-white/40">Asked by Jane Doe • 2 days ago</p>
            </div>

            {/* Answer Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 text-white/40 text-sm uppercase tracking-wider font-semibold">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    Your Answer
                </div>

                <div className="relative">
                    {/* Subtle glass effect */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 min-h-[220px] border border-white/10">
                        <p className="text-white/30 text-xl">Type your expert insights here...</p>
                    </div>
                </div>

                <button className="w-full bg-white text-black py-5 rounded-2xl font-bold text-xl hover:bg-white/90 transition-all shadow-lg shadow-white/10">
                    Submit Answer
                </button>
            </div>
        </div>
    );
};
