import React, { useState } from "react";
import Canvas from "../components/Canvas";
import Chat from "../components/Chat"; // don't need to have chat in the Landing page.
// Just for testing purpose.

export default function Landing({ socket }) {
  // console.log(socket.id);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const handleCreateRoom = () => {
    socket.emit("session/create", name, [60, 5], (playerId, roomId) => {
      // add PlayerId in a global state array. (maybe)
      // setRoomId(id); // return the random room it created
      alert(`Joined room with id = ${roomId}`);
      // setPlayerId = playerId;
      // update the roomId in the global state.
    });
  };
  const handleJoin = () => {
    // update the roomId in the global state then emit.
    socket.emit("session/join", name, roomId, (information) => {
      alert(information);
    });
  };

  return (
    <>
      <Chat socket={socket} />
      <div className="join-box">
        {/* replace this div with the canvas component */}
        <Canvas socket={socket} />
        <div className="input-box">
          <input
            type="text"
            className="input-box__name"
            value={name}
            placeholder="Enter your name"
            // style={{ height: "24px" }} // hardcoded (don't change this unless necessary to)
            onChange={(e) => setName(e.target.value)}
          />
          {/* <div className="input-box__join"> */}
          <input
            type="text"
            className="join-box__input"
            value={roomId}
            placeholder="join room code"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleJoin}> Join Room </button>
          {/* </div> */}
          {/* <div className="input-box__create"> */}
          {/* maybe not need this div */}
          <button onClick={handleCreateRoom}> Create Room </button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

/* <input
          type="text"
          className="join-box__input"
          value={name}
          placeholder="Enter your name"
          style={{ height: "24px" }} // hardcoded (don't change this unless necessary to)
          onChange={(e) => setName(e.target.value)}
        />
        <div className="doddle-drawer"></div>
        <div className="join-box__join">
          <input
            type="text"
            className="join-box__input"
            value={roomId}
            placeholder="join room code"
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={handleJoin}> Join Room </button>
        </div>

        <button onClick={handleCreateRoom}> Create Room </button>
      </div>
*/
