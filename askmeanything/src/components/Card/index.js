import React from 'react'
import PropTypes from 'prop-types'

function Card (props) {
  Card.propTypes = {
    children: PropTypes.element
  }

  return (
    <div className="card">
        {props.children}
    </div>
  )
}

export default Card
