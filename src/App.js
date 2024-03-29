import React, { useState, useCallback, useEffect } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import ParticleBackground from 'react-particle-backgrounds'
import axios from 'axios'

import { handleLogout, getCredentials, hasCredentials } from './utils/session'

import Loading from './components/Loading'
import Navigation from './components/Navigation'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import FaceRecognition from './components/FaceRecognition'
import GitHub from './components/GitHub/GitHub'

import './App.css'

const {
  REACT_APP_MODEL_ID,
  REACT_APP_MODEL_VERSION_ID,
  REACT_APP_PAT,
  REACT_APP_USER_ID,
  REACT_APP_APP_ID,
} = process.env

const settings4 = {
  particle: {
    particleCount: 100,
    color: 'red',
    minSize: 2,
    maxSize: 4,
  },
  velocity: {
    directionAngle: 0,
    directionAngleVariance: 30,
    minSpeed: 0.2,
    maxSpeed: 4,
  },
  opacity: {
    minOpacity: 0,
    maxOpacity: 0.5,
    opacityTransitionTime: 5000,
  },
}

function App() {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ input: '' })
  const [faceData, setFaceData] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { userId, token } = getCredentials() || {}

  useEffect(() => {
    if (hasCredentials()) {
      setLoading(true)

      fetch(`https://infinite-waters-08259.herokuapp.com/profile/${userId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response.error) {
            handleLogout()
            navigate('../signin')
          } else {
            setUser({
              id: response.id,
              name: response.name,
              email: response.email,
              entries: response.entries,
              joined: response.createdAt,
            })
          }

          setLoading(false)
        })
    }
  }, [navigate, token, userId])

  const onInputChange = useCallback(
    ({ target }) => {
      setFormData({
        ...formData,
        [target.name]: target.value,
      })
    },
    [formData]
  )

  const onButtonSubmit = useCallback(
    async event => {
      event.preventDefault()
      setFaceData({})
      setLoading(true)

      const headers = {
        Accept: 'application/json',
        Authorization: `Key ${REACT_APP_PAT}`,
      }

      const url = `https://api.clarifai.com/v2/models/${REACT_APP_MODEL_ID}/versions/${REACT_APP_MODEL_VERSION_ID}/outputs`

      const data = JSON.stringify({
        user_app_id: {
          user_id: REACT_APP_USER_ID,
          app_id: REACT_APP_APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: formData.input,
              },
            },
          },
        ],
      })

      if (hasCredentials()) {
        axios({
          method: 'put',
          url: `https://infinite-waters-08259.herokuapp.com/image/${userId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then(async response => {
          if (response.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            navigate('../signin')
          } else {
            await axios({ method: 'post', headers, url, data }).then(
              ({ data }) => {
                setFaceData({ ...data, imageURL: formData.input })
                setUser({ ...user, entries: user.entries + 1 })
              }
            )
          }

          setLoading(false)
        })
      }

      setFormData({ input: '' })
    },
    [formData.input, userId, token, navigate, user]
  )

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <ParticleBackground className="particles" settings={settings4} />
            <Navigation />
            <GitHub />
            {!hasCredentials() ? (
              <Outlet />
            ) : (
              <div>
                <Logo />
                {!user && loading ? (
                  <Loading />
                ) : (
                  <>
                    <Rank user={user} />
                    <ImageLinkForm
                      onInputChange={onInputChange}
                      onButtonSubmit={onButtonSubmit}
                      formData={formData}
                    />
                    <FaceRecognition faceData={faceData} loading={loading} />
                  </>
                )}
              </div>
            )}
          </div>
        }
      >
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
