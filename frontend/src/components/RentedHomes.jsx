import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import RentedHome from './RentedHome'

function RentedHomes() {

    const loggedUser = useContext(UserContext)

    const userId = loggedUser.loggedUser.id
    const token = localStorage.getItem("jsontoken")

    const [rentedHouses, setRentedHouses] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/houses/rents/${userId}`, {
            method:"GET",
            headers:{
                "Authorization":token
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            setRentedHouses(data.foundRents)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [rentedHouses])

  return (
    <div className='profile-inputs'>
        <h1>Rented Homes</h1>
        <div className='rented-homes-list'>
            {rentedHouses !== undefined?rentedHouses.map((rentedHouse, index) => {
                return <RentedHome key={index} rentedHouse={rentedHouse} />
            }):<h2>No rented homes found</h2>}
        </div>
    </div>
  )
}

export default RentedHomes