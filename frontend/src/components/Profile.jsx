import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import UpdateAccount from "./UpdateAccount";
import { ProfileContext, UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import RentedHomes from "./RentedHomes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faGear,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const navigate = useNavigate();

  const loggedUser = useContext(UserContext);
  const { mode, setMode } = useContext(ProfileContext);
  /* const [mode, setMode] = useState(1); */
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(loggedUser.loggedUser.email);
  }, []);

  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-frame">
          <div className="profile-selection">
            <div className="profile-selection-img-frame">
              <img
                className="profile-image"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              ></img>
            </div>
            <div className="profile-selection-info-frame">
              <h2>Test User</h2>
              <p>{user}</p>
            </div>
            <div className="profile-selection-buttons">
              <button
                className="profile-selection-button"
                onClick={() => {
                  navigate("/homes");
                }}
              >
                <FontAwesomeIcon icon={faHouse} /> Browse Properties
              </button>
              <button
                className={
                  mode === 1
                    ? "profile-selection-button-border"
                    : "profile-selection-button"
                }
                onClick={() => {
                  setMode(1);
                }}
              >
                <FontAwesomeIcon icon={faClock} /> Rented Homes
              </button>
              <button
                className={
                  mode === 2
                    ? "profile-selection-button-border"
                    : "profile-selection-button"
                }
                onClick={() => {
                  setMode(2);
                }}
              >
                <FontAwesomeIcon icon={faGear} /> Account Settings
              </button>
              <button
                className="profile-selection-button logout-button"
                onClick={logout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </button>
            </div>
          </div>
          {mode === 1 ? <RentedHomes /> : <UpdateAccount />}
        </div>
      </div>
    </>
  );
}

export default Profile;
