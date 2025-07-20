import React, { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

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
      <h2>Update Account</h2>
      <form className="form profile-form">
        <h2>Name</h2>
        <input
          type="text"
          className="inp profile-inp"
          onChange={handleInput}
          name="name"
        ></input>
        <h2>Email</h2>
        <input
          type="email"
          className="inp profile-inp"
          onChange={handleInput}
          name="email"
        ></input>
        <h2>Password</h2>
        <input
          type="password"
          className="inp profile-inp"
          onChange={handleInput}
          name="password"
        ></input>
        <button className="btn" onClick={handleUpdateAccount}>
          Update
        </button>
        {confirmDelete === 1 ? (
          <button
            className="btn delete"
            onClick={() => {
              setConfirmDelete(2);
            }}
          >
            Delete
          </button>
        ) : (
          <div className="delete-confirm">
            <button className="btn delete" onClick={handleDeleteAccount}>
              Yes
            </button>
            <button
              className="btn"
              onClick={() => {
                setConfirmDelete(1);
              }}
            >
              No
            </button>
          </div>
        )}
        <p className={message.type}>{message.text}</p>
      </form>
    </div>
  );
}

export default UpdateAccount;
