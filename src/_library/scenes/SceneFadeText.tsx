import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence } from 'remotion';
import { FadeText } from '@/_core/components/remotion/FadeText';
import { DiagonalWipe } from '@/_core/components/remotion/DiagonalWipe';

export const SceneFadeText: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Slight zoom from 1 to 1.10 over the entire scene duration
    const scale = interpolate(
        frame,
        [0, durationInFrames],
        [1, 1.3],
        { extrapolateRight: 'clamp' }
    );

    const sequence1Duration = 110;
    const sequence2Duration = 130;

    return (
        <AbsoluteFill
            className="bg-black text-white"
            style={{
                transform: `scale(${scale})`,
            }}
        >
            <Sequence from={0} durationInFrames={sequence1Duration}>
                <AbsoluteFill className="flex items-center justify-center p-20">
                    <DiagonalWipe
                        direction="left-to-right"
                        angle={45}
                        startFrame={sequence1Duration - 45}
                        durationFrames={45}
                    >
                        <FadeText
                            text="Et si vous mettiez fin aux questions sans réponses ?"
                            className="text-7xl font-bold text-center leading-none"
                            direction="up"
                            delay={150}
                            initialDelay={500}
                            maxWordsPerLine={5}
                        //auroraWords={["animation"]}
                        />
                    </DiagonalWipe>
                </AbsoluteFill>
            </Sequence>

            <Sequence from={sequence1Duration} durationInFrames={sequence2Duration}>
                <AbsoluteFill className="flex items-center justify-center p-20">
                    <DiagonalWipe
                        direction="left-to-right"
                        angle={45}
                        startFrame={sequence2Duration - 45} // Relative to sequence start
                        durationFrames={45}
                    >
                        <FadeText
                            text="Toujours DYNAMIC"
                            className="text-7xl font-bold text-center leading-none"
                            direction="up"
                            delay={150}
                            initialDelay={0}
                            wordRotates={{
                                "DYNAMIC": ["a jour", "stable"]
                            }}
                            auroraWords={["a jour", "stable"]}
                        />
                    </DiagonalWipe>
                </AbsoluteFill>
            </Sequence>
        </AbsoluteFill>
    );
};
