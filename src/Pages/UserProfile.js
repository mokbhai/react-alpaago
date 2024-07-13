// UserProfile.js
import React, { useEffect, useState } from "react";
import db from "../Configs/FirebaseConfig.js";
import { getDoc, doc } from "firebase/firestore";

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve user credentials from local storage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not found in local storage");
      return;
    }
    const user = JSON.parse(storedUser);

    const fetchUserProfile = async () => {
      try {
        const userSnapshot = await getDoc(doc(db, "users", user.id));
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserProfile({
            ...userData,
            createdAt: userData.createdAt?.toDate(),
            updatedAt: userData.updatedAt?.toDate(),
          });
          setLoading(false);
        } else {
          setError("User profile not found");
        }
      } catch (error) {
        setError("Error fetching user profile");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading... Please Wait.</h1>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <strong>isActive:</strong>
            {userProfile.isActive === "true" ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Created At:</strong>
            {userProfile.createdAt ? userProfile.createdAt.toString() : ""}
          </p>
          <p>
            <strong>Updated At:</strong>
            {userProfile.updatedAt ? userProfile.updatedAt.toString() : ""}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
