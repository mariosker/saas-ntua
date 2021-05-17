import React from 'react'
import HomeCard from './HomeCard'
import TextLoop from 'react-text-loop'

function Home () {
  return (
    <main className='home'>
      <div className="questionsAsked">
  <h1>
          <TextLoop>
              <span>How to create a React project?</span>
              <span>How to jumpstart a microservices project?</span>
              <span>Why Javascript is so weird?</span>
              <span>What am I doing?</span>
              <span>How to change careers?</span>
          </TextLoop>{''}
  </h1>
      </div>

        <h1 className='welcomeMessage'>
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
