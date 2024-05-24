// pages/api/hello.js
//import { NextRequest, NextResponse } from "next/server"
// export async function GET() {
//   return NextResponse.json({ message: "Hello World" })

import { updateTankLevel } from "@/lib/serverActions";

// }
interface messageType {
  type: string;
  message: string;
  sender: string;
  receiverID: string;
}

var connectedClients: Array<import("ws").WebSocket> = [];
export function SOCKET(
  client: import("ws").WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  console.log("A client connected!");

  client.isAlive = true;
  connectedClients.push(client);
  console.log("Number of connected clients: ", connectedClients.length);

  //   console.log(request.url?.searchParams.get("name") as string)
  const { searchParams } = new URL(
    request.url!,
    `http://${request.headers.host}`
  );
  client.id = searchParams.get("id");
  client.type = searchParams.get("type");

  console.log("device ID: ", client.id);
  console.log("device type: ", client.type);

  // if the hardware just connected, the dashboard should be updated
  alertDashboardOnConnectOrDisconnect(client, "online");

  client.on("message", (message) => {
    // const mes = message.toJSON()
    const messageObject: messageType = JSON.parse(message.toString());
    console.log("message object: ", messageObject);

    if (messageObject.type == "checkIfOnline") {
      console.log("Check if online message");
      checkOnlineStatus(messageObject, client);
    } else if (messageObject.type == "updateTankLevel") {
      //update the database, and write the cureent tank water level
      let tankMonitorId = client.id;
      updateTankLevel(tankMonitorId, Number(messageObject.message));
      //send a message to the dashboard, so that it can update the level being shown
      let receipient = connectedClients.find((client) => {
        return (
          client.id === messageObject.receiverID && client.type === "dashboard"
        );
      });
      console.log(messageObject);
      //console.log("Command goes to: ", receipient);
      receipient?.send(JSON.stringify(messageObject));
    } else if (messageObject.type == "comm") {
      console.log("Command message");
      let receipient = connectedClients.find((client) => {
        return (
          client.id === messageObject.receiverID &&
          client.type !== messageObject.sender
        );
      });
      //console.log("Command goes to: ", receipient);
      receipient?.send(JSON.stringify(messageObject));
    }
  });

  client.on("pong", () => {
    console.log("Pong received");
    client.isAlive = true;
  });

  client.on("close", () => {
    console.log("A client disconnected!");
    // client.terminate();
    // connectedClients = connectedClients.filter((item) => item !== client);
    // alertDashboardOnConnectOrDisconnect(client, "offline");
    //console.log("This is the client that disconnected", client);
  });

  function heartbeat() {
    setInterval(() => {
      connectedClients.forEach((client) => {
        if (!client.isAlive) {
          //client.terminate();
          connectedClients = connectedClients.filter((item) => item !== client);
          console.log("A client was removed");

          alertDashboardOnConnectOrDisconnect(client, "offline");

          return;
        }
      });
      client.isAlive = false;
      client.ping();
    }, 5000);
  }

  heartbeat();
}

function checkOnlineStatus(message: messageType, client: any) {
  connectedClients.forEach((element) => {
    console.log("Element ID: ", element.id);
    console.log("Element type: ", element.type);
  });
  let receipient = connectedClients.find((client) => {
    return client.id === message.receiverID && client.type === "hardware";
  });
  console.log("Number of connected clients: ", connectedClients.length);
  if (receipient) {
    console.log("Found a recipient");
    const response = {
      type: "checkIfOnline",
      message: "online",
      sender: "server",
      receiverID: message.receiverID,
      s,
    };
    client.send(JSON.stringify(response));
  } else {
    console.log("Found no recipient");
    const response = {
      type: "checkIfOnline",
      message: "offline",
      sender: "server",
      receiverID: message.receiverID,
    };
    client.send(JSON.stringify(response));
  }
}

function alertDashboardOnConnectOrDisconnect(client: any, messageType: string) {
  const dashboardClient = connectedClients.find((obj) => {
    return obj.id === client.id && obj.type === "dashboard";
  });

  console.log("Client to update:", dashboardClient?.id);

  if (dashboardClient) {
    const response = {
      type: "checkIfOnline",
      message: messageType,
      sender: "server",
      receiverID: dashboardClient.id,
    };

    dashboardClient.send(JSON.stringify(response));
  }
}
