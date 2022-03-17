const { Server } = require("socket.io");

class GameSocket {
  instance = null;

  init(htttpServer) {
    if (this.instance) return;
    this.instance = new Server(htttpServer);
  }

  getInstance() {
    return this.instance;
  }
}

module.exports = GameSocket;
