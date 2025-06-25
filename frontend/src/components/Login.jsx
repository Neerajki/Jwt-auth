// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.append("username", email);
    data.append("password", password);

    try {
      const res = await axios.post("http://localhost:8000/login", data);
      localStorage.setItem("token", res.data.access_token);
      alert("Logged in!");
      navigate("/");
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center justify-center gap-8 h-screen w-full ">
      <h2 className="text-2xl font-bold">Login</h2>
      <input className="w-64 h-8  outline-2 rounded pl-2" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder=" Enter Your Email" required />
      <input className="w-64 h-8 outline-2 rounded pl-2 "  type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Your Password" required />
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg" type="submit">Login</button>
    </form>
  );
}

export default Login;
