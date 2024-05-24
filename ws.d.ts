import {} from "ws";

declare module "ws" {
  interface WebSocket {
    isAlive: boolean;
    id: string | null;
    type: string | null;
  }
}
