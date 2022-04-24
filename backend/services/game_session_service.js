const gameSocket = require("./gameSocket");
const io = gameSocket.getInstance();
// no need to import io at all.
// const GameSession = require("../models/gameSession");

class GameSessionService {
  constructor(session) {
    this._sessoin = session;
  }

  joinSession(player) {
    this._session.addPlayer(player);
  }

  /* createSession(player) { to be in handler
    const newSession = new GameSession();
    newSession.addPlayer(player);
    this._liveSessions[newSession.sessionId] = newSession;
  } */

  startSessionRound() {
    if (this._session.playedRounds >= this._session.maxRounds) {
      this.syncRoomState();
      io.to(this._session.sessionId).emit("game/end");
    }
    this._session.roundStart();
    this.sendWordToDrawer();
    this.syncRoomState();
    setTimeout(() => {
      this.revealWord();
      this._session.roundEnd();
      this.syncRoomState();
    }, this._session.roundDuration * 1000);

    setTimeout(() => {
      this.startSessionRound();
    }, (this._session.roundDuration + this._session.roundBuffer) * 1000);
  }

  playerGuess(player, word) {
    const res = this._session.playerMakesAGuess(player, word);
    if (res) {
      this.syncRoomState();
    }
    return res;
  }

  syncRoomState() {
    io.to(this._session.sessionId).emit("sync/room", {});
  }

  sendWordToDrawer() {
    const drawer = this._session.drawer;
    const word = this._session.currentWord();
    // it was io earlier
    io.to(drawer.playerId).emit("round/word", {
      word,
    });
  }
  revealWord() {
    const word = this._session.currentWord();
    io.to(this._session.sessionId).emit("round/word", {
      word,
    });
  }
}

module.exports = GameSessionService;
