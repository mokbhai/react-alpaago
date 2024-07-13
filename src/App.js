// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.js";
import Navbar from "./Components/NavBar.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const storedUser = localStorage.getItem("user");

  // useEffect(() => {
  //   if (storedUser) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [storedUser]);

  return (
    <Router basename="/react-alpaago">
      <div className="App">
        <Navbar />
        <AppRoutes isLoggedIn={isLoggedIn} />
      </div>
    </Router>
  );
}

export default App;
