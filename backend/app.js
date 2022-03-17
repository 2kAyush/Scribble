const { instrument } = require("@socket.io/admin-ui");
const express = require("express");
const GameSocketService = require("./services/gameSocket");
const GameSessionService = require("./services/gameSession");
const http = require("http");

const PORT = 4000;
const app = express();
const server = http.createServer(app);
GameSocketService.init(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`a user connected with id = ${socket.id}`);
  socket.on("join_room", (name, roomId, avatar) => {
    gameSession = GameSessionService.getGameSession();
    gameSession.leaderBoard.push({
      id: socket.id,
      name,
      avatar,
      score: 0,
      host: false,
    });
  });

  socket.on("create_room", (name, avatar) => {
    GameSessionService.init(name, socket.id, avatar);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

/* 
const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("click", (data, obj) => {
    console.log("clicked with id =", socket.id);
    console.log(data, obj);
  });

  socket.on("create-room", (name, response) => {
    console.log(name, "; id:-> ", socket.id);
    response("random");
  });
  socket.on("join-room", (name, room, callback) => {
    // console.log(name, "; id:-> ", socket.id);
    socket.join(room);
    callback(`joined ${room} with id=${socket.id}`);
  });
});
 */
instrument(io, {
  auth: false,
});
