import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [userProfile, setUserProfile] = useState(null);
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserProfile(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [storedUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserProfile(null);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/news" className="nav-link">
            News
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
