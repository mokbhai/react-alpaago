import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom"; // Update import statement
import "./App.css";
import WeatherApp from "./WeatherApp";
import UsersApp from "./userApp";
import Login from "./login";
import Signup from "./Signup";
import UserProfile from "./UserProfile";

function Navbar() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserProfile(user);
    }
  }, [storedUser]);

  // Define handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Redirect to the profile page if the user is logged in and tries to access the login page
  if (
    window.location.pathname === "/login" ||
    (window.location.pathname === "/signup" && userProfile)
  ) {
    navigate("/profile");
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
        {userProfile ? (
          <>
            <li>
              <Link to="/profile" className="nav-link">
                {userProfile.email}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<WeatherApp />} />
          <Route path="/users" element={<UsersApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
