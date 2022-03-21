import React from "react";
import Settings from "../components/Settings";
import Players from "../components/Players";

export default function WaitingRoom() {
  // fetch all the players from sockets;
  return (
    <>
      <div className="waiting-room">
        <h1>WaitingRoom</h1>
        <div className="container-lobby">
          <Settings />
          <Players />
        </div>
        <div className="invite">
          <h1>Copy this code: </h1>
        </div>
      </div>
    </>
  );
}
