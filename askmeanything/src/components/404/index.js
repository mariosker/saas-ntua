import React from 'react'
import PropTypes from 'prop-types'

function Page404 (props) {
  Page404.propTypes = {
    history: PropTypes.shape({
      replace: PropTypes.func
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }

  const { location, history } = props
  console.log(history)
  location.pathname !== '/404' && history.replace('/404')
  return <p>404</p>
}

export default Page404
