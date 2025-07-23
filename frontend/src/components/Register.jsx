import React, { useContext, useState } from "react";
import SelectionContext from "../contexts/SelectionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function Register() {

  const { setSelection } = useContext(SelectionContext);

  let [message, setMessage] = useState({
    type: "",
    text: "",
  });

  function handleInput(event) {
    setRegisteringUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  let [registeringUser, setRegisteringUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleRegister(event) {
    event.preventDefault();
    fetch("http://localhost:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registeringUser),
    })
      .then((res) => {
        if (res.status === 403) {
          setMessage({
            type: "error",
            text: "Account already exists",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
        } else if (res.status === 500) {
          setMessage({
            type: "error",
            text: "Server error",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
        } else {
          setMessage({
            type: "success",
            text: "Successfully registered an account",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
            setSelection(1)
          }, 3000);
        }
        return res.json();
      })
      .then(() => {
        setRegisteringUser({
          name: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-frame">
      <div className="login">
        <div className="login-description">
          <h2>Don&apos;t have an account yet?</h2>
          <p>Create your account to get started</p>
        </div>
        <form className="login-form">
          <div className="login-form-input-frame">
            <p>Username</p>
            <div className="login-form-input">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                placeholder="Username..."
                onChange={handleInput}
                name="name"
                value={registeringUser.name}
              ></input>
            </div>
          </div>
          <div className="login-form-input-frame">
            <p>Email</p>
            <div className="login-form-input">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                placeholder="Email..."
                onChange={handleInput}
                name="email"
                value={registeringUser.email}
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
                value={registeringUser.password}
              ></input>
            </div>
          </div>
          <button className="button" onClick={handleRegister}>
            REGISTER
          </button>
          <p className={message.type}>{message.text}</p>
        </form>
        <div className="login-sub-description">
          <h3>
            Have an existing account? {" "}
            <span
              className="login-sub-description-highlight"
              onClick={() => setSelection(1)}
            >
              Login
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

export default Register;
