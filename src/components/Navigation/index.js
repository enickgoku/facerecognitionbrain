import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (token && userId) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => {
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            navigate('../signin')
          }}
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
