import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Homes from './components/Homes'
import { useEffect, useState } from 'react'
import UserContext from './contexts/UserContext'
import Notfound from './components/Notfound'
import Profile from './components/Profile'

function App() {
  let [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    setLoggedUser({
      email: localStorage.getItem("user"),
      id: localStorage.getItem("userId")
    })
  }, [])

  return (
    <>
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={loggedUser?.email!=null?<Navigate to="/homes" />:<Home />}></Route>
          <Route path='/login' element={loggedUser?.email!=null?<Navigate to="/homes" />:<Login />}></Route>
          <Route path='/register' element={loggedUser?.email!=null?<Navigate to="/homes" />:<Register />}></Route>
          <Route path='/homes' element={<Homes />}></Route>
          <Route path='/profile' element={loggedUser?.email!=null?<Profile />:<Navigate to="/" />}></Route>
          {/* <Route path='/profile' element={<Private Component={Profile} />}></Route> */}
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
      
    </>
  )
}

export default App
