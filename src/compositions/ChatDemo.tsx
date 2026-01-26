import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import React from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatDemoProps {
  messages: Message[];
}

const MessageBubble: React.FC<{
  message: Message;
  index: number;
  startFrame: number;
}> = ({ message, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const isUser = message.role === "user";
  
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);
  
  // Typewriter effect for assistant messages
  const typedText = isUser
    ? message.text
    : message.text.slice(0, Math.floor((frame - startFrame - 10) * 1.5));
  
  if (frame < startFrame) return null;
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 16,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          padding: "16px 20px",
          borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
          backgroundColor: isUser ? "#0088cc" : "#2d2d2d",
          color: "white",
          fontSize: 28,
          lineHeight: 1.4,
          fontFamily: "system-ui, -apple-system, sans-serif",
          whiteSpace: "pre-wrap",
        }}
      >
        {isUser ? message.text : typedText}
        {!isUser && frame < startFrame + message.text.length / 1.5 + 10 && (
          <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>▌</span>
        )}
      </div>
    </div>
  );
};

export const ChatDemo: React.FC<ChatDemoProps> = ({ messages }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Calculate start frames for each message
  let cumulativeFrame = 30; // Start after a short delay
  const messageFrames = messages.map((msg, i) => {
    const startFrame = cumulativeFrame;
    cumulativeFrame += msg.role === "user" ? 45 : msg.text.length / 1.5 + 60;
    return startFrame;
  });
  
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 40,
          padding: "16px 20px",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "#0088cc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            marginRight: 16,
          }}
        >
          🤖
        </div>
        <div>
          <div style={{ color: "white", fontSize: 24, fontWeight: 600 }}>
            Jarbis
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 18 }}>
            AI Assistant
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            message={msg}
            index={i}
            startFrame={messageFrames[i]}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
