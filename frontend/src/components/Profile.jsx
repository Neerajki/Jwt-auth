// src/components/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8000/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return user ? (
    <div className="flex flex-col items-center justify-center gap-8 mt-8">
      <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
      <button className="text-xl bg-red-500 px-8 py-2 rounded text-white font-bold" onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Profile;
