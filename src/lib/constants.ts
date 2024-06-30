export const WS_URL =
  process.env.NODE_ENV === "production"
    ? "wss://api.tankio.orangius.com/ws"
    : "ws://localhost:5000/ws";
