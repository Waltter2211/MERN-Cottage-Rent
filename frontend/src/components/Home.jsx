import React, { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();
  let [message, setMessage] = useState({
    type: "",
    text: "",
  });
  let [registeringUser, setRegisteringUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInput(event) {
    setRegisteringUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

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
            navigate("/login");
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
    <>
      <Header />
      <div className="home">
        <div className="background-overlay"></div>
        <section className="main-content">
          <div className="info-field">
            <div className="info-field-small-title">
              <p><FontAwesomeIcon icon={faHouse} /> Premium Property Rentals</p>
            </div>
            <h1>Welcome to <span className="info-field-span">house renting</span> site</h1>
            <h2>Rent homes fast and easy</h2>
            <div className="info-field-title-frame">
              <p>Discover your perfect home from our curated collection of premium properties. Experience seamless rentals with verified listings and instant booking.</p>
            </div>
            <div className="info-field-button-frame">
              <button className="search-homes-button" onClick={() => {navigate("/homes");}}><FontAwesomeIcon icon={faMagnifyingGlass} /> SEARCH HOMES</button>
              <button className="already-a-member-button">Already a Member?</button>
            </div>
            <div className="info-field-line"></div>
            <div className="info-field-stats-frame">
              <div className="info-field-stat">
                <h2>500+</h2>
                <p>Properties</p>
              </div>
              <div className="info-field-stat">
                <h2>1k+</h2>
                <p>Happy Customers</p>
              </div>
              <div className="info-field-stat">
                <h2>24/7</h2>
                <p>Support</p>
              </div>
            </div>
          </div>
          <div className="register-field">
            <h1>Dont have an account yet?</h1>
            <form className="form form-home">
              <p>Name</p>
              <input
                type="text"
                placeholder="Username..."
                className="inp"
                onChange={handleInput}
                name="name"
                value={registeringUser.name}
              ></input>
              <p>Email</p>
              <input
                type="email"
                placeholder="Email..."
                className="inp"
                onChange={handleInput}
                name="email"
                value={registeringUser.email}
              ></input>
              <p>Password</p>
              <input
                type="password"
                placeholder="Password..."
                className="inp"
                onChange={handleInput}
                name="password"
                value={registeringUser.password}
              ></input>
              <button className="btn" onClick={handleRegister}>
                Register
              </button>
              <p className={message.type}>{message.text}</p>
            </form>
            <p>
              Have an existing account? <Link to={"login"}>Login here</Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
