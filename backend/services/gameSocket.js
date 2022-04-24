const { Server } = require("socket.io");

class GameSocket {
  instance = null;

  init(htttpServer) {
    if (this.instance) return;
    this.instance = new Server(htttpServer, {
      cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
      },
    });
  }

  getInstance() {
    return this.instance;
  }
}

module.exports = new GameSocket();
