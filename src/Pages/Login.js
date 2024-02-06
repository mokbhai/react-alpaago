import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../Configs/FirebaseConfig";

function Login() {
  const navigate = useNavigate();
  const [Error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("email", "==", credentials.email));
      const querySnapshot = await getDocs(q);
      let isAuthenticated = false;

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.password === credentials.password) {
          isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify({ ...user, id: doc.id }));

          navigate("/");
          window.location.reload();
        }
      });

      if (!isAuthenticated) {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setError("Failed to login. Please check your email and password.");
      console.error("Error logging in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h1>Logging in Please Wait...</h1>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      {Error && <h2 className="error">{Error}</h2>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
