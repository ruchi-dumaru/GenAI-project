
import "./auth.form.scss";
import {Link} from "react-router";
const Register = () => {
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="input-groups">
            <label htmlFor="name" className="name">
              Name:
              <input
                type="text"
                id="name"
                name="email"
                placeholder="Enter the name "
              />
            </label>
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
              <input id="password" type="password "placeholder="Enter password" />
            </label>
          </div>

          <button className="button primary-btn">Register</button>
        </form>


        <p>Already have an acoount?</p>
       <Link to="/login">Login</Link>
      </div>
    </main>
  );
};

export default Register;
