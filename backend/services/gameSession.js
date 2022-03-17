class GameSession {
  roomId = -1;
  leaderBoard = [];
  gameSession = null;

  constructor(roomId, leaderBoard) {
    this.roomId = roomId;
    this.leaderBoard = leaderBoard;
  }

  init(name, id, avatar) {
    if (this.gameSession === null) {
      this.gameSession = new GameSession("random", [
        { id, name, avatar, score: 0, host: true },
      ]); // 0 stands for score
    } else return;
  }
  getGameSession() {
    return this.gameSession;
  }
}

module.exports = GameSession;
