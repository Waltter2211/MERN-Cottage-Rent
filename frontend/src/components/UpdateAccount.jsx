import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UpdateAccount() {
  const loggedUser = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    loggedUser.setLoggedUser(null);
    navigate("/");
  }

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [confirmDelete, setConfirmDelete] = useState(1);

  function handleInput(event) {
    setUser((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  function handleCancelDeletion(event) {
    event.preventDefault()
    setConfirmDelete(2)
  }

  function handleUpdateAccount(event) {
    event.preventDefault();
    fetch(`http://localhost:8000/users/edituser/${loggedUser.loggedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 422) {
          setMessage({
            type: "error",
            text: "Please fill all the fields",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
        } else if (res.status === 403) {
          setMessage({
            type: "error",
            text: "Account with that email already exists",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
          }, 3000);
        } else if (res.status === 200) {
          return res.json();
        } else {
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
        }
      })
      .then((data) => {
        if (data !== undefined) {
          setMessage({
            type: "success",
            text: "Successfully updated account logging out to save",
          });
          setTimeout(() => {
            setMessage({
              type: "",
              text: "",
            });
            logout();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteAccount(event) {
    event.preventDefault();
    fetch(
      `http://localhost:8000/users/deleteuser/${loggedUser.loggedUser.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        logout();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="profile-inputs">
      <h2>Account Settings</h2>
      <p>Update your account information</p>
      <form className="profile-form">
        <h1><FontAwesomeIcon icon={faUser} /> Personal Information</h1>
        <h2>Full Name</h2>
        <input
          type="text"
          className="profile-input"
          onChange={handleInput}
          name="name" placeholder="Enter your full name"
        ></input>
        <h2>Email Address</h2>
        <input
          type="email"
          className="profile-input"
          onChange={handleInput}
          name="email" placeholder="Enter your email"
        ></input>
        <h2>New Password</h2>
        <input
          type="password"
          className="profile-input"
          onChange={handleInput}
          name="password" placeholder="Enter new password"
        ></input>
        <div>
          {confirmDelete === 1 ? (
            <div className="profile-update-button-frame">
              <button type="submit" className="profile-update-button" onClick={handleUpdateAccount}>Update Account</button>
              <button type="button" className="profile-delete-button" onClick={handleCancelDeletion}>Delete Account</button>
            </div>
          ) : (
            <div className="profile-delete-button-frame">
              <p>Are you sure you want to delete your account?</p>
              <div className="profile-update-button-frame">
                <button className="profile-delete-button" onClick={handleDeleteAccount}>Yes</button>
                <button className="profile-update-button" onClick={() => {setConfirmDelete(1);}}>No</button>
              </div>
            </div>
          )}
        </div>
        <p className={message.type}>{message.text}</p>
      </form>
    </div>
  );
}

export default UpdateAccount;
