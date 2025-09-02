import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import SelectionContext from "../contexts/SelectionContext";
import Login from "./Login";
import Register from "./Register";

function Home() {
  const { selection, setSelection } = useContext(SelectionContext);

  const [housesCount, setHousesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loginRegisterFrame, setLoginRegisterFrame] = useState(false);

  useEffect(() => {
    handleGetHousesCount();
    handleGetUsersCount();
  }, []);

  const navigate = useNavigate();

  function handleGetHousesCount() {
    fetch("http://localhost:8000/houses/housesCount")
      .then((res) => res.json())
      .then(({ housesCount }) => setHousesCount(housesCount))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetUsersCount() {
    fetch("http://localhost:8000/users/usersCount")
      .then((res) => res.json())
      .then(({ usersCount }) => setUsersCount(usersCount))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLoginRegisterFrame(frameSelection) {
    setLoginRegisterFrame(!loginRegisterFrame);
    setSelection(frameSelection);
  }

  return (
    <>
      <div
        className={
          loginRegisterFrame
            ? "login-register-frame-mobile-background-overlay login-register-frame-mobile-background-overlay-visible"
            : "login-register-frame-mobile-background-overlay"
        }
      ></div>
      <Header
        extraClassHeader="header-blue"
        extraClassHeaderLogo="header-logo-white"
        extraMobileFunction={handleLoginRegisterFrame}
      />
      <div className="home">
        <div className="background-overlay"></div>
        <section className="main-content">
          <div className="info-field">
            <div className="info-field-small-title">
              <p>
                <FontAwesomeIcon icon={faHouse} /> Premium Property Rentals
              </p>
            </div>
            <div className="info-field-title-main-text">
              <h1>Welcome to</h1>
              <h1 className="info-field-span">house renting</h1>
              <h1>site</h1>
            </div>
            <h2>Rent homes fast and easy</h2>
            <div className="info-field-title-frame">
              <p>
                Discover your perfect home from our curated collection of
                premium properties. Experience seamless rentals with verified
                listings and instant booking.
              </p>
            </div>
            <div className="info-field-button-frame">
              <button
                className="search-homes-button"
                onClick={() => {
                  navigate("/homes");
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} /> SEARCH HOMES
              </button>
              {selection === 1 ? (
                <button
                  className="already-a-member-button"
                  onClick={() => setSelection(2)}
                >
                  Create Account
                </button>
              ) : (
                <button
                  className="already-a-member-button"
                  onClick={() => setSelection(1)}
                >
                  Already a Member?
                </button>
              )}
            </div>
            <div className="info-field-button-frame-mobile">
              <button
                className="search-homes-button"
                onClick={() => {
                  navigate("/homes");
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} /> SEARCH HOMES
              </button>
              <button
                className="already-a-member-button"
                onClick={() => handleLoginRegisterFrame(2)}
              >
                Create Account
              </button>
              <button
                className="already-a-member-button"
                onClick={() => handleLoginRegisterFrame(1)}
              >
                Already a Member?
              </button>
            </div>
            <div className="info-field-line"></div>
            <div className="info-field-stats-frame">
              <div className="info-field-stat">
                <h2>{housesCount}</h2>
                <p>Properties</p>
              </div>
              <div className="info-field-stat">
                <h2>{usersCount}</h2>
                <p>Happy Customers</p>
              </div>
              <div className="info-field-stat">
                <h2>24/7</h2>
                <p>Support</p>
              </div>
            </div>
          </div>
          <div className="login-register-frame">
            {selection === 1 ? <Login /> : <Register />}
          </div>
        </section>
        <div
          className={
            loginRegisterFrame
              ? "login-register-frame-mobile login-register-frame-mobile-visible"
              : "login-register-frame-mobile"
          }
        >
          <p onClick={() => setLoginRegisterFrame(!loginRegisterFrame)}>
            <FontAwesomeIcon icon={faX} />
          </p>
          {selection === 1 ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}

export default Home;
