import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Carousel (props) {
  Carousel.propTypes = {
    renderItem: PropTypes.array
  }
  const [activeItem, setActiveItem] = useState(1)

  const slide = () => {
    return setInterval(() => {
      console.log(activeItem)
      const items = document.getElementsByClassName('carousel--item')
      const length = items.length
      Array.from(items).forEach(e => {
        e.classList.remove('active')
      })

      items[activeItem % length].classList.add('active')
      setActiveItem(activeItem => (activeItem + 1))
    },
    4000)
  }

  useEffect(() => {
    if (document.getElementsByClassName('active').length === 0) {
      document.getElementsByClassName('carousel--item')[0].classList.add('active')
    }
    const interval = slide()
    return () => clearInterval(interval)
  }, [activeItem])

  return (
        <div className="carousel">
            {props.renderItem.map((el, idx) => (
                <div key={idx} className="carousel--item">
                    {el}
                </div>
            ))}
        </div>
  )
}

export default Carousel
