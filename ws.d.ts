import { Websocket } from "ws"

declare module "ws" {
  interface WebSocket {
    isAlive: boolean
    identification: string | null
  }
}
