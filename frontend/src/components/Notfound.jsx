import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div className='not-found'>
        <div className='background-overlay'>

        </div>
        <section className='main-content-section'>
            <h1>No page found</h1>
            <Link to={"/"}><p>Click here to return to main page</p></Link>
        </section>
    </div>    
  )
}

export default Notfound