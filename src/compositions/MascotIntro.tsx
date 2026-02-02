import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  staticFile,
  Sequence,
} from "remotion";
import React from "react";

interface MascotIntroProps {
  headline: string;
  subline: string;
  tagline: string;
  mascotSrc?: string;
}

export const MascotIntro: React.FC<MascotIntroProps> = ({
  headline = "AI Agents That Actually Work",
  subline = "Deploy. Automate. Scale.",
  tagline = "galang.ai/ai-agent-deployment",
  mascotSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // === PHASE 1: Mascot enters (frames 0-45) ===
  const mascotScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80, mass: 0.8 },
  });

  const mascotBounce = Math.sin(frame / 20) * 8;

  // === PHASE 2: Headline slides in (frames 30+) ===
  const headlineProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // === PHASE 3: Subline fades in (frames 55+) ===
  const sublineProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // === PHASE 4: Tagline / CTA (frames 80+) ===
  const taglineProgress = spring({
    frame: frame - 80,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // === PHASE 5: Glow pulse on mascot (continuous after entry) ===
  const glowIntensity = frame > 45 ? 0.4 + Math.sin(frame / 15) * 0.2 : 0;

  // === Background particles ===
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 + frame / 60;
    const radius = 350 + Math.sin(frame / 40 + i) * 50;
    const x = width / 2 + Math.cos(angle) * radius;
    const y = height / 2 + Math.sin(angle) * radius;
    const size = 4 + Math.sin(frame / 20 + i * 2) * 2;
    const opacity = 0.3 + Math.sin(frame / 25 + i) * 0.2;
    return { x, y, size, opacity };
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg, #0a0a1a 0%, #111133 50%, #0d0d2a 100%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,50,50,0.12) 0%, transparent 70%)",
          transform: `scale(${1 + Math.sin(frame / 50) * 0.15})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,80,220,0.1) 0%, transparent 70%)",
          transform: `scale(${1 + Math.cos(frame / 40) * 0.1})`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "rgba(220,80,80,0.5)" : "rgba(140,120,255,0.4)",
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Mascot with glow */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: `translateX(-50%) scale(${mascotScale}) translateY(${mascotBounce}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Glow behind mascot */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(220,60,60,${glowIntensity}) 0%, transparent 60%)`,
          }}
        />
        <Img
          src={mascotSrc || staticFile("lobster-mascot.jpg")}
          style={{
            width: 380,
            height: 380,
            objectFit: "contain",
            filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
            borderRadius: 24,
          }}
        />
      </div>

      {/* Headline */}
      <Sequence from={30}>
        <div
          style={{
            position: "absolute",
            top: "55%",
            width: "100%",
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              opacity: headlineProgress,
              transform: `translateY(${interpolate(headlineProgress, [0, 1], [40, 0])}px)`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            {headline}
          </div>
        </div>
      </Sequence>

      {/* Subline */}
      <Sequence from={55}>
        <div
          style={{
            position: "absolute",
            top: "70%",
            width: "100%",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
              opacity: sublineProgress,
              transform: `translateY(${interpolate(sublineProgress, [0, 1], [25, 0])}px)`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {subline}
          </div>
        </div>
      </Sequence>

      {/* CTA / Tagline bar */}
      <Sequence from={80}>
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "linear-gradient(90deg, rgba(220,60,60,0.9) 0%, rgba(180,40,40,0.9) 100%)",
              borderRadius: 50,
              padding: "18px 48px",
              opacity: taglineProgress,
              transform: `scale(${interpolate(taglineProgress, [0, 1], [0.8, 1])})`,
              boxShadow: "0 8px 32px rgba(220,60,60,0.3)",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: 1,
              }}
            >
              {tagline}
            </div>
          </div>
        </div>
      </Sequence>

      {/* Galang AI watermark */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 40,
          fontSize: 20,
          fontWeight: 600,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: 2,
        }}
      >
        GALANG AI
      </div>
    </AbsoluteFill>
  );
};
