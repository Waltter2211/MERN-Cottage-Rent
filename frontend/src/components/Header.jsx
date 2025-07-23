import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SelectionContext from "../contexts/SelectionContext";

function Header({ extraClassHeader, extraClassHeaderLogo, extraClassButton, extraClassButtonSelected }) {
  const navigate = useNavigate();

  let loggedUser = useContext(UserContext);
  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  function handleSelection(selection) {
    setSelection(selection)
    navigate("/")
  }

  const { selection, setSelection } = useContext(SelectionContext)

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
                  <p className={selection === 1 ? `header-button-selected ${extraClassButtonSelected}` : `header-button ${extraClassButton}`} onClick={() => handleSelection(1)}>Login</p>
                  <p className={selection === 2 ? `header-button-selected ${extraClassButtonSelected}` : `header-button ${extraClassButton}`} onClick={() => handleSelection(2)}>Register</p>
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
  extraClassHeaderLogo: PropTypes.object,
  extraClassButton: PropTypes.object,
  extraClassButtonSelected: PropTypes.object
};

export default Header;
