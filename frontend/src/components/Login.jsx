import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import SelectionContext from "../contexts/SelectionContext";

function Login() {
  const navigate = useNavigate();
  let loggedUser = useContext(UserContext);
  const { setSelection } = useContext(SelectionContext)

  let [message, setMessage] = useState({
    type: "",
    text: "",
  });

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
          setMessage({
            type: "error",
            text: "Wrong password",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
        } else if (res.status === 404) {
          setMessage({
            type: "error",
            text: "No user found",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
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
    <>
      <div className="login">
        <form className="form">
          <p>Email</p>
          <input
            type="email"
            placeholder="Email..."
            className="inp"
            onChange={handleInput}
            name="email"
            value={loggingUser.email}
          ></input>
          <p>Password</p>
          <input
            type="password"
            placeholder="Password..."
            className="inp"
            onChange={handleInput}
            name="password"
            value={loggingUser.password}
          ></input>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <p className={message.type}>{message.text}</p>
        </form>
        <p>
          Dont have an account? <span onClick={() => setSelection(2)}>Register</span>
        </p>
      </div>
    </>
  );
}

export default Login;
