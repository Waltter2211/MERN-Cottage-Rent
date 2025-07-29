import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SelectionContext from "../contexts/SelectionContext";
import Login from "./Login";
import Register from "./Register";

function Home() {
  const { selection, setSelection } = useContext(SelectionContext);

  const [housesCount, setHousesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

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

  return (
    <>
      <Header
        extraClassHeader="header-blue"
        extraClassHeaderLogo="header-logo-white"
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
            <h1>
              Welcome to <span className="info-field-span">house renting</span>{" "}
              site
            </h1>
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
          {selection === 1 ? <Login /> : <Register />}
        </section>
      </div>
    </>
  );
}

export default Home;
