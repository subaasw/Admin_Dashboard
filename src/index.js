import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { AuthContextProvider } from "./Context/AuthContext";
import { DarkModeContextProvider } from "./Context/contextDarkMode";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
      
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
