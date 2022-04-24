const { v4 } = require("uuid");

class GameSession {
  constructor(host) {
    // this will be player (host)
    // just copy all these into a reStartGame() function and call it inside the constructor
    // when ever new game is started again then simply call that function
    this.sessionId = v4();
    this.players = [];
    this.drawer = null;
    this.playedRounds = 0;
    this.host = host;
    this.roundDuration = 60;
    this.roundBuffer = 5;
    this.maxRounds = 3;

    this._currentRoundId = null;
    this._currentWord = null;
    this._scoreboard = {};
    this._currentRoundGuessers = [];
    this._nextDrawerIndex = 0;
  }

  changeSettings(settings) {
    this.roundDuration = settings[0];
    this.maxRounds = settings[1];
  }

  addPlayer(player, socket) {
    // socket is not passed in the function
    this.players.push(player);
    player.setActiveGame(this);
    this._scoreboard[player.playerId] = {
      points: 0,
      roundScores: {}, // {roundID:score of that round}
    };
    player.socket.join(this.sessionId);
    // socket.join(this.sessionId);
  }

  removePlayer(player) {
    this.players = this.players.filter((e) => e !== player);
    if (this.host === player) {
      this.host = this.players[0];
    }
    this.socket.emit("disconnect", player); // can give error.
  }

  get currentWord() {
    return this._currentWord;
  }

  roundStart() {
    const playerCtr = this.players.length;
    if (playerCtr >= 2) {
      this._currentRoundId = v4();
      this._currentWord = "something";
      this.drawer = this.players[this._nextDrawerIndex];
      this._nextDrawerIndex = (_nextDrawerIndex + 1) % playerCtr;
      if (this._nextDrawerIndex == 0) {
        this.playedRounds++; // this logic is correct
      }
    }
  }

  roundEnd() {
    this._currentRoundId = null;
  }

  playerMakesAGuess(player, guess) {
    if (this._scoreboard[player.playerId].roundScores[this.currentRoundId]) {
      return true;
    }
    if (this._currentRoundId && this._currentWord === guess) {
      let gainedPoints = 10;
      const scoreboard = this._scoreboard[player.playerId];
      this._currentRoundGuessers.push_back(player); // implement a scoring logic now comment
      // all the scoreboard updations inside this function.
      scoreboard.points += gainedPoints;
      scoreboard.roundScores[this._currentRoundId] = gainedPoints;
      return true;
    }
    return false;
  }
  scoreAssigning() {
    if (len == 0) return {};
    let len = this._currentRoundGuessers.length;
    let currentLeaderboard = {};
    this.scorecoreboard[this.drawer.playerId].points += (len / 2) * 45 + 50;
    // +50 done for len = 1
    this._currentRoundGuessers.forEach((player) => {
      this.scorecoreboard[player.playerId].points += len * 45;
      currentLeaderboard[player] = len * 45;
      len--;
    });
    return leaderBoard; // to display the scores obtained by the players in the current round
  }
}

module.exports = GameSession;
