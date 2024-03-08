import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router-dom'

function Header() {

  let loggedUser = useContext(UserContext)
  /* console.log(loggedUser) */
  function logout() {
    localStorage.removeItem("jsontoken")
    localStorage.removeItem("user")
    loggedUser.setLoggedUser(null)
  }

  return (
    <>
    <div className='header'>
        <div className='header-content'>
            <Link to={"/"}><h1 className='header-btn'>Header Component</h1></Link>
            <div>
                <div>
                  {loggedUser.loggedUser === null? <div className='header-buttons'><Link to={"/login"}><p className='header-btn'>Login</p></Link><Link to={"/register"}><p className='header-btn'>Register</p></Link></div>:<div className='header-buttons'><p>Logged in as {loggedUser.loggedUser}</p><p onClick={logout}>Logout</p></div>}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header