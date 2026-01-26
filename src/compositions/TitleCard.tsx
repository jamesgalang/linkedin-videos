import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import React from "react";

interface TitleCardProps {
  title: string;
  subtitle: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  
  const subtitleProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Animated background circles */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)",
          transform: `scale(${1 + Math.sin(frame / 30) * 0.1})`,
        }}
      />
      
      {/* Title */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          color: "white",
          marginBottom: 24,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [50, 0])}px)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      
      {/* Subtitle */}
      <div
        style={{
          fontSize: 36,
          color: "rgba(255,255,255,0.7)",
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [30, 0])}px)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>
    </AbsoluteFill>
  );
};
