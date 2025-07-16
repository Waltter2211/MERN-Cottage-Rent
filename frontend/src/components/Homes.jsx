import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import HouseContext from "../contexts/HouseContext";
import Paginate from "./Paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faMagnifyingGlass, faHouse, faBuilding, faVanShuttle, faEllipsis } from "@fortawesome/free-solid-svg-icons";

function Homes() {
  const [houses, setHouses] = useState([]);
  const [initialHouses, setInitialHouses] = useState([]);
  const [tag, setTag] = useState("");
  let containedHouses = useContext(HouseContext);

  useEffect(() => {
    fetch(`http://localhost:8000/houses/`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jsontoken"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setHouses(data);
        setInitialHouses(data);
        containedHouses.setContainedHouses(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleTagSelect(event) {
    let houseList = initialHouses;
    setHouses(() => {
      return houseList.filter((house) => {
        return house.houseTags === event.target.id;
      });
    });
    setTag(event.target.id);
  }

  function handleSearch(event) {
    let searchHouses = houses.filter((house) => {
      const regex = new RegExp(`${event.target.value}`, "i");
      return house.houseName.match(regex);
    });

    if (event.target.value === "") {
      setHouses(initialHouses);
      containedHouses.setContainedHouses(initialHouses);
      clearTags();
    } else {
      setHouses(searchHouses);
    }
  }

  function clearTags() {
    setHouses(initialHouses);
    setTag("");
  }

  console.log(tag)

  return (
    <>
      <Header />
      <div className="homes">
        <div className="homes-main">
          <div className="homes-main-title-search">
            <div className="homes-main-title">
              <h1>Currently Available Houses</h1>
              <p>Find your perfect rental property from our collection</p>
            </div>
            <div className="homes-search">
              <div className="homes-search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <input
                type="text"
                className="inp"
                placeholder="Search for houses..."
                onChange={handleSearch}
              ></input>
            </div>
          </div>
          <div className="homes-list">
            <div className="homes-list-sidebar">
              <h2>Categories</h2>
              <ul className="homes-list-buttons">
                <li className={tag === "" ? "list-div" : "homes-list-button"}>
                  <div className="homes-list-button-frame" onClick={clearTags}>
                    <div className="homes-list-button-fa-frame">
                      <FontAwesomeIcon icon={faBorderAll} />
                    </div>
                    <p>All Properties</p>
                  </div>
                </li>
                <li className={tag === "Cottages" ? "list-div" : "homes-list-button"} id="Cottages">
                  <div className="homes-list-button-frame" onClick={handleTagSelect} id="Cottages">
                    <div className="homes-list-button-fa-frame">
                      <FontAwesomeIcon icon={faHouse} />
                    </div>
                    <p id="Cottages">Cottages</p>
                  </div>
                </li>
                <li className={tag === "Tower Blocks" ? "list-div" : "homes-list-button"} onClick={handleTagSelect} id="Tower Blocks">
                  <div className="homes-list-button-frame" id="Tower Blocks">
                    <div className="homes-list-button-fa-frame">
                      <FontAwesomeIcon icon={faBuilding} />
                    </div>
                    <p id="Tower Blocks">Tower Blocks</p>
                  </div>
                </li>
                <li className={tag === "Vans" ? "list-div" : "homes-list-button"} onClick={handleTagSelect} id="Vans">
                  <div className="homes-list-button-frame" id="Vans">
                    <div className="homes-list-button-fa-frame">
                      <FontAwesomeIcon icon={faVanShuttle} />
                    </div>
                    <p id="Vans">Vans</p>
                  </div>
                </li>
                <li className={tag == "Others" ? "list-div" : "homes-list-button"} onClick={handleTagSelect} id="Others">
                  <div className="homes-list-button-frame" id="Others">
                    <div className="homes-list-button-fa-frame">
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                    <p id="Others">Others</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="homes-list-main">
              <Paginate houses={houses} itemsPerPage={15} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homes;
