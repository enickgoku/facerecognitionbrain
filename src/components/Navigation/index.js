import React from 'react'

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
  if (isSignedIn && user.length >= 1) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => {
            localStorage.removeItem('userId')
            localStorage.removeItem('token')
            onRouteChange('signout')
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
        <p
          onClick={() => onRouteChange('signin')}
          className="f3 link dim black pa3 underline pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange('register')}
          className="f3 link dim black pa3 underline pointer"
        >
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation
