import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import Store from "./redux/store";
import {Provider} from "react-redux";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),

);
