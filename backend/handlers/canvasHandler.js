function draw(socket, commands, sessionId) {
  socket.to("random").emit("draw/command", commands); // testing purpose
  // socket.to(sessionId).emit("draw/command", commands); // real one
}

module.exports = { draw };
