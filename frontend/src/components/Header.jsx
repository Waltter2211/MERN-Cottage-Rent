import React, { useContext } from "react";
import { ProfileContext, UserContext } from "../contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SelectionContext from "../contexts/SelectionContext";

function Header({
  extraClassHeader,
  extraClassHeaderLogo,
  extraClassButton,
  extraClassButtonSelected,
}) {
  const navigate = useNavigate();

  let loggedUser = useContext(UserContext);
  const { setMode } = useContext(ProfileContext);
  const location = useLocation();

  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  function handleSelection(selection) {
    setSelection(selection);
    navigate("/");
  }

  function handleNavigation(page) {
    setMode(page);
    navigate("/profile");
  }

  const { selection, setSelection } = useContext(SelectionContext);

  if (location.pathname === "/profile") {
    return (
      <>
        <div
          className={extraClassHeader ? `header ${extraClassHeader}` : "header"}
        >
          <div className="header-content">
            <Link to={"/"}>
              <h1
                className={
                  extraClassHeaderLogo
                    ? `header-logo-button ${extraClassHeaderLogo}`
                    : "header-logo-button"
                }
              >
                MERN-Rent
              </h1>
            </Link>
            <div>
              <div>
                  <div className="header-buttons">
                    <p className="header-logged-in-text">
                      Logged in as {loggedUser.loggedUser.email}
                    </p>
                    <p className="header-logout-button" onClick={logout}>
                      Logout
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={extraClassHeader ? `header ${extraClassHeader}` : "header"}
        >
          <div className="header-content">
            <Link to={"/"}>
              <h1
                className={
                  extraClassHeaderLogo
                    ? `header-logo-button ${extraClassHeaderLogo}`
                    : "header-logo-button"
                }
              >
                MERN-Rent
              </h1>
            </Link>
            <div>
              <div>
                {loggedUser.loggedUser?.email == null ? (
                  <div className="header-buttons">
                    <p
                      className={
                        selection === 1
                          ? `header-button-selected ${extraClassButtonSelected}`
                          : `header-button ${extraClassButton}`
                      }
                      onClick={() => handleSelection(1)}
                    >
                      Login
                    </p>
                    <p
                      className={
                        selection === 2
                          ? `header-button-selected ${extraClassButtonSelected}`
                          : `header-button ${extraClassButton}`
                      }
                      onClick={() => handleSelection(2)}
                    >
                      Register
                    </p>
                  </div>
                ) : (
                  <div className="header-buttons">
                    <p
                      className="header-rental-account-button"
                      onClick={() => handleNavigation(1)}
                    >
                      My Rentals
                    </p>
                    <p
                      className="header-rental-account-button"
                      onClick={() => handleNavigation(2)}
                    >
                      Account
                    </p>
                    <p className="header-logged-in-text">
                      Logged in as {loggedUser.loggedUser.email}
                    </p>
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
}

Header.propTypes = {
  extraClassHeader: PropTypes.object,
  extraClassHeaderLogo: PropTypes.object,
  extraClassButton: PropTypes.string,
  extraClassButtonSelected: PropTypes.string,
};

export default Header;
