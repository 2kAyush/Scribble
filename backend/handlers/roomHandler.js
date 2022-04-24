const LiveGamesService = require("../services/live_games_service");
const GameSessionService = require("../services/game_session_service");

function createRoom(player, settings) {
  const gameSession = LiveGamesService.createGame(player, settings); // this will be host
  console.log(player.playerId);
  gameSession.addPlayer(player);
  return gameSession;
}

function joinRoom(player, sessionId) {
  console.log(player);
  const gameSession = LiveGamesService.findGame(sessionId);
  gameSession.addPlayer(player);
}

function chatAndGuess(player, message) {
  const gameSession = LiveGamesService.getSessionId(
    player.activeGame.sessionId
  );
  const gameSessionService = new GameSessionService(gameSession);
  gameSessionService.playerGuess(player, message);
  // need to emit the message accordingly as well.
}

module.exports = { joinRoom, createRoom, chatAndGuess };
