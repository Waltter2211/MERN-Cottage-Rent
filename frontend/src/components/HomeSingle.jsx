import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function HomeSingle({ house }) {
  const navigate = useNavigate();

  return (
    <div
      className="homes-list-main-home"
      onClick={() => {
        navigate(`/homeSingle/${house.houseName}`);
      }}
    >
      <div className="homes-list-home-image">
        <img src={house.houseImage}></img>
        <div className="homes-list-home-tag-frame">
          <p>{house.houseTags}</p>
        </div>
      </div>
      <div className="homes-list-home-info">
        <div className="homes-list-home-name-cost">
          <p className="homes-list-home-info-name">{house.houseName}</p>
          <p className="homes-list-home-info-cost">${house.houseCost}</p>
        </div>
        <p className="homes-list-home-info-stock">In stock: {house.houseStock}</p>
        <button className="homes-list-home-info-details">View Details</button>
      </div>
    </div>
  );
}

HomeSingle.propTypes = {
  house: PropTypes.object.isRequired,
};

export default HomeSingle;
