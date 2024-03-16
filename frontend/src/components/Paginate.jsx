import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import HomeSingle from './HomeSingle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function Paginate({houses, itemsPerPage}) {
    const prev = <FontAwesomeIcon icon={faAngleLeft} />
    const next = <FontAwesomeIcon icon={faAngleRight} />
    /* console.log(houses) */

    function Houses({currentItems}) {
        /* console.log(currentItems) */
        return(
            <>
            {currentItems && currentItems.map((house, index) => {
                return <HomeSingle key={index} house={house} />
            })}
            </>
        )
    }

    const [itemOffset, setItemOffset] = useState(0)

    const endOffset = itemOffset + itemsPerPage
    /* console.log("loading houses from "+itemOffset+" to "+endOffset) */
    const currentItems = houses?.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(houses?.length / itemsPerPage)

    function handlePageClick(event) {
        let newOffset = (event.selected * itemsPerPage) % houses.length
        setItemOffset(newOffset)
    }

    /* console.log(currentItems) */

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

export default Paginate