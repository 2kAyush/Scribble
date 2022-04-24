const { v4 } = require("uuid");

class Player {
  constructor(socket) {
    this.playerId = v4();
    this.name = "Guest";
    this.socket = socket;
    this.activeGame = null;

    this.socket.join(this.playerId); // this basically means every player will be in a seperate room.
    // socket.join(this.playerId);
  }

  setName(name) {
    this.name = name;
  }

  setActiveGame(session) {
    this.activeGame = session;
  }
}

module.exports = Player;
