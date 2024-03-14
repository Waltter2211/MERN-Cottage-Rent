import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import HouseContext from '../contexts/HouseContext'
import Paginate from './Paginate'

function Homes() {
  
  const [houses, setHouses] = useState([])
  let containedHouses = useContext(HouseContext)

  let homeSearch

  useEffect(() => {
    fetch(`http://localhost:8000/houses/`, {
      method:"GET",
      headers:{
        "Authorization":localStorage.getItem("jsontoken")
      }
    })
    .then((res) => {
      /* console.log(res) */
      return res.json()
    })
    .then((data) => {
      /* console.log(data) */
      setHouses(data)
      containedHouses.setContainedHouses(houses)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [houses === undefined || houses.length === 0])
  
  function handleSearch(event) {
    homeSearch = event.target.value
    /* console.log(homeSearch, searchedHouses) */

    fetch(`http://localhost:8000/houses/${homeSearch}`, {
      method:"GET",
      headers:{
        "Authorization":localStorage.getItem("jsontoken")
      }
    })
    .then((res) => {
      /* console.log(res) */
      return res.json()
    })
    .then((data) => {
      /* console.log(data) */
      setHouses(data.foundHouses)
      containedHouses.setContainedHouses(houses)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Header />
    <div className='homes'>
      <div className='background-overlay'>

      </div>
      <section className='main-content-section'>
        <div className='homes-main'>
          <h1>Currently Available Houses</h1>
          <div className='homes-search'>
            <input type='text' className='inp' placeholder='Search for houses...' onChange={handleSearch}></input>
          </div>
          <div className='homes-list'>
            <div className='homes-list-sidebar'>
              <ul className='homes-list-buttons'>
                <li className='homes-list-button'>Town-Houses</li>
                <li className='homes-list-button'>Estates</li>
                <li className='homes-list-button'>Vans</li>
                <li className='homes-list-button'>Tower-Blocks</li>
                <li className='homes-list-button'>Cottages</li>
              </ul>
            </div>
            <div className='homes-list-main'>
              {/* <div className='homes-list-main-homes'>
                {houses === undefined && homeSearch !== undefined? <h1>No Homes Found</h1>
                :houses === undefined && homeSearch === undefined? houses?.map((house, index) => {
                  return <HomeSingle key={index} house={house} />
                })
                :houses?.map((house, index) => {
                  return <HomeSingle key={index} house={house} />
                })}
              </div>
              <div className='homes-list-pagination'>
                <Paginate houses={houses} itemsPerPage={15} />
              </div> */}
              <Paginate houses={houses} itemsPerPage={15} />
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Homes