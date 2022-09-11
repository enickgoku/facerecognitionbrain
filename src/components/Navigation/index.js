import React from 'react'
import { Link } from 'react-router-dom'
import { handleLogout } from '../../utils/session'

const Navigation = () => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (token && userId) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={handleLogout}
          className="f3 link dim black pa3 underline pointer"
        >
          Sign Out
        </p>
      </nav>
    )
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/signin" className="f3 link dim black pa3 underline pointer">
          Sign In
        </Link>
        <Link
          to="/register"
          className="f3 link dim black pa3 underline pointer"
        >
          Register
        </Link>
      </nav>
    )
  }
}

export default Navigation
