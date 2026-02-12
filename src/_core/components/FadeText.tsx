import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { cn } from '@/lib/utils';
import React from 'react';

import { AuroraText } from '@/_core/components/remotion/AuroraText';
import { WordRotate } from '@/_core/components/remotion/WordRotate';

interface FadeTextProps {
    text?: string;
    className?: string;
    delay?: number; // delay between words in ms
    initialDelay?: number; // initial start delay in ms - converted to frames internally
    startFrame?: number; // alternative to initialDelay - start frame (takes priority if both provided)
    direction?: 'up' | 'down';
    maxWordsPerLine?: number;
    auroraWords?: string[];
    wordRotates?: Record<string, string[]>;
}

export const FadeText: React.FC<FadeTextProps> = ({
    text = '',
    className = '',
    delay = 200, // delay between words
    initialDelay = 0,
    startFrame,
    direction = 'up',
    maxWordsPerLine,
    auroraWords = [],
    wordRotates,
}) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const words = text.split(' ');

    // Convert delays to frames
    const staggerFrames = Math.round((delay / 1000) * fps);
    // Use startFrame if provided, otherwise convert initialDelay from ms to frames
    const startFrameOffset = startFrame !== undefined
        ? startFrame
        : Math.round((initialDelay / 1000) * fps);

    // Group words into lines if maxWordsPerLine is set
    const lines = maxWordsPerLine
        ? Array.from({ length: Math.ceil(words.length / maxWordsPerLine) }, (_, i) =>
            words.slice(i * maxWordsPerLine, i * maxWordsPerLine + maxWordsPerLine)
        )
        : [words]; // Single line if not set

    let globalWordIndex = 0;

    return (
        <div className={cn("flex flex-col items-center", className)}>
            {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="flex flex-wrap justify-center">
                    {line.map((word, wordIndex) => {
                        const currentGlobalIndex = globalWordIndex;
                        globalWordIndex++;

                        // Calculate the start frame for this specific word using global index
                        const startFrame = startFrameOffset + (currentGlobalIndex * staggerFrames);

                        // Use spring for smooth animation
                        const spr = spring({
                            fps,
                            frame: frame - startFrame,
                            config: {
                                damping: 20,
                                stiffness: 100,
                            },
                        });

                        // Properties driven by spring
                        const opacity = spr;
                        const yOffset = direction === 'up' ? 50 : -50;
                        const translateY = (1 - spr) * yOffset;

                        const cleanWord = word.replace(/[.,!?]/g, "");
                        const isAurora = auroraWords.includes(cleanWord);
                        const rotateWords = wordRotates?.[cleanWord];

                        let content: React.ReactNode = word;
                        if (rotateWords) {
                            content = (
                                <WordRotate
                                    words={rotateWords}
                                    className="inline-flex h-[1.5em] relative -top-[0.25em]"
                                    framesPerWord={50}
                                    renderWord={(w) => {
                                        const shouldBeAurora = isAurora || auroraWords.includes(w);
                                        return shouldBeAurora ? <AuroraText>{w}</AuroraText> : w;
                                    }}
                                />
                            );
                        } else if (isAurora) {
                            content = <AuroraText>{word}</AuroraText>;
                        }

                        return (
                            <span
                                key={`${lineIndex}-${wordIndex}`}
                                style={{
                                    opacity,
                                    transform: `translateY(${translateY}px)`,
                                    display: 'inline-block',
                                }}
                            >
                                {content}
                                {wordIndex !== line.length - 1 && '\u00A0'}
                            </span>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
