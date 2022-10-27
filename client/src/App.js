import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import React, { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Booking from "./Pages/Booking";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  return (
    <StrictMode>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </Router>
      </div>
    </StrictMode>
  );
}

export default App;
