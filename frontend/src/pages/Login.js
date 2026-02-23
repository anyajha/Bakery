import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

export default function Login() 
{

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("customer");

  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {e.preventDefault(); setError("");

    if (!email || !password) {

      setError("All fields are required");

      return;

    }

    try {

      await login(email, password, role); // backend role aware
      
 const savedUser = JSON.parse(localStorage.getItem("user"));
 if (savedUser?.role === "admin" || savedUser?.role === "vendor") {
   navigate("/admin");
 } else {
   navigate("/home");
 }
} catch {
 setError("Invalid credentials");


    }

  };

  return (
    <div className="login-wrapper">
<div className="login-page">
<form className="login-card" onSubmit={handleLogin}>
<h2>Login</h2>

        {error && <p className="error">{error}</p>}
<select value={role} onChange={(e) => setRole(e.target.value)}>
<option value="customer">Customer</option>
<option value="vendor">Vendor</option>
</select>
<input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

        />
<input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

        />
<button type="submit">Login</button>
<p className="switch-auth">

          New here?{" "}
<span onClick={() => navigate("/signup")}>

            Create Account
</span>
</p>
</form>
</div>
</div>

  );

}
 
