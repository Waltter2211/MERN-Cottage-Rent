import React, { useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  let [message, setMessage] = useState({
    type:"",
    text:""
  })

  function handleInput(event) {
    setRegisteringUser((prev) => {
      return (
        {...prev, [event.target.name]: event.target.value}
      )
    })
  }

  let [registeringUser, setRegisteringUser] = useState({
    name:"",
    email:"",
    password:""
  })

  function handleRegister(event) {
    event.preventDefault()
    fetch("http://localhost:8000/users/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(registeringUser)
    })
    .then((res) => {
        if (res.status === 403) {
            setMessage({
                type:"error",
                text:"Account already exists"
            })
            setTimeout(() => {
                setMessage({
                    type:"",
                    text:""
                })
            }, 3000)
        }
        else if (res.status === 500) {
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
        else {
            setMessage({
                type:"success",
                text:"Successfully registered an account"
            })
            setTimeout(() => {
                setMessage({
                    type:"",
                    text:""
                })
                navigate('/login')
            }, 3000)
        }
        return res.json()
    })
    .then(() => {
        setRegisteringUser({
            name:"",
            email:"",
            password:""
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

  return (
    <>
    <Header />
    <div className='login'>
      <div className='background-overlay'></div>
      <section className='main-content-section'>
        <form className='form'>
            <p>Name</p>
            <input type='text' placeholder='Username...' className='inp' onChange={handleInput} name='name' value={registeringUser.name}></input>
            <p>Email</p>
            <input type='email' placeholder='Email...' className='inp' onChange={handleInput} name='email' value={registeringUser.email}></input>
            <p>Password</p>
            <input type='password' placeholder='Password...' className='inp' onChange={handleInput} name='password' value={registeringUser.password}></input>
            <button className='btn' onClick={handleRegister}>Register</button>
            <p className={message.type}>{message.text}</p>
        </form>
        <p>Have an existing account? <Link to={'/login'}>Login here</Link></p>
      </section>
    </div>
    </>
  )
}

export default Register