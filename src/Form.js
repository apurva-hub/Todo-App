import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { app } from "./Fire";
import { Link } from "react-router-dom";

const Form = (props) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login_form">
      <h1>{props.pageTitle}</h1>
      <label className="login_label">Email</label>
      <input
        className="login_input"
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
      />
      <label className="login_label">Password</label>
      <input
        className="login_input"
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      {props.pageTitle === "Login" ? (
        <div>
          <button onClick={login} className="button login-button">
            Login
          </button>
          <br />
          <br />
          <br />
          <small>
            Dont have an account?{" "}
            <Link to="/register">
              <b>Register</b>
            </Link>{" "}
            here
          </small>
        </div>
      ) : (
        <div>
          <button onClick={createUser} className="button login-button">
            Register
          </button>
          <br />
          <br />
          <br />
          <small>
            Already an user{" "}
            <Link to="/">
              <b>Login</b>
            </Link>
          </small>
        </div>
      )}
    </div>
  );
};

export default Form;
