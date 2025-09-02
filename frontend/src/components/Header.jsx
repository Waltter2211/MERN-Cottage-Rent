import React, { useContext, useState } from "react";
import { ProfileContext, UserContext } from "../contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SelectionContext from "../contexts/SelectionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";

function Header({
  extraClassHeader,
  extraClassHeaderLogo,
  extraClassButton,
  extraClassButtonSelected,
  extraMobileFunction,
}) {
  const navigate = useNavigate();

  let loggedUser = useContext(UserContext);
  const { setMode } = useContext(ProfileContext);
  const { selection, setSelection } = useContext(SelectionContext);
  const [sideBar, setSideBar] = useState(false);
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

  function handleSideBar() {
    setSideBar(!sideBar);
  }

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
              <div className="header-buttons-frame-mobile">
                <p onClick={handleSideBar}>
                  <FontAwesomeIcon icon={faBars} />
                </p>
                <div
                  className={
                    sideBar
                      ? "header-sidebar-background-overlay header-sidebar-background-overlay-visible"
                      : "header-sidebar-background-overlay"
                  }
                  onClick={handleSideBar}
                ></div>
                <div
                  className={
                    sideBar
                      ? "header-sidebar header-sidebar-visible"
                      : "header-sidebar"
                  }
                >
                  <p onClick={handleSideBar}>
                    <FontAwesomeIcon icon={faX} />
                  </p>
                  {location.pathname === "/profile" && (
                    <div className="header-sidebar-mobile-home">
                      <h1>MERN-Rent</h1>
                      <div
                        className="header-sidebar-mobile-home-button-frame"
                        onClick={() => handleNavigation(1)}
                      >
                        <p>My Rentals</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame header-sidebar-mobile-home-button-frame-selected"
                        onClick={() => handleNavigation(2)}
                      >
                        <p>Account</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame mobile-button-color-blue"
                        onClick={logout}
                      >
                        <p>
                          <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                          Logout
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="header-buttons-frame">
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
              <div className="header-buttons-frame-mobile">
                <p onClick={handleSideBar}>
                  <FontAwesomeIcon icon={faBars} />
                </p>
                <div
                  className={
                    sideBar
                      ? "header-sidebar-background-overlay header-sidebar-background-overlay-visible"
                      : "header-sidebar-background-overlay"
                  }
                  onClick={handleSideBar}
                ></div>
                <div
                  className={
                    sideBar
                      ? "header-sidebar header-sidebar-visible"
                      : "header-sidebar"
                  }
                >
                  <p onClick={handleSideBar}>
                    <FontAwesomeIcon icon={faX} />
                  </p>
                  {location.pathname === "/" && (
                    <div className="header-sidebar-mobile-home">
                      <h1>MERN-Rent</h1>
                      <div
                        className="header-sidebar-mobile-home-button-frame"
                        onClick={() => extraMobileFunction(1)}
                      >
                        <p>Login</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame header-sidebar-mobile-home-button-frame-selected"
                        onClick={() => extraMobileFunction(2)}
                      >
                        <p>Register</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame mobile-button-color-blue"
                        onClick={() => navigate("/homes")}
                      >
                        <p>
                          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
                          Homes
                        </p>
                      </div>
                    </div>
                  )}
                  {location.pathname === "/homes" &&
                    loggedUser.loggedUser?.email == null && (
                      <div>
                        <div className="header-sidebar-mobile-home">
                          <h1>MERN-Rent</h1>
                          <div
                            className="header-sidebar-mobile-home-button-frame"
                            onClick={() => navigate("/")}
                          >
                            <p>Login</p>
                          </div>
                          <div
                            className="header-sidebar-mobile-home-button-frame header-sidebar-mobile-home-button-frame-selected"
                            onClick={() => navigate("/")}
                          >
                            <p>Register</p>
                          </div>
                        </div>
                      </div>
                    )}
                  {location.pathname === "/homes" &&
                    loggedUser.loggedUser?.email != null && (
                      <div className="header-sidebar-mobile-home">
                        <h1>MERN-Rent</h1>
                        <div
                          className="header-sidebar-mobile-home-button-frame"
                          onClick={() => handleNavigation(1)}
                        >
                          <p>My Rentals</p>
                        </div>
                        <div
                          className="header-sidebar-mobile-home-button-frame header-sidebar-mobile-home-button-frame-selected"
                          onClick={() => handleNavigation(2)}
                        >
                          <p>Account</p>
                        </div>
                        <div
                          className="header-sidebar-mobile-home-button-frame mobile-button-color-blue"
                          onClick={logout}
                        >
                          <p>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                            Logout
                          </p>
                        </div>
                      </div>
                    )}
                  {location.pathname.includes("/homeSingle") && (
                    <div className="header-sidebar-mobile-home">
                      <h1>MERN-Rent</h1>
                      <div
                        className="header-sidebar-mobile-home-button-frame"
                        onClick={() => handleNavigation(1)}
                      >
                        <p>My Rentals</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame header-sidebar-mobile-home-button-frame-selected"
                        onClick={() => handleNavigation(2)}
                      >
                        <p>Account</p>
                      </div>
                      <div
                        className="header-sidebar-mobile-home-button-frame mobile-button-color-blue"
                        onClick={logout}
                      >
                        <p>
                          <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                          Logout
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="header-buttons-frame">
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
  extraMobileFunction: PropTypes.func,
};

export default Header;
