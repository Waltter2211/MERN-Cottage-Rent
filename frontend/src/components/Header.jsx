import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'

function Header() {

    let loggedUser = useContext(UserContext)
    let [user, setUser] = useState()

  return (
    <>
    <div className='header'>
        <div className='header-content'>
            <h1>Header Component</h1>
            <div>
                <div>
                  {user === undefined? <div className='header-buttons'><p>Login</p><p>Register</p></div>:<div className='header-buttons'><p>{user.loggedUser?.name}</p><p>Logout</p></div>}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header