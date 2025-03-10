import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const errorNotify = (msg: string) => toast.error(msg);
  const successNotify = (msg: string) => toast.success(msg);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorNotify("Passwords do not match!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, password, role }));

    successNotify("Signup successful! Redirecting to login...");
    navigate("/login");
  };

  return (
    <div className="container">
      <form onSubmit={handleSignup} className="form">
        <h2 className="title">Signup Page</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
