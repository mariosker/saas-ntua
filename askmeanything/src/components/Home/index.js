import React from 'react'
import HomeCard from './HomeCard'
import Carousel from '../Carousel'

function Home () {
  const questionsAsked = [
    'How to create a React project?',
    'How to jumpstart a microservices project?',
    'Why Javascript is so weird?',
    'What am I doing?',
    'How to change careers?'

  ]

  return (
    <main className="home">
      <div className="questionsAsked">
        <Carousel renderItem={questionsAsked.map((s, i) => <span key={i}>{s}</span>)} />
      </div>

      <h1 className="welcomeMessage"></h1>
      <div className="cards">
        <HomeCard />
        <HomeCard />
        <HomeCard />
        <HomeCard />
      </div>
    </main>
  )
}

export default Home
