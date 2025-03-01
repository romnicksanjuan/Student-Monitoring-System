const WebSocket = require("ws");

let wss = null;

const initializeWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("close", () => console.log("Client disconnected"));
  });

  console.log("WebSocket server initialized");
};

// Function to send audio to all connected clients
const sendAudio = (base64Data) => {
  if (!wss) {
    console.error("WebSocket server not initialized!");
    return;
  }

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log("Sending audio...");
      client.send(base64Data);
      client.send("END"); // Signal end of file
    }
  });
};

module.exports = { initializeWebSocket, sendAudio };
