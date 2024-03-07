import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Homes from './components/Homes'
import { useEffect, useState } from 'react'
import UserContext from './contexts/UserContext'

function App() {
  let [loggedUser, setLoggedUser] = useState()
  useEffect(() => {
    console.log(loggedUser)
  }, [loggedUser])

  return (
    <>
    <UserContext.Provider value={{loggedUser,setLoggedUser}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/login' element={<Login />}></Route> */}
          <Route path='/homes' element={<Homes />}></Route>
          <Route path='*' element={<h1>Not defined</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
      
    </>
  )
}

export default App
