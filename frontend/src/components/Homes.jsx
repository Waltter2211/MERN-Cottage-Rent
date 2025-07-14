import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import HouseContext from "../contexts/HouseContext";
import Paginate from "./Paginate";

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

  return (
    <>
      <Header />
      <div className="homes">
        <div className="background-overlay"></div>
        <section className="main-content-section">
          <div className="homes-main">
            <h1>Currently Available Houses</h1>
            <div className="homes-search">
              <input
                type="text"
                className="inp"
                placeholder="Search for houses..."
                onChange={handleSearch}
              ></input>
            </div>
            <div className="homes-list">
              <div className="homes-list-sidebar">
                <ul className="homes-list-buttons">
                  {tag === "Cottages" ? (
                    <li
                      className="homes-list-button list-div"
                      onClick={clearTags}
                      id="Cottages"
                    >
                      Cottages
                    </li>
                  ) : (
                    <li
                      className="homes-list-button"
                      onClick={handleTagSelect}
                      id="Cottages"
                    >
                      Cottages
                    </li>
                  )}
                  {tag === "Tower Blocks" ? (
                    <li
                      className="homes-list-button list-div"
                      onClick={clearTags}
                      id="Tower Blocks"
                    >
                      Tower Blocks
                    </li>
                  ) : (
                    <li
                      className="homes-list-button"
                      onClick={handleTagSelect}
                      id="Tower Blocks"
                    >
                      Tower Blocks
                    </li>
                  )}
                  {tag === "Vans" ? (
                    <li
                      className="homes-list-button list-div"
                      onClick={clearTags}
                      id="Vans"
                    >
                      Vans
                    </li>
                  ) : (
                    <li
                      className="homes-list-button"
                      onClick={handleTagSelect}
                      id="Vans"
                    >
                      Vans
                    </li>
                  )}
                  {tag === "Others" ? (
                    <li
                      className="homes-list-button list-div"
                      onClick={clearTags}
                      id="Others"
                    >
                      Others
                    </li>
                  ) : (
                    <li
                      className="homes-list-button"
                      onClick={handleTagSelect}
                      id="Others"
                    >
                      Others
                    </li>
                  )}
                </ul>
              </div>
              <div className="homes-list-main">
                <Paginate houses={houses} itemsPerPage={15} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Homes;
