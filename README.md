# LinkedIn Video Demos

Remotion-powered video generation for LinkedIn posts showcasing Clawdbot features.

## Compositions

- **ChatDemo** - Animated Telegram-style conversation (1080x1080 square)
- **ChatDemoVertical** - Same but vertical (1080x1920)
- **FeatureHighlight** - Feature showcase with animated badges
- **TitleCard** - Intro/outro title cards

## Rendering

```bash
# Render ChatDemo
npx remotion render src/index.ts ChatDemo out/chat-demo.mp4

# Render with custom props
npx remotion render src/index.ts ChatDemo out/custom.mp4 --props='{"messages":[{"role":"user","text":"Hello!"},{"role":"assistant","text":"Hi there!"}]}'

# Render vertical format
npx remotion render src/index.ts ChatDemoVertical out/vertical.mp4
```

## Development

```bash
npm install
npm start  # Opens Remotion Studio at localhost:3000
```

## Docker

```bash
docker-compose up -d
docker-compose exec remotion npx remotion render src/index.ts ChatDemo out/demo.mp4
```
