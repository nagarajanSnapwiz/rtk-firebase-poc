import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

import * as ReactDOMClient from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
