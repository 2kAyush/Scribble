import React from "react";
import { io } from "socket.io-client";
import Landing from "./pages/Landing";
// import WaitingRoom from "./pages/WaitingRoom";
// import LiveGame from "./pages/LiveGame";
const socket = io("http://localhost:4000");

function App() {
  // socket.on("connect", () => {
  //   console.log(`You're Connected with id:-> ${socket.id}`);
  // });

  return (
    <div className="App">
      <h1 className="scribbl_heading">Skribbl</h1>
      <Landing socket={socket} />
      {/* <WaitingRoom /> */}
      {/* <LiveGame /> */}
    </div>
  );
}

export default App;
