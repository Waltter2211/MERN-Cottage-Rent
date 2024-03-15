import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import HouseContext from '../contexts/HouseContext'
import Paginate from './Paginate'

function Homes() {
  
  const [houses, setHouses] = useState([])
  const [initialHouses, setInitialHouses] = useState([])
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
      setInitialHouses(data)
      containedHouses.setContainedHouses(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  function handleTagSelect(event) {
    /* console.log(event.target.id) */
    /* if (tag === false) {
      let tagHouses = houses.filter((house) => {
        return house.houseTags === event.target.id
      })
      setHouses(tagHouses)
      setTag(true)
    }
    else if (tag === true) {
      setHouses(initialHouses)
      setTag(false)
    } */
    let houseList = initialHouses
    switch(event.target.id) {
      case "Tower Blocks":
        let taggedHouseBlocks = houseList.filter((house) => {
          return house.houseTags === "Tower Blocks"
        })
        setHouses(taggedHouseBlocks)
        break;
      case "Cottages":
        let taggedHouseCottages = houseList.filter((house) => {
          return house.houseTags === "Cottages"
        })
        setHouses(taggedHouseCottages)
        break;
      case "Vans":
        let taggedHouseVans = houseList.filter((house) => {
          return house.houseTags === "Vans"
        })
        setHouses(taggedHouseVans)
        break;
      case "Others":
        let taggedHouseOthers = houseList.filter((house) => {
          return house.houseTags === "Others"
        })
        setHouses(taggedHouseOthers)
        break;
      default:
        return initialHouses
    }
  }
  
  function handleSearch(event) {
    homeSearch = event.target.value
    /* console.log(homeSearch, searchedHouses) */

    /* fetch(`http://localhost:8000/houses/${homeSearch}`, {
      method:"GET",
      headers:{
        "Authorization":localStorage.getItem("jsontoken")
      }
    })
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((data) => {
      console.log(data)
      setHouses(data.foundHouses)
      containedHouses.setContainedHouses(houses)
    })
    .catch((err) => {
      console.log(err)
    }) */

    let searchHouses = houses.filter((house) => {
      const regex = new RegExp(`${event.target.value}`, 'i')
      return house.houseName.match(regex)
    })

    if (event.target.value === "") {
      setHouses(initialHouses)
      containedHouses.setContainedHouses(initialHouses)
    }
    else {
      setHouses(searchHouses)
    }
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
              <button onClick={() => {setHouses(initialHouses)}}>Test</button>
              <ul className='homes-list-buttons'>
                <li className='homes-list-button' onClick={handleTagSelect} id='Cottages'>Cottages</li>
                <li className='homes-list-button' onClick={handleTagSelect} id='Tower Blocks'>Tower Blocks</li>
                <li className='homes-list-button' onClick={handleTagSelect} id='Vans'>Vans</li>
                <li className='homes-list-button' onClick={handleTagSelect} id='Others'>Others</li>
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