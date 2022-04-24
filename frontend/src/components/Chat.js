import React, { useState } from "react";

function Chat({ socket }) {
  const [message, setMessage] = useState("");
  socket.on("session/chat", (name, message) => {
    // push this messaage in the messages div
    console.log(name, message);
    // console.log("break");
  });
  const handleSendMessage = (e) => {
    console.log("clicked send button", message);
    if (message !== "") {
      // console.log("came to emit");
      socket.emit("session/chat", "random" /* roomName */, message);
    }
    // add player_id, roomId as well in the parameters
  };
  return (
    <>
      <div className="messages">
        <h1>All messages</h1>
      </div>
      <div className="message">
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="message__send" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </>
  );
}

export default Chat;
