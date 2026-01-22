# Video Call App

Een videoconferentie-app vergelijkbaar met Whereby, waarbij je direct een room kunt joinen met camera en microfoon.

## Features

- ✅ Direct joinen in een standaard room
- ✅ Camera en microfoon functionaliteit
- ✅ Toggle camera/microfoon aan/uit
- ✅ Moderne UI met Tailwind CSS

## Installatie

Dependencies zijn al geïnstalleerd. Als je ze opnieuw moet installeren:

```bash
npm install
```

## Development

Start de development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Gebruik

1. Open de homepage
2. Klik op "Join Room"
3. Geef toestemming voor camera en microfoon
4. Je video en audio zijn nu actief
5. Gebruik de controls om camera/microfoon aan/uit te zetten
6. Klik op "Leave" om de call te verlaten

## Technologie

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **WebRTC** - Video/audio streaming via browser APIs

## Volgende stappen

- [ ] Multi-user support met peer-to-peer connections
- [ ] WebSocket signaling server
- [ ] Screen sharing
- [ ] Chat functionaliteit
- [ ] Room URLs en sharing
