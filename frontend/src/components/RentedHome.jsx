import React from "react";
import PropTypes from "prop-types";

function RentedHome({ rentedHouse }) {
  const rentUserId = rentedHouse.userId._id;
  const rentId = rentedHouse._id;
  const token = localStorage.getItem("jsontoken");

  function handleReturnHouse(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/houses/return/${rentUserId}/${rentId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="rented-homes-home">
      <div className="rented-homes-home-img-frame">
        <img
          className="rented-homes-home-image"
          src={rentedHouse.houseId.houseImage}
        ></img>
      </div>
      <div className="rented-homes-home-wrapper">
        <div className="rented-homes-home-info">
          <div className="rented-homes-home-rented-status">
            <h2>{rentedHouse.houseId.houseName}</h2>
            <p>Active</p>
          </div>
          <p>Rental ends: {rentedHouse.rentDate}</p>
          <h3>${rentedHouse.houseId.houseCost}</h3>
        </div>
        <div className="rented-homes-home-rented-date">
          <button className="return-house-button" onClick={handleReturnHouse}>
            Return House
          </button>
        </div>
      </div>
    </div>
  );
}

RentedHome.propTypes = {
  rentedHouse: PropTypes.object.isRequired,
};

export default RentedHome;
