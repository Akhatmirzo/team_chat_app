import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";
import ChatContext from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContext>
      <ChatContext>
        <App />
      </ChatContext>
    </UserContext>
    <ToastContainer />
  </BrowserRouter>
);
