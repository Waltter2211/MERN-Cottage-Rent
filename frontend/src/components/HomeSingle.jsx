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
      </div>
      <div className="homes-list-home-info">
        <p>{house.houseName}</p>
        <p>{house.houseCost}$</p>
        <p>in stock: {house.houseStock}</p>
      </div>
    </div>
  );
}

HomeSingle.propTypes = {
  house: PropTypes.object.isRequired,
};

export default HomeSingle;
