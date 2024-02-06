// Import necessary dependencies
import React, { useState, useEffect } from "react";
import UserForm from "./userForm";
import "./Styles/userApp.css";
import db from "../Configs/FirebaseConfig";
import {
  onSnapshot,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const UserApp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false); // Set loading to false when data is fetched
    });

    return () => unsubscribe();
  }, []);
  // Assuming loading is a boolean state indicating whether data is loading

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading... Please Wait.</h1>
      </div>
    );
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      toggleSortOrder();
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedUsers = users.sort((a, b) => {
    const valueA = sortColumn ? a[sortColumn] : "";
    const valueB = sortColumn ? b[sortColumn] : "";

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getPasswordStrength = (password) => {
    if (typeof password === "string" && password.length >= 8) {
      return <span style={{ color: "green" }}>&#10003; Strong</span>;
    } else {
      return <span style={{ color: "red" }}>&#9888; Weak</span>;
    }
  };

  const handleNewUser = async (newUser) => {
    const collectionRef = collection(db, "users");
    await addDoc(collectionRef, newUser);
  };

  const handleUserStatusChange = async (userId, isActive) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      isActive: isActive,
    });
  };

  const handleDeleteUser = async (userId) => {
    const userRef = doc(db, "users", userId);
    await deleteDoc(userRef);
  };

  const sortIndicator = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <div className="user-list-container">
      {showForm ? (
        <UserForm
          onAddUser={handleNewUser}
          fields={["name", "isActive", "email", "password"]}
        />
      ) : (
        <button onClick={() => setShowForm(true)}>Add new user</button>
      )}
      <h2>User List</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th onClick={() => handleSort("name")}>
              Name {sortIndicator("name")}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortIndicator("email")}
            </th>
            <th onClick={() => handleSort("isActive")}>
              Active {sortIndicator("isActive")}
            </th>
            <th onClick={() => handleSort("number")}>
              Number {sortIndicator("number")}
            </th>
            <th>Password Strength</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.isActive}
                  onChange={(e) =>
                    handleUserStatusChange(user.id, e.target.value)
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </td>
              <td>{user.number}</td>
              <td>{getPasswordStrength(user.password)}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserApp;
