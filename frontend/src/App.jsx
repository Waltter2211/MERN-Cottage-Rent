import './App.css'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Homes from './components/Homes'
import { useEffect, useRef, useState } from 'react'
import UserContext from './contexts/UserContext'
import Notfound from './components/Notfound'
import Profile from './components/Profile'
import Private from './components/Private'

function App() {
  let [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    setLoggedUser(localStorage.getItem("user"))
    /* console.log(loggedUser) */
  }, [loggedUser])

  return (
    <>
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={loggedUser!==null?<Homes />:<Home />}></Route>
          <Route path='/login' element={loggedUser!==null?<Homes />:<Login />}></Route>
          <Route path='/register' element={loggedUser!==null?<Homes />:<Register />}></Route>
          <Route path='/homes' element={<Homes />}></Route>
          <Route path='/profile' element={loggedUser!==null?<Profile />:<Home />}></Route>
          {/* <Route path='/profile' element={<Private Component={Profile} />}></Route> */}
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
      
    </>
  )
}

export default App
