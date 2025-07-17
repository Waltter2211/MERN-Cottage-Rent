import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../contexts/UserContext";
import PropTypes from "prop-types";

function HomeSingleInfo({ houses }) {
  let { houseName } = useParams();
  let filteredHouse = houses.find((house) => {
    return house.houseName === houseName;
  });

  const loggedUser = useContext(UserContext);

  const userId = loggedUser.loggedUser.id;
  const houseId = filteredHouse._id;
  const token = localStorage.getItem("jsontoken");

  let [message, setMessage] = useState({
    type: "",
    text: "",
  });

  function handleRent() {
    fetch(`http://localhost:8000/houses/rent/${userId}/${houseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 404) {
          setMessage({
            type: "error",
            text: "This house is out of stock",
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
          navigate("/homes");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="homes-single-info-page">
        <div className="homes-single-info-page-main">
          <div className="homes-single-info-page-main-img-frame">
            <div className="homes-single-info-page-main-image-backround"></div>
            <button className="close-btn" onClick={() => {navigate("/")}}><FontAwesomeIcon icon={faArrowLeft} /> Back to properties</button>
            <div className="homes-single-info-page-main-image-info">
              <div className="homes-single-info-page-main-image-info-tag">
                <p>{filteredHouse.houseTags}</p>
              </div>
              <div>
                <div className="homes-single-info-page-main-image-info-title-cost">
                  <div className="homes-single-info-page-main-image-info-title-availability">
                    <h1>{filteredHouse.houseName}</h1>
                    <div className="homes-single-info-page-main-image-info-location-availability">
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} /> City Center
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faCalendar} /> Available Now
                      </p>
                    </div>
                  </div>
                  <div className="homes-single-info-page-main-image-info-cost-amount-available">
                    <h2>${filteredHouse.houseCost}</h2>
                    <p>{filteredHouse.houseStock} available</p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className="homes-single-info-page-main-image"
              src={filteredHouse.houseImage}
            ></img>
          </div>
          <div className="homes-single-info-page-main-info-frame">
            <button className="btn rent-btn" onClick={handleRent}>
              Rent
            </button>
            <h1>House Name: {filteredHouse.houseName}</h1>
            <h1>House Cost: {filteredHouse.houseCost}$</h1>
            <h1>Houses in Stock: {filteredHouse.houseStock}</h1>
            <p className={message.type}>{message.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

HomeSingleInfo.propTypes = {
  houses: PropTypes.array.isRequired,
};

export default HomeSingleInfo;
