import React from 'react'

function HomeSingle({house}) {
    console.log(house)
  return (
    <div className='homes-list-main-home'>
        <h1>{house.houseName}</h1>
        <h2>{house.houseCost}</h2>
        <p>{house.houseStock}</p>
    </div>
  )
}

export default HomeSingle