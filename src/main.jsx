import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./userContext";
// import { myContext } from "./userContext";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
);
