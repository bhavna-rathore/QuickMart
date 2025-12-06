import React from "react";
import ReactDOM from "react-dom";
import "./styles/base.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom"

import { Provider } from "react-redux";
import { store } from "./redux/store";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
                <App />
      </Provider></Router>
  </React.StrictMode>,
  document.getElementById("root")
);

