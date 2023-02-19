import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import App from "./App";
import store from "./app/store.js";
import { injectStore } from "./utils/APIRequest";

import "./index.css";

if (import.meta.env.MODE === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

injectStore(store);
