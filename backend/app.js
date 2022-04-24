const { instrument } = require("@socket.io/admin-ui");
const express = require("express");
const http = require("http");
const gameSocket = require("./services/gameSocket");
// const GameSessionService = require("./services/game_session_service");
const Player = require("./models/player");

// all handlers
const { draw } = require("./handlers/canvasHandler");
const {
  joinRoom,
  createRoom,
  chatAndGuess,
} = require("./handlers/roomHandler");

// server creation
const PORT = 4000;
const app = express();
const server = http.createServer(app);
gameSocket.init(server);
const io = gameSocket.getInstance();

io.on("connection", (socket) => {
  // console.log(`a user connected with id = ${socket.id}`);
  const player = new Player(socket);
  console.log("new player with id =", player.playerId);
  socket.on("session/create", (name, settings, callback) => {
    console.log(name, settings);
    player.setName(name);
    const createdRoom = createRoom(player, settings);
    callback(player.playerId, createdRoom);
  });

  socket.on("session/join", (name, sessionId, callback) => {
    player.setName(name);
    // console.log("this is the player: ", player);
    // joinRoom(player, sessionId); // this will only work if the room is created
    socket.join(sessionId);
    callback(`joined Room`);
  });

  socket.on("draw/command", (commands) => {
    draw(socket, commands, socket);
  });

  socket.on("session/chat", (room, message) => {
    // chatAndGuess(player, message, socket);
    // console.log(room, message);
    socket.broadcast.emit("session/chat", room, message);
    // socket.to(room).emit("session/chat", room, message);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

/* 
inside the io.on("connection") :
socket.on("create-room", (name, callback) => {
    console.log(name);
    callback("random");
    // GameSessionService.init(name, socket.id, avatar);
  });

  socket.on("join-room", (name, roomId, callback) => {
    console.log(name, roomId);
    callback(`Joined room ${roomId}`);
    gameSession = GameSessionService.getGameSession();
    gameSession.leaderBoard.push({
      id: socket.id,
      name,
      avatar,
      score: 0,
      host: false,
    });
  });
 */
instrument(io, {
  auth: false,
});
