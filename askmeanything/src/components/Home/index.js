import React from 'react'
import HomeCards from './HomeCards'
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

      <HomeCards />
    </main>
  )
}

export default Home
