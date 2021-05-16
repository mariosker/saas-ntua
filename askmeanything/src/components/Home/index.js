import React from 'react'
import HomeCard from './HomeCard'

function Home () {
  return (
    <main className='home'>
        <h1 className='welcomeMessage'>
          <span>Welcome To </span>
          <span className='logo--1'>Ask</span>
          <span className='logo--2'>Me</span>
          <span className='logo--3'>Anything</span>
        </h1>
        <div className='cards'>
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
    </main>
  )
}

export default Home
