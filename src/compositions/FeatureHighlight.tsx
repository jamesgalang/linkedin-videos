import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import React from "react";

interface FeatureHighlightProps {
  title: string;
  features: string[];
  icon: string;
}

export const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  title,
  features,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 120,
          marginBottom: 40,
          transform: `scale(${titleProgress})`,
        }}
      >
        {icon}
      </div>
      
      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "white",
          marginBottom: 60,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {title}
      </div>
      
      {/* Features */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {features.map((feature, i) => {
          const featureProgress = spring({
            frame: frame - 20 - i * 10,
            fps,
            config: { damping: 15, stiffness: 100 },
          });
          
          return (
            <div
              key={i}
              style={{
                padding: "16px 32px",
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 50,
                color: "white",
                fontSize: 32,
                fontWeight: 500,
                opacity: featureProgress,
                transform: `translateY(${interpolate(featureProgress, [0, 1], [20, 0])}px)`,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {feature}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
