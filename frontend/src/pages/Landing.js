import React, { useState } from "react";
import Canvas from "../components/Canvas";

export default function Landing({ socket }) {
  // console.log(socket.id);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const handleCreateRoom = () => {
    socket.emit("create-room", name, (id) => {
      // setRoomId(id); // return the random room it created
      alert(`Joined room with id = ${id}`);
      // redirect to the settings page
    });
  };
  const handleJoin = () => {
    socket.emit("join-room", name, "random" /* roomId */, (information) => {
      alert(information);
    });
  };

  return (
    <>
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
          <div className="input-box__join">
            <input
              type="text"
              className="join-box__input"
              value={roomId}
              placeholder="join room code"
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={handleJoin}> Join Room </button>
          </div>
          <div className="input-box__create">
            {/* maybe not need this div */}
            <button onClick={handleCreateRoom}> Create Room </button>
          </div>
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
