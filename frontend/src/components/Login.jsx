import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import SelectionContext from "../contexts/SelectionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  let loggedUser = useContext(UserContext);
  const { setSelection } = useContext(SelectionContext);

  let [loggingUser, setLoggingUser] = useState({
    email: "",
    password: "",
  });

  function handleInput(event) {
    setLoggingUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loggingUser),
    })
      .then((res) => {
        if (res.status === 401) {
          toast.error("Wrong password");
        } else if (res.status === 404) {
          toast.error("No user found");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("jsontoken", `Bearer ${data.token}`);
        localStorage.setItem("user", data.email);
        localStorage.setItem("userId", data._id);
        loggedUser.setLoggedUser({
          email: data.email,
          id: data._id,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-frame">
      <div className="login">
        <div className="login-description">
          <h2>Welcome Back!</h2>
          <p>Sign in to access your rentals</p>
        </div>
        <form className="login-form">
          <div className="login-form-input-frame">
            <p>Email</p>
            <div className="login-form-input">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                placeholder="Email..."
                onChange={handleInput}
                name="email"
                value={loggingUser.email}
              ></input>
            </div>
          </div>
          <div className="login-form-input-frame">
            <p>Password</p>
            <div className="login-form-input">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                placeholder="Password..."
                onChange={handleInput}
                name="password"
                value={loggingUser.password}
              ></input>
            </div>
          </div>
          <button className="button" onClick={handleLogin}>
            LOGIN
          </button>
        </form>
        <div className="login-sub-description">
          <h3>
            Don&apos;t have an account?{" "}
            <span
              className="login-sub-description-highlight"
              onClick={() => setSelection(2)}
            >
              Register
            </span>
          </h3>
          <div className="login-line"></div>
          <p className="login-terms-text">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
