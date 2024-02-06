import React, { useState } from "react";
import db from "../Configs/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    isActive: "true",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <h1>Sigingup in Please Wait...</h1>
      </div>
    );
  }
  const handleNewUser = async () => {
    setLoading(true);
    const collectionRef = collection(db, "users");

    // Check if the email already exists
    const q = query(collectionRef, where("email", "==", newUser.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setError("User already exists with that email.");
      setLoading(false);
      return; // Exit the function early if user already exists
    }

    // Add the new user if email doesn't exist
    const newUserRef = await addDoc(collectionRef, newUser);

    localStorage.setItem(
      "user",
      JSON.stringify({ ...newUser, id: newUserRef.id })
    );

    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <h2>Signup</h2>
      {Error && <h2 className="error">{Error}</h2>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNewUser();
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="number"
          value={newUser.number}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
