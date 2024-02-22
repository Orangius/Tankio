"use client"
import { ReactNode, useCallback, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { QueryParams } from "react-use-websocket/dist/lib/types"

const WS_URL = "ws://localhost:3000/api/devices"
const USERNAME = "dashboard_secret"

export default function App() {
  const [message, setMessage] = useState()
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.")
    },
    queryParams: { id: USERNAME },
    share: true,
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: 3000,
    onMessage: (message) => {
      console.log("Message Received: ", message.data)
      setMessage(message.data)
    },
  })
  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), [])

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState]

  return (
    <>
      <div>Hello WebSockets!</div>
      {message ? (
        <div>
          <h1>There is a message: {message}</h1>
        </div>
      ) : null}
      <button
        className="mt-3 bg-primary-foreground h-10 w-24"
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
    </>
  )
}
