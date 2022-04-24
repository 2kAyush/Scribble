const GameSession = require("../models/gameSession");

class LiveGamesService {
  _liveGames = {};
  _allPlayers = {}; // will store mapping => playerId:socket

  createGame(host, settings) {
    const gameSession = new GameSession(host);
    gameSession.changeSettings(settings);
    this._liveGames[gameSession.sessionId] = gameSession;
    return gameSession;
  }

  findGame(sessionId) {
    return this._liveGames[sessionId];
  }

  playerJoined(playerId, socket) {
    this._ALL_PLAYERS[playerId] = socket;
  }
}

module.exports = new LiveGamesService();
