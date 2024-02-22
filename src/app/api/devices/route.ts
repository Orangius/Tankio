// pages/api/hello.js
//import { NextRequest, NextResponse } from "next/server"
// export async function GET() {
//   return NextResponse.json({ message: "Hello World" })
// }

let connectedClients: Array<import("ws").WebSocket> = []
export function SOCKET(
  client: import("ws").WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  console.log("A client connected!")
  client.isAlive = true
  connectedClients.push(client)

  //   console.log(request.url?.searchParams.get("name") as string)
  const { searchParams } = new URL(
    request.url!,
    `http://${request.headers.host}`
  )
  const param = searchParams.get("id")
  client.identification = param
  console.log("device ID: ", client.identification)

  client.on("message", (message) => {
    console.log("Message in server: ", message.toString("utf-8"))
    const id = client.identification
    let parts = id?.split("_")
    let direction: string = ""
    let deviceIdentifier: string = ""
    // parts now contains an array with two elements, part1 and part2
    if (parts) {
      direction = parts[0]
      deviceIdentifier = parts[1]
    } else {
      return
    }

    connectedClients.forEach((obj) => {
      console.log(obj.identification)
    })

    let recipient = connectedClients.find(
      (obj) =>
        obj.identification?.split("_")[1] === deviceIdentifier &&
        obj.identification?.split("_")[0] !== direction
    )

    if (!recipient) {
      client.send("Recipient offline")
      console.log("Recipient offline")
    }
    //console.log(deviceIdentifier)
    console.log("Connected Clients ID")
    connectedClients.forEach((obj) => {
      console.log(obj.identification)
    })
    console.log("....................................................")
    console.log(direction)
    //console.log("receipient: ", recipient)
    // .log(recipient?.identification)
    // console.log("message from client: ", message)
    recipient?.send(message.toString("utf-8"))
  })

  client.on("pong", () => {
    console.log("Pong received")
    client.isAlive = true
  })

  client.on("close", () => {
    console.log("A client disconnected!")
  })

  function heartbeat() {
    setInterval(() => {
      connectedClients.forEach((client) => {
        if (!client.isAlive) {
          client.terminate()
          connectedClients = connectedClients.filter((item) => item !== client)
          console.log("A client was removed")
          return
        }
      })
      client.isAlive = false
      client.ping()
    }, 5000)
  }

  heartbeat()
}
