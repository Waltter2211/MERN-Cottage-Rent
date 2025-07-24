import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import RentedHome from "./RentedHome";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function RentedHomes() {
  const navigate = useNavigate()
  const loggedUser = useContext(UserContext);

  const userId = loggedUser.loggedUser.id;
  const token = localStorage.getItem("jsontoken");

  const [rentedHouses, setRentedHouses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/houses/rents/${userId}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRentedHouses(data.foundRents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rentedHouses]);

  return (
    <>
      <div className="profile-inputs">
        {rentedHouses !== undefined ? (
          <>
            <h2>Rented Homes</h2>
            <p>Manage your current rental properties</p>
            <div className="rented-homes-list">
              {rentedHouses.map((rentedHouse, index) => {
                return <RentedHome key={index} rentedHouse={rentedHouse} />;
              })}
            </div>
          </>
        ) : (
          <div className="rented-homes-no-homes">
            <img src="/NoRentalsLogo.JPG" />
            <h2>No Current Rented Homes</h2>
            <p>You haven&apos;t rented any properties yet. Start exploring our amazing collection of homes and find your perfect rental.</p>
            <div className="rented-homes-no-homes-button" onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Search for homes</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RentedHomes;
