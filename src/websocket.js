import { WebSocketServer } from "ws";

let wss;

export function initializeWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("client connected");
    socket.on("message", (message) => {});

    socket.on("close", () => {
      console.log("client disconnected");
    });
  });
}

export function broadcast(event, data) {
  if (!wss) return;

  const payload = JSON.stringify({ event, data });

  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) client.send(payload);
  });
}
