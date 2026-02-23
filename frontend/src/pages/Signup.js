import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/login.css";

export default function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("customer");

  const [error, setError] = useState("");

  const { signup } = useAuth();

  const navigate = useNavigate();

  const validate = () => {

    if (!name.trim()) return "Name is required";

    if (!email.includes("@")) return "Invalid email";

    if (password.length < 6) return "Password must be at least 6 characters";

    return "";

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");

    const validationError = validate();

    if (validationError) {

      setError(validationError);

      return;

    }

    try {

      await signup(name, email, password, role);

      navigate("/login");

    } catch {

      setError("Signup failed");

    }

  };

  return (

     <div className="signup-wrapper">
<div className="login-page">
<form className="login-card" onSubmit={handleSignup}>
<h2>Create Account</h2>

        {error && <p className="error">{error}</p>}
<select value={role} onChange={(e) => setRole(e.target.value)}>
<option value="customer">Customer</option>

</select>
<input

          type="text"

          placeholder="Full Name"

          value={name}

          onChange={(e) => setName(e.target.value)}

        />
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
<button type="submit">Sign Up</button>
<p className="switch-auth">

          Already have an account?{" "}
<span onClick={() => navigate("/login")}>

            Login
</span>
</p>
</form>
</div>
</div>

  );

}
 
