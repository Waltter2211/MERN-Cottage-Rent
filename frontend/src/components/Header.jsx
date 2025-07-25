import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  let loggedUser = useContext(UserContext);
  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  return (
    <>
      <div className="header">
        <div className="header-content">
          <Link to={"/"}>
            <h1 className="header-btn">MERN-Rent</h1>
          </Link>
          <div>
            <div>
              {loggedUser.loggedUser?.email == null ? (
                <div className="header-buttons">
                  <Link to={"/login"}>
                    <p className="header-btn">Login</p>
                  </Link>
                  <Link to={"/register"}>
                    <p className="header-btn">Register</p>
                  </Link>
                </div>
              ) : (
                <div className="header-buttons">
                  <Link to={"/profile"}>
                    <p className="header-btn">
                      Logged in as {loggedUser.loggedUser.email}
                    </p>
                  </Link>
                  <p className="header-btn" onClick={logout}>
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

export default Header;
