import { useState } from "react";
import { Link } from "react-router";
import "./auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import {useNavigate} from 'react-router';


const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const loggedIn = await handleLogin({ email, password });
    if (loggedIn) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main className="auth-page">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-groups">
            <label htmlFor="email">
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </label>
          </div>

          <button className="button primary-btn" type="submit">
            Login
          </button>
        </form>
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
