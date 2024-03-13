import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomeSingle({house}) {
    const navigate = useNavigate()
    /* console.log(house) */

  return (
    <div className='homes-list-main-home' onClick={() => {
        navigate(`/homeSingle/${house.houseName}`)
    }}>
        <div className='homes-list-home-image'>
            <img src={house.houseImage}></img>
        </div>
        <div className='homes-list-home-info'>
            <p>{house.houseName}</p>
            <p>{house.houseCost}$</p>
            <p>in stock: {house.houseStock}</p>
        </div>
    </div>
  )
}

export default HomeSingle