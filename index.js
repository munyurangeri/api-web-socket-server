import http from "http";
import dotenv from "dotenv";
import app from "./src/app.js";
import { initializeWebSocket } from "./src/websocket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// HTTP Server
const server = http.createServer(app);

// Initialize WebSocket
initializeWebSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
