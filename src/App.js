import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Login from "./components/Login/Login";

function App() {
  const [status, setStatus] = useState("offen");
  
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Content />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
