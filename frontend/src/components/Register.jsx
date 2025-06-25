// src/components/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register", { email, password }, {
  headers: {
    "Content-Type": "application/json"
  } } );
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col items-center justify-center gap-8 h-screen w-full">
      <h2 className="text-2xl font-bold">Register</h2>
      {/* <label className="text-lg font-semibold">Email:</label> */}
      <input className="w-64 h-8  outline-2 rounded pl-2" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input className="w-64 h-8  outline-2 rounded pl-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"  type="submit">Register</button>
    </form>
  );
}

export default Register;
