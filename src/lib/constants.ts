export const WS_URL =
  process.env.NODE_ENV === "production"
    ? "wss://api.tankio.orangius.xyz/ws"
    : "ws://localhost:5000/ws";
