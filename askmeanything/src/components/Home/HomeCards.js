import React from 'react'
import Swiper from '../Swiper'
import HomeCard from './HomeCard'

function HomeCards () {
  const cards = [
        <HomeCard key="0" title={42} textContent="users signed up today" />,
        <HomeCard key="1" title={42} textContent="are the most popular hashtags today" />,
        <HomeCard key="2" title={42} textContent="users signed up this year" />,
        <HomeCard key="3" title={42} textContent="are the most popular hashtags this year" />,
        <HomeCard key="4" title={42} textContent="users signed up this year" />,
        <HomeCard key="5" title={42} textContent="are the most popular hashtags this year" />
  ]

  return (
    <div>
      <div className="cards hide-for-mobile">
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
