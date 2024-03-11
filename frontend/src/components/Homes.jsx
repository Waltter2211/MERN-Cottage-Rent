import { useEffect, useState } from 'react'
import Header from './Header'
import HomeSingle from './HomeSingle'

function Homes() {
  
  let [houses, setHouses] = useState([])
  let [searchedHouses, setSearchedHouses] = useState()

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
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  function handleSearch(event) {
    let homeSearch = event.target.value

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
      setSearchedHouses(data.foundHouses)
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
              {searchedHouses === undefined? houses.map((house, index) => {
                return <HomeSingle key={index} house={house} />
              }):searchedHouses.map((house, index) => {
                return <HomeSingle key={index} house={house} />
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Homes