import React from "react";
import "./App.css";
import Auth from "./pages/Auth";
import ChatApp from "./pages/ChatApp";
import { Route, Routes } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && token !== undefined ? (
        <Routes>
          <Route path="/" element={<ChatApp />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
