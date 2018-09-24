import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { HashRouter } from "react-router-dom";
import createHistory from "history/createHashHistory";

import App from "containers/App";
import configureStore from "./configureStore";
import "./styles.css";

// Create redux store with history
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("root");

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <HashRouter>
          <App />
        </HashRouter>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE
  );
};
