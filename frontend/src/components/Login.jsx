import React, { useContext } from 'react'
import Header from './Header'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function Login() {

  const navigate = useNavigate()
  let loggedUser = useContext(UserContext)

  let [message, setMessage] = useState({
    type:"",
    text:""
  })

  let [loggingUser, setLoggingUser] = useState({
    email:"",
    password:""
  })

  function handleInput(event) {
    setLoggingUser((prev) => {
      return (
        {...prev, [event.target.name]: event.target.value}
      )
    })
  }

  function handleLogin(event) {
    event.preventDefault()
    /* console.log(loggingUser) */
    fetch("http://localhost:8000/users/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loggingUser)
    })
    .then((res) => {
      console.log(res)
      if (res.status === 401) {
        setMessage({
          type:"error",
          text:"Wrong password"
        })
        setTimeout(() => {
            setMessage({
                type:"",
                text:""
            })
        }, 3000)
      }
      else if (res.status === 404) {
        setMessage({
          type:"error",
          text:"No user found"
        })
        setTimeout(() => {
            setMessage({
                type:"",
                text:""
            })
        }, 3000)
      }
      else {
        return res.json()
      }
      
    })
    .then((data) => {
      console.log(data)
      localStorage.setItem("jsontoken", `Bearer ${data.token}`)
      localStorage.setItem("user", data.email)
      loggedUser.setLoggedUser(data.email)
      setTimeout(() => {
        navigate("/")
      }, 3000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
    <Header />
    <div className='login'>
      <div className='background-overlay'>

      </div>
      <section className='main-content-login'>
        <form className='form'>
          <p>Email</p>
          <input type='email' placeholder='Email...' className='inp' onChange={handleInput} name='email' value={loggingUser.email}></input>
          <p>Password</p>
          <input type='password' placeholder='Password...' className='inp' onChange={handleInput} name='password' value={loggingUser.password}></input>
          <button className='btn' onClick={handleLogin}>Login</button>
          <p className={message.type}>{message.text}</p>
        </form>
        <p>Dont have and account? <Link to={'/'}>Register</Link></p>
      </section>
    </div>
    </>
  )
}

export default Login