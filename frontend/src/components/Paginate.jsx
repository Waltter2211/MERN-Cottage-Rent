import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import HomeSingle from "./HomeSingle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faFilter,
  faMagnifyingGlass,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Paginate({ houses, itemsPerPage, searchTerm, searchTag }) {
  const prev = <FontAwesomeIcon icon={faAngleLeft} />;
  const next = <FontAwesomeIcon icon={faAngleRight} />;

  const navigate = useNavigate();

  function Houses({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((house, index) => {
            return <HomeSingle key={index} house={house} />;
          })}
      </>
    );
  }

  Houses.propTypes = {
    currentItems: PropTypes.array.isRequired,
  };

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = houses?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(houses?.length / itemsPerPage);

  function handlePageClick(event) {
    let newOffset = (event.selected * itemsPerPage) % houses.length;
    setItemOffset(newOffset);
  }

  return (
    <>
      <div className="homes-list-main-homes">
        {currentItems.length === 0 ? (
          <div className="homes-list-main-homes-not-found">
            <img src="/NoHomesFoundLogo.JPG" />
            <h1 className="blue">No Properties Found</h1>
            <p>
              We couldn&apos;t find any properties matching &quot;
              <span className="homes-list-main-homes-search-span">
                {searchTerm}
              </span>
              &quot;
            </p>
            <div className="homes-list-main-homes-not-found-tag-frame">
              <div className="homes-list-main-homes-not-found-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p>Search: {searchTerm}</p>
              </div>
              {searchTag ? (
                <div className="homes-list-main-homes-not-found-tag">
                  <FontAwesomeIcon icon={faFilter} />
                  <p>Category: {searchTag}</p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div
              className="homes-list-main-homes-not-found-clear-filters-button"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faRotate} />
              <p>Clear All Filters</p>
            </div>
          </div>
        ) : (
          <Houses currentItems={currentItems} />
        )}
      </div>
      <div className="homes-list-pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={next}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={prev}
          renderOnZeroPageCount={null}
          activeClassName="homes-list-pagination-button-active"
        />
      </div>
    </>
  );
}

Paginate.propTypes = {
  houses: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  searchTerm: PropTypes.string,
  searchTag: PropTypes.string,
};

export default Paginate;
