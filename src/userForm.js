import React, { useState } from "react";

function UserForm({ onAddUser }) {
  const [newUser, setNewUser] = useState({
    email: "",
    isActive: true,
    number: "",
    password: "",
    name: "",
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
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const validateForm = (user) => {
    let errors = {};

    // Email validation
    if (!user.email || !user.email.includes("@")) {
      setFormErrors("Please enter a valid email address.");
    }

    // Name validation
    if (!user.name) {
      setFormErrors("Please enter your name.");
    }

    return errors;
  };

  return (
    <div>
      <h2>Add New User</h2>
      {formErrors && <p style={{ color: "red" }}>{formErrors}</p>}

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
