import React from 'react'

// Desktop Header

function DesktopNavBar () {
  return (
    <div className='header'>
        <h1 className='logo'>
            <span className='logo--1'>Ask</span>
            <span className='logo--2'>Me</span>
            <span className='logo--3'>Anything</span>
        </h1>
        <div className='buttons'>
          <a href="javascript:void(0)" className='button button--1'>LOG IN</a>
          <a href="javascript:void(0)" className='button button--2'>SIGN UP</a>
        </div>
    </div>
  )
}

export default DesktopNavBar
