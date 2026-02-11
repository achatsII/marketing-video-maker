import { Composition } from "remotion";
import { Video_QuestionnerUnExpert } from "./Questionner un expert/Video";

import { Video_LOTOAI } from "./LOTO-AI/Video";
import { TestSceneRefinedMacbook } from "./LOTO-AI/scenes/TestSceneRefinedMacbook";
import { Video_QuestionnerUnExpert_Mobile } from "./Questionner un expert - V2/Video";
import { VideoTest } from "./VideoTest/Video";
import { SceneFadeText } from "./VideoTest/scenes/SceneFadeText";
import { SceneFadeTextBubbles } from "./VideoTest/scenes/SceneFadeTextBubbles";
import { SceneImmersiveBubbles } from "./VideoTest/scenes/SceneImmersiveBubbles";
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
        durationInFrames={1830}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FadeTextBubblesTest"
        component={SceneFadeTextBubbles}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FadeTextTest"
        component={SceneFadeText}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ImmersiveBubblesTest"
        component={SceneImmersiveBubbles}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
