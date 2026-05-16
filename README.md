# Multiplayer Tic Tac Toe

A real-time multiplayer Tic Tac Toe game with peer-to-peer WebRTC networking, an AI opponent, and trilingual support.

**[Live Demo](https://saharhalili95.github.io/multiplayer-tictactoe/)**

## Features

- **P2P Multiplayer** - Play against a friend from two different computers with no backend server. Uses WebRTC via PeerJS for direct browser-to-browser connections.
- **vs. Computer** - Single-player mode with a Minimax AI at three difficulty levels: Easy, Medium, and Unbeatable.
- **Trilingual** - Full support for Hebrew, English, and Arabic with automatic RTL/LTR layout switching.
- **In-Game Chat** - Real-time chat between players during a multiplayer session.
- **Score Tracking** - Persistent score tracking across rounds within a session.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 / CSS3 / JavaScript | Core UI and game logic |
| PeerJS | WebRTC abstraction for P2P connections |
| WebRTC | Peer-to-peer real-time communication |
| GitHub Pages | Static site hosting |

## How to Play

### Multiplayer (P2P)

1. Open the [demo](https://saharhalili95.github.io/multiplayer-tictactoe/) in your browser.
2. Click **Create Game** - you'll receive a unique room code.
3. Share the code with your opponent.
4. Your opponent clicks **Join Game** and enters the code.
5. The game starts once both players are connected.

### vs. Computer

1. Open the [demo](https://saharhalili95.github.io/multiplayer-tictactoe/).
2. Select **vs. Computer** and choose a difficulty level.
3. Play as X against the AI.

## Local Development

No build step required - open `index.html` directly or serve locally:

```bash
git clone https://github.com/SaharHalili95/multiplayer-tictactoe.git
cd multiplayer-tictactoe
npx serve .
```

## License

MIT
