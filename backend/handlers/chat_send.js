module.exports = function (io) {
  io.on("send-message", (message) => {
    io.broadcast.emit(message);
  });
};
