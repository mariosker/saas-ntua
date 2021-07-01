import React from 'react'
import { Link } from 'react-router-dom'

function TopNavBar () {
  return (
    <div className='header'>

        <Link to='/' style={{ textDecoration: 'none' }}>
          <h1 className='logo'>
              <span className='logo--1'>Ask</span>
              <span className='logo--2'>Me</span>
              <span className='logo--3'>Anything</span>
          </h1>
        </Link>
        <div className='buttons'>
          <Link to='/login' className='button button--1'>Login</Link>
          <Link to='/signup' className='button button--2'>SIGN UP</Link>
        </div>
    </div>
  )
}

export default TopNavBar
