# LinkedIn Videos

Automated video generation for LinkedIn posts using [Remotion](https://remotion.dev).

## 🚀 Quick Start

**Remotion Studio (live):** https://remotion.galang.ai

### Available Compositions

| Name | Dimensions | Duration | Description |
|------|------------|----------|-------------|
| `ChatDemo` | 1080×1080 | 10s | Chat-style demonstration |
| `FeatureHighlight` | 1080×1080 | 5s | Feature highlight card |
| `TitleCard` | 1080×1080 | 3s | Simple title animation |
| `ChatDemoVertical` | 1080×1920 | 10s | Vertical chat demo |

## 🎬 Rendering

### Via Remotion Studio
Visit https://remotion.galang.ai and use the built-in render controls.

### Via CLI (on galang-core)
```bash
cd /opt/linkedin-videos
source ~/.nvm/nvm.sh && nvm use 22

# Render TitleCard
npx remotion render src/index.ts TitleCard out/title.mp4 \
  --props='{"title":"Your Title","subtitle":"Your Subtitle"}'

# Render ChatDemo
npx remotion render src/index.ts ChatDemo out/chat.mp4 \
  --props='{}'

# Custom quality
npx remotion render src/index.ts TitleCard out/hq.mp4 \
  --props='{}' --crf 15
```

## 🛠️ Development

```bash
# Clone
git clone https://github.com/jamesgalang/linkedin-videos
cd linkedin-videos

# Install
npm install

# Run studio locally
npx remotion studio
```

## 📁 Project Structure

```
src/
├── index.ts              # Entry point
├── Root.tsx              # Composition definitions
└── compositions/
    ├── ChatDemo.tsx      # Chat demonstration
    ├── FeatureHighlight.tsx
    └── TitleCard.tsx     # Title card animation
```

## 🏗️ Infrastructure

- **Server:** galang-core (178.156.174.157)
- **Path:** `/opt/linkedin-videos`
- **Studio URL:** https://remotion.galang.ai (via Pangolin)
- **Node.js:** v22.22.0 (via nvm)

## 📝 License

MIT
