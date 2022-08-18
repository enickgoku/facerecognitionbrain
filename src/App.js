import React, { useState, useCallback, useMemo } from 'react'
import ParticleBackground from 'react-particle-backgrounds'
import axios from 'axios'
import Navigation from './components/Navigation/index'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import './App.css'
import FaceRecognition from './components/FaceRecognition'

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
  const {
    REACT_APP_MODEL_ID,
    REACT_APP_MODEL_VERSION_ID,
    REACT_APP_PAT,
    REACT_APP_USER_ID,
    REACT_APP_APP_ID,
  } = process.env

  const userData = {
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    },
  }

  const [user, setUser] = useState(userData)

  const loadUser = data => {
    setUser({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    })
  }

  const initialState = useMemo(() => ({ input: '' }), [])
  const [formData, setFormData] = useState(initialState)
  const [faceData, setFaceData] = useState({})

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

      await axios({ method: 'post', headers, url, data })
        .then(({ data }) => {
          console.log(data)
          setFaceData({ ...data, imageURL: formData.input })
          return data
        })
        .then(data => {
          if (data) {
            axios
              .post('http://localhost:3001/image', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  id: user.id,
                }),
              })
              .then(data => data.json())
              .then(count => {
                setUser({
                  user: {
                    entries: count,
                  },
                })
              })
          }
        })
        .catch(console.log())

      setFormData(initialState)
    },
    [
      REACT_APP_APP_ID,
      REACT_APP_MODEL_ID,
      REACT_APP_MODEL_VERSION_ID,
      REACT_APP_PAT,
      REACT_APP_USER_ID,
      formData.input,
      initialState,
      user.id,
    ]
  )

  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState(false)

  const onRouteChange = route => {
    if (route === 'signout') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    } else if (route === 'register') {
      setIsSignedIn(false)
    }

    setRoute(route)
  }

  return (
    <div className="App">
      <ParticleBackground className="particles" settings={settings4} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <div>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            formData={formData}
          />
          <FaceRecognition faceData={faceData} />
        </div>
      ) : route === 'signin' ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  )
}

export default App
