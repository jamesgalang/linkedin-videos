import {
  AbsoluteFill,
  Video,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  staticFile,
  Sequence,
  Easing,
} from "remotion";
import React from "react";

interface MascotVideoProps {
  headline: string;
  subline: string;
  tagline: string;
  videoSrc?: string;
}

export const MascotVideo: React.FC<MascotVideoProps> = ({
  headline = "AI Agents That Actually Work",
  subline = "Deploy. Automate. Scale.",
  tagline = "",
  videoSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // === Video zoom-in effect ===
  const videoScale = interpolate(frame, [0, 180], [1.05, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  // === Top gradient for headline readability ===
  const topGradientOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === Bottom gradient for subline readability ===
  const bottomGradientOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  // === Headline animation (frame 30+) - TOP ===
  const headlineSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // === Subline animation (frame 60+) - BOTTOM ===
  const sublineSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // === Galang AI shimmer ===
  const shimmerX = interpolate(frame, [0, 180], [-200, 400], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      {/* Animated mascot video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: `scale(${videoScale})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Video
          src={staticFile(videoSrc || "mascot-animated.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          volume={0}
        />
      </div>

      {/* Top gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "35%",
          background: `linear-gradient(180deg, rgba(0,0,0,${topGradientOpacity * 0.85}) 0%, rgba(0,0,0,${topGradientOpacity * 0.4}) 60%, transparent 100%)`,
        }}
      />

      {/* Bottom gradient overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "35%",
          background: `linear-gradient(0deg, rgba(0,0,0,${bottomGradientOpacity * 0.85}) 0%, rgba(0,0,0,${bottomGradientOpacity * 0.4}) 60%, transparent 100%)`,
        }}
      />

      {/* TOP: Headline */}
      <Sequence from={30}>
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            width: "100%",
            textAlign: "center",
            padding: "0 50px",
          }}
        >
          {/* GALANG AI branding */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 6,
              fontFamily: "system-ui, -apple-system, sans-serif",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 16,
              overflow: "hidden",
              position: "relative",
              opacity: headlineSpring,
            }}
          >
            GALANG AI
            <div
              style={{
                position: "absolute",
                top: 0,
                left: shimmerX,
                width: 80,
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Headline text */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              opacity: headlineSpring,
              transform: `translateY(${interpolate(headlineSpring, [0, 1], [-20, 0])}px)`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 3px 16px rgba(0,0,0,0.7)",
            }}
          >
            {headline}
          </div>
        </div>
      </Sequence>

      {/* BOTTOM: Subline */}
      <Sequence from={60}>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            width: "100%",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              opacity: sublineSpring,
              transform: `translateY(${interpolate(sublineSpring, [0, 1], [20, 0])}px)`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: 4,
              textTransform: "uppercase",
              textShadow: "0 3px 16px rgba(0,0,0,0.7)",
            }}
          >
            {subline}
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
