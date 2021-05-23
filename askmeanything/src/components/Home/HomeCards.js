import React from 'react'
import Swiper from '../Swiper'
import HomeCard from './HomeCard'

function HomeCards () {
  const cards = [
        <HomeCard key="0" number={42} textContent="Questions Per Keyword" />,
        <HomeCard key="1" number={42} textContent="Question Per Day" />,
        <HomeCard key="2" textContent="Ask A Question" />,
        <HomeCard key="3" textContent="Answer A Question" />
  ]

  return (
    <div className='cards'>
      <div className="hide-for-mobile">
        {cards.map(e => e)}
      </div>
      <div className="only-for-mobile" style={{ marginBottom: '1rem' }}>
        <Swiper
            renderItem={cards}
        />
      </div>
    </div>
  )
}

export default HomeCards
