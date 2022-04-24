import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";
import store from "./store";
// import { Provider } from "react-redux";

// const store = configureStore({
//   reducre: {},
// });

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
