import { createRoot } from "react-dom/client";
import { App } from "./app";
import React from "react";
import { Provider } from 'react-redux';

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
      <App/>
);
