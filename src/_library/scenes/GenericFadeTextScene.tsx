import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from 'remotion';
import { FadeText } from '@/_core/components/remotion/FadeText';
import { DiagonalWipe } from '@/_core/components/remotion/DiagonalWipe';


interface GenericFadeTextSceneProps { // meme props que FadeText.tsx
    text?: string;
    className?: string;
    delay?: number; // delay between words in ms
    initialDelay?: number; // initial start delay in ms - converted to frames internally
    direction?: 'up' | 'down';
    maxWordsPerLine?: number;
    auroraWords?: string[];
    wordRotates?: Record<string, string[]>;
    sequenceDuration?: number;
}

export const GenericFadeTextScene: React.FC<GenericFadeTextSceneProps> = ({
    text,
    wordRotates,
    auroraWords,
    className = "text-7xl font-bold text-center leading-none",
    delay = 150,
    initialDelay = 0,
    direction = "up",
    maxWordsPerLine = 5,
    sequenceDuration = 110
}) => {
    const frame = useCurrentFrame();

    // Slight zoom from 1 to 1.30 over the scene duration
    const scale = interpolate(
        frame,
        [0, sequenceDuration],
        [1, 1.3],
        { extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill
            className="text-white flex items-center justify-center p-20"
            style={{
                transform: `scale(${scale})`,
            }}
        >
            <DiagonalWipe
                direction="left-to-right"
                angle={45}
                startFrame={sequenceDuration - 45}
                durationFrames={45}
            >
                <FadeText
                    text={text}
                    className={className}
                    direction={direction}
                    delay={delay}
                    initialDelay={initialDelay}
                    maxWordsPerLine={maxWordsPerLine}
                    wordRotates={wordRotates}
                    auroraWords={auroraWords}
                />
            </DiagonalWipe>
        </AbsoluteFill>
    );
};
