import React, { useState } from "react";

function UserForm({ onAddUser }) {
  const [newUser, setNewUser] = useState({
    email: "",
    isActive: true,
    number: "",
    password: "",
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform field validation
    const errors = validateForm(newUser);
    if (Object.keys(errors).length !== 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors(null);
    }

    onAddUser(newUser);
    setNewUser({
      email: "",
      isActive: true,
      number: "",
      password: "",
      name: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
      updatedAt: new Date(), // Update updatedAt whenever there's an input change
    });
  };

  const validateForm = (user) => {
    let errors = {};

    // Email validation
    if (!user.email || !user.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    // Name validation
    if (!user.name) {
      errors.name = "Please enter your name.";
    }

    return errors;
  };

  return (
    <div>
      <h2>Add New User</h2>
      {formErrors && (
        <div style={{ color: "red" }}>
          {Object.values(formErrors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
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

        <label>Active:</label>
        <select
          name="isActive"
          value={newUser.isActive}
          onChange={handleInputChange}
          required
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>

        <label>Number:</label>
        <input
          type="number"
          name="number"
          value={newUser.number}
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

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
