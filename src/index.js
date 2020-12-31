import React from "react";
import ReactDOM from "react-dom";
import "./css/main.scss";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import Routes from "./service/routes";
import history from "./service/history";
import { CssBaseline } from "@material-ui/core";
import {Provider} from 'react-redux'
import store from './redux/store/Store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
