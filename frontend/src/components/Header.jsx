import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Header({extraClassHeader, extraClassHeaderLogo}) {
  const navigate = useNavigate();

  let loggedUser = useContext(UserContext);
  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  const [selection, setSelection] = useState(1)

  return (
    <>
      <div className={extraClassHeader ? `header ${extraClassHeader}` : "header"}>
        <div className="header-content">
          <Link to={"/"}>
            <h1 className={extraClassHeaderLogo ? `header-logo-button ${extraClassHeaderLogo}` : "header-logo-button"}>MERN-Rent</h1>
          </Link>
          <div>
            <div>
              {loggedUser.loggedUser?.email == null ? (
                <div className="header-buttons">
                  <p className={selection === 1 ? "header-button-selected" : "header-button"} onClick={() => setSelection(1)}>Login</p>
                  <p className={selection === 2 ? "header-button-selected" : "header-button"} onClick={() => setSelection(2)}>Register</p>
                </div>
              ) : (
                <div className="header-buttons">
                  <Link to={"/profile"}>
                    <p className="header-logged-in-text">
                      Logged in as {loggedUser.loggedUser.email}
                    </p>
                  </Link>
                  <p className="header-logout-button" onClick={logout}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  extraClassHeader: PropTypes.object,
  extraClassHeaderLogo: PropTypes.object
};

export default Header;
