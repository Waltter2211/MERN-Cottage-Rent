import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCarSide,
  faHeart,
  faLocationDot,
  faShareNodes,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../contexts/UserContext";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

function HomeSingleInfo({ houses }) {
  let { houseName } = useParams();
  let filteredHouse = houses.find((house) => {
    return house.houseName === houseName;
  });

  const loggedUser = useContext(UserContext);

  const userId = loggedUser.loggedUser.id;
  const houseId = filteredHouse._id;
  const token = localStorage.getItem("jsontoken");

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
          toast.error("This house is out of stock", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (res.status === 200) {
          return res.json();
        } else {
          toast.error("Server error", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
          });
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
            </div>
            <div className="homes-single-info-page-main-info-frame-right">
              <div className="homes-single-info-page-main-info-rent">
                <h2>${filteredHouse.houseCost}</h2>
                <p>per rental period</p>
                <button className="rent-btn" onClick={handleRent}>
                  RENT NOW
                </button>
                <div className="homes-single-info-page-main-info-favorite-share-frame">
                  <button className="favorite-share-btn">
                    <FontAwesomeIcon icon={faHeart} /> Favorite
                  </button>
                  <button className="favorite-share-btn">
                    <FontAwesomeIcon icon={faShareNodes} /> Share
                  </button>
                </div>
                <div className="homes-single-info-page-main-info-line"></div>
                <div className="homes-single-info-page-main-info-stock-available-response-time">
                  <div className="homes-single-info-page-main-info-stock-available">
                    <p>Stock Available:</p>
                    <p className="homes-single-info-page-main-info-stock-available-response-time-font-weight">
                      {filteredHouse.houseStock} units
                    </p>
                  </div>
                  <div className="homes-single-info-page-main-info-response-time">
                    <p>Response Time:</p>
                    <p className="homes-single-info-page-main-info-stock-available-response-time-font-weight">
                      Within 24 hours
                    </p>
                  </div>
                </div>
              </div>
              <div className="homes-single-info-page-main-info-help">
                <h2>Need Help?</h2>
                <p>
                  Have questions about this property? Our team is here to help.
                </p>
                <button className="contact-support-btn">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

HomeSingleInfo.propTypes = {
  houses: PropTypes.array.isRequired,
};

export default HomeSingleInfo;
