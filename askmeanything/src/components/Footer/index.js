import React from 'react'
import { Link } from 'react-router-dom'

function Footer () {
  return (
        <footer>
            <ul>
              <li><Link>about</Link></li>
              <li><Link>contact us</Link></li>
              <li><Link>project documentation</Link></li>
              <li><Link>link on github</Link></li>
              <li><Link>courses materials</Link></li>
            </ul>
        </footer>
  )
}

export default Footer
