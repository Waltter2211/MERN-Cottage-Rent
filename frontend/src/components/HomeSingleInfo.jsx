import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import UserContext from '../contexts/UserContext'

function HomeSingleInfo({houses}) {
    let {houseName} = useParams()
    let filteredHouse = houses.find((house) => {
      return house.houseName === houseName
    })

    /* console.log(filteredHouse) */

    const loggedUser = useContext(UserContext)

    let userId = loggedUser.loggedUser.id
    let houseId = filteredHouse._id
    let token = localStorage.getItem("jsontoken")

    let [message,setMessage] = useState({
      type:"",
      text:""
    })

    function handleRent() {
      fetch(`http://localhost:8000/houses/rent/${userId}/${houseId}`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":token
        }
      })
      .then((res) => {
        /* console.log(res) */
        if (res.status === 404) {
          setMessage({
            type:"error",
            text:"This house is out of stock"
          })
          setTimeout(() => {
            setMessage({
              type:"",
              text:""
            })
          }, 3000)
        }
        else if (res.status === 200) {
          return res.json()
        }
        else {
          setMessage({
              type:"error",
              text:"Server error"
          })
          setTimeout(() => {
            setMessage({
              type:"",
              text:""
            })
          }, 3000)
        }
      })
      .then((data) => {
        /* console.log(data) */
        if (data !== undefined) {
          navigate("/homes")
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }

    const navigate = useNavigate()

    const x = <FontAwesomeIcon icon={faX} />

  return (
    <>
    <Header />
    <div className='homes-single-info-page'>
      <div className='background-overlay'>

      </div>
      <section className='main-content-section'>
        <div className='homes-single-info-page-main'>
          <button className='btn close-btn' onClick={() => {
            navigate("/")
          }}>{x}</button>
          <div className='homes-single-info-page-main-img-frame'>
            <img className='homes-single-info-page-main-image' src={filteredHouse.houseImage}></img>
          </div>
          <div className='homes-single-info-page-main-info-frame'>
            <button className='btn rent-btn' onClick={handleRent}>Rent</button>
            <h1>House Name: {filteredHouse.houseName}</h1>
            <h1>House Cost: {filteredHouse.houseCost}$</h1>
            <h1>Houses in Stock: {filteredHouse.houseStock}</h1>
            <p className={message.type}>{message.text}</p>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default HomeSingleInfo