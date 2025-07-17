import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCarSide,
  faLocationDot,
  faUtensils,
  faWifi,
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
            <button
              className="close-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to properties
            </button>
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
            <div className="homes-single-info-page-main-info-frame-left">
              <div className="homes-single-info-page-main-info-property-details">
                <h2>Property Details</h2>
                <div className="homes-single-info-page-main-info-property-details-frame">
                  <div className="homes-sing-info-page-main-info-detail bedrooms-color">
                    <h3>2</h3>
                    <p>Bedrooms</p>
                  </div>
                  <div className="homes-sing-info-page-main-info-detail bathrooms-color">
                    <h3>1</h3>
                    <p>Bathrooms</p>
                  </div>
                  <div className="homes-sing-info-page-main-info-detail size-color">
                    <h3>850</h3>
                    <p>Sq Ft</p>
                  </div>
                  <div className="homes-sing-info-page-main-info-detail available-color">
                    <h3>{filteredHouse.houseStock}</h3>
                    <p>Available</p>
                  </div>
                </div>
              </div>
              <div className="homes-single-info-page-main-info-description">
                <h2>Description</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                  unde asperiores soluta, maxime, facere voluptatem eius tempora
                  nam sed illum rem cumque numquam error, laboriosam omnis.
                  Voluptatum earum ut quam.
                </p>
              </div>
              <div className="homes-single-info-page-main-info-amenities">
                <h2>Amenities</h2>
                <div className="homes-single-info-page-main-info-amenities-frame">
                  <div className="homes-single-info-page-main-info-amenity">
                    <FontAwesomeIcon icon={faWifi} />
                    <p>WiFi</p>
                  </div>
                  <div className="homes-single-info-page-main-info-amenity">
                    <FontAwesomeIcon icon={faCarSide} />
                    <p>Parking</p>
                  </div>
                  <div className="homes-single-info-page-main-info-amenity">
                    <FontAwesomeIcon icon={faUtensils} />
                    <p>Kitchen</p>
                  </div>
                </div>
              </div>
              <p className={message.type}>{message.text}</p>
            </div>
            <div className="homes-single-info-page-main-info-frame-right">
              <h1>House Cost: {filteredHouse.houseCost}$</h1>
              <button className="btn rent-btn" onClick={handleRent}>
                Rent
              </button>
            </div>
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
