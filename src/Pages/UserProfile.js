// UserProfile.js
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Retrieve user credentials from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserProfile(user);
    }
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {userProfile.number}
          </p>
          <p>
            <strong>isActive:</strong> {userProfile.isActive}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
