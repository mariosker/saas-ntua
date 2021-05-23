import React from 'react'
import Card from '../Card'
import PropTypes from 'prop-types'

function HomeCard (props) {
  HomeCard.propTypes = {
    number: PropTypes.number,
    textContent: PropTypes.string
  }

  return (
    <Card>
        <div className="home-card">
          <div>
            {props.number && <h1>{props.number}</h1>}
          </div>
          <div>
            <p>{props.textContent}</p>
          </div>
        </div>
    </Card>
  )
}

export default HomeCard
