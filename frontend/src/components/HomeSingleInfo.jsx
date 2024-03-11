import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'

function HomeSingleInfo({houses}) {
    let {_id} = useParams()
    let filteredHouse = houses.find((house) => {
        return house._id === _id
    })

    const navigate = useNavigate()

  return (
    <>
    <Header />
    <div className='homes'>
      <div className='background-overlay'>

      </div>
      <section className='main-content-section'>
        <h1>Home Single Info Component: {filteredHouse.houseName}</h1>
        <button onClick={() => {
            navigate("/")
        }}>Back To Home Page</button>
      </section>
    </div>
    </>
  )
}

export default HomeSingleInfo