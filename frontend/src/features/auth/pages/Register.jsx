
import "./auth.form.scss";
import { Link } from "react-router";
import {useNavigate} from 'react-router'
import {useAuth} from '../hooks/useAuth'
import {useState} from "react"
const Register = () => {

  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");

  const {loading,handleRegister}=useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const registered = await handleRegister({username,email,password});
    if (registered) {
      navigate("/");
    }
  };


  if(loading){
    return(<main><h1>Loading...</h1></main>)
  }
  return (
    <main className="auth-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-groups">
            <label htmlFor="name">
              Username
              <input
              onChange={(e)=>{setUsername(e.target.value)}}
                type="text"
                id="name"
                name="username"
                placeholder="Enter username"
                required
              />
            </label>
            <label htmlFor="email">
              Email
              <input
               onChange={(e)=>{setEmail(e.target.value)}}
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
               onChange={(e)=>{setPassword(e.target.value)}}
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                required
              />
            </label>
          </div>

          <button className="button primary-btn" type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
