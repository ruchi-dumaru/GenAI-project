import {Link} from "react-router";
import "./auth.form.scss";

const Login = () => {

  const handleSubmit=(e)=>{
  e.preventDefault();
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form  onSubmit={handleSubmit}>
          <div className="input-groups">
            <label htmlFor="email" className="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter the email address"
              />
            </label>
            <label htmlFor="password" className="password">
              Password:
              <input id="password" placeholder="Enter password" />
            </label>
          </div>

          <button className="button primary-btn">Login</button>
          
        </form>
        <p>Don't have an account?</p>
       <Link to="/register">Register</Link>
      </div>
    </main>
  );
};

export default Login;
