import React from 'react'
import Card from '../Card'
import PropTypes from 'prop-types'

function HomeCard (props) {
  HomeCard.propTypes = {
    title: PropTypes.title,
    textContent: PropTypes.string
  }

  return (
    <Card>
        <div className="home-card">
          <div>
          {props.title && <span className='home-card--h1'>{props.title} </span>}
          <span className="home-card--span">{props.textContent}</span>
          </div>
        </div>
    </Card>
  )
}

export default HomeCard
