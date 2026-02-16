import { Composition } from "remotion";
import { Video_QuestionnerUnExpert } from "./products/QuestionnerUnExpert-V1/Video";
import { Video_LOTOAI } from "./products/LOTO-AI/Video";

import { Video_LOTOAIV4 } from "./products/LOTO-AI-V4/Video";
import { LotoAiV3Video } from "./products/LOTO-AI-V3/Video";
import { Video_LOTOAI_V2 } from "./products/LOTO-AI-V2/Video";
import { Video_QuestionnerUnExpert_Mobile } from "./products/QuestionnerUnExpert-V2/Video";
import { VideoTest } from "./products/VideoTest/Video";
import { SceneFadeText } from "./_library/scenes/SceneFadeText";

import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="QuestionnerUnExpert"
        component={Video_QuestionnerUnExpert}
        durationInFrames={1380}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LOTO-AI"
        component={Video_LOTOAI}
        durationInFrames={1530}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LOTO-AI-V4"
        component={Video_LOTOAIV4}
        durationInFrames={1530}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="QuestionnerUnExpertMobile"
        component={Video_QuestionnerUnExpert_Mobile}
        durationInFrames={2065}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="VideoTest"
        component={VideoTest}
        durationInFrames={1630}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LOTO-AI-V2"
        component={Video_LOTOAI_V2}
        durationInFrames={1530}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="LOTO-AI-V3"
        component={LotoAiV3Video}
        durationInFrames={1530}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
