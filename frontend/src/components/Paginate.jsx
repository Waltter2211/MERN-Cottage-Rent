import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import HomeSingle from './HomeSingle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';

function Paginate({houses, itemsPerPage}) {
    const prev = <FontAwesomeIcon icon={faAngleLeft} />
    const next = <FontAwesomeIcon icon={faAngleRight} />

    function Houses({currentItems}) {
        return(
            <>
            {currentItems && currentItems.map((house, index) => {
                return <HomeSingle key={index} house={house} />
            })}
            </>
        )
    }

    Houses.propTypes = {
        currentItems: PropTypes.array.isRequired
    }

    const [itemOffset, setItemOffset] = useState(0)

    const endOffset = itemOffset + itemsPerPage
    const currentItems = houses?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(houses?.length / itemsPerPage)

    function handlePageClick(event) {
        let newOffset = (event.selected * itemsPerPage) % houses.length
        setItemOffset(newOffset)
    }

  return (
    <>
    <div className='homes-list-main-homes'>
        {currentItems.length === 0?<h1 className='blue'>No Houses Found</h1>:<Houses currentItems={currentItems} />}
    </div>
    <div className='homes-list-pagination'>
        <ReactPaginate
        breakLabel="..."
        nextLabel={next}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={prev}
        renderOnZeroPageCount={null}
        />
    </div>
    </>
  )
}

Paginate.propTypes = {
    houses: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired
}

export default Paginate