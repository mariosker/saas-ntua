import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Swiper (props) {
  Swiper.propTypes = {
    renderItem: PropTypes.array
  }
  const [activeItem] = useState(1)

  //   const slide = () => {

  //   }

  useEffect(() => {
    if (document.querySelectorAll('.swiper--item.active').length === 0) {
      document.getElementsByClassName('swiper--item')[0].classList.add('active')
    }
  }, [activeItem])

  return (
        <div className="swiper">
            {props.renderItem.map((el, idx) => (
                <div key={idx} className="swiper--item">
                    {el}
                </div>
            ))}
        </div>
  )
}

export default Swiper
