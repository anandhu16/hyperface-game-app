import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import { useState } from "react";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/leaderBoard" element={<LeaderBoard />} />
        </Routes>
        {/* <LeaderBoard /> */}
      </div>
    </Router>
  );
}

export default App;
