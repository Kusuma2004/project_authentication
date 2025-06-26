import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });

  console.log("res.data = ", res.data); // 👀 inspect this in your console

  const user = res.data.user || {
    name: res.data.name,
    email: res.data.email,
  };

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(user));

  navigate("/");
} catch (err) {
  const msg = err.response?.data?.msg || "Login failed";
  setError(msg);
}

  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
       <p style={{ marginTop: 16 }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#4CAF50", textDecoration: "underline" }}>
          Register here
        </Link>
      </p>
    </div>
  );
}
