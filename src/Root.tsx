import { Composition } from "remotion";
import { ChatDemo } from "./compositions/ChatDemo";
import { FeatureHighlight } from "./compositions/FeatureHighlight";
import { TitleCard } from "./compositions/TitleCard";
import { MascotIntro } from "./compositions/MascotIntro";
import { MascotVideo } from "./compositions/MascotVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Square format for LinkedIn (1080x1080) */}
      <Composition
        id="ChatDemo"
        component={ChatDemo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          messages: [
            { role: "user", text: "What's on my calendar today?" },
            { role: "assistant", text: "You have 3 meetings:\n• 10am - Team standup\n• 2pm - Client call\n• 4pm - Design review" },
          ],
        }}
      />
      
      <Composition
        id="FeatureHighlight"
        component={FeatureHighlight}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          title: "AI Assistant",
          features: ["Calendar", "Email", "Tasks"],
          icon: "🤖",
        }}
      />
      
      <Composition
        id="TitleCard"
        component={TitleCard}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          title: "Clawdbot",
          subtitle: "Your AI-powered assistant",
        }}
      />
      
      {/* Mascot Video - Square (1080x1080) - Animated mascot + text overlay */}
      <Composition
        id="MascotVideo"
        component={MascotVideo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          headline: "AI Agents That Actually Work",
          subline: "Deploy. Automate. Scale.",
          tagline: "galang.ai/ai-agent-deployment",
        }}
      />

      {/* Mascot Video - Vertical (1080x1920) */}
      <Composition
        id="MascotVideoVertical"
        component={MascotVideo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "AI Agents That Actually Work",
          subline: "Deploy. Automate. Scale.",
          tagline: "galang.ai/ai-agent-deployment",
        }}
      />

      {/* Mascot Intro - Square (1080x1080) */}
      <Composition
        id="MascotIntro"
        component={MascotIntro}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          headline: "AI Agents That Actually Work",
          subline: "Deploy. Automate. Scale.",
          tagline: "galang.ai/ai-agent-deployment",
        }}
      />

      {/* Mascot Intro - Vertical (1080x1920) */}
      <Composition
        id="MascotIntroVertical"
        component={MascotIntro}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: "AI Agents That Actually Work",
          subline: "Deploy. Automate. Scale.",
          tagline: "galang.ai/ai-agent-deployment",
        }}
      />

      {/* Vertical format for LinkedIn Stories (1080x1920) */}
      <Composition
        id="ChatDemoVertical"
        component={ChatDemo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          messages: [
            { role: "user", text: "What's on my calendar today?" },
            { role: "assistant", text: "You have 3 meetings:\n• 10am - Team standup\n• 2pm - Client call\n• 4pm - Design review" },
          ],
        }}
      />
    </>
  );
};
