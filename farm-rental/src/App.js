// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Navbar from "./Navbar_Temp";
import FarmList from "./FarmList";
import FarmDetail from "./FarmDetail";
import About from "./About";
import Login from "./LogComp";
import Signup from "./Signin";
import Booking from "./Booking";
import Provinces from "./Provinces";
import FarmsInfo from "./FarmsInfo";
import Home from "./Home.js";

import "./styleComp.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />{" "}
          <Route path="/provinces" element={<Provinces />} />
          <Route path="/farms" element={<FarmList />} />
          <Route path="/farminfo" element={<FarmsInfo />} />
          <Route path="/farm/:id" element={<FarmDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
