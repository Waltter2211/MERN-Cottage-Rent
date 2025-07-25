import React, { useContext, useState } from "react";
import Header from "./Header";
import UpdateAccount from "./UpdateAccount";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import RentedHomes from "./RentedHomes";

function Profile() {
  const navigate = useNavigate();

  const loggedUser = useContext(UserContext);
  const [mode, setMode] = useState(1);

  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  return (
    <>
      <Header />
      <div className="profile">
        <div className="background-overlay"></div>
        <section className="main-content-section">
          <div className="profile-frame">
            <div className="profile-selection">
              <div className="profile-selection-img-frame">
                <img
                  className="profile-image"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                ></img>
              </div>
              <div className="profile-selection-buttons">
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/homes");
                  }}
                >
                  Home
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setMode(1);
                  }}
                >
                  Rented Homes
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setMode(2);
                  }}
                >
                  Update Account
                </button>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
            {mode === 1 ? <RentedHomes /> : <UpdateAccount />}
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
