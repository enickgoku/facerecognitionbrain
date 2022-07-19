import React, { useState, useCallback, useMemo } from 'react'
import ParticleBackground from 'react-particle-backgrounds'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import './App.css'
// import Clarifai from 'clarifai'
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

  const initialState = useMemo(() => ({ input: '' }), [])
  const [formData, setFormData] = useState(initialState)

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

      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Key ${REACT_APP_PAT}`,
        },
        body: JSON.stringify({
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
        }),
      }

      await fetch(
        `https://api.clarifai.com/v2/models/${REACT_APP_MODEL_ID}/versions/${REACT_APP_MODEL_VERSION_ID}/outputs`,
        requestOptions
      )
        .then(response => response.text())
        .then(response => {
          setFormData(initialState)
        })
        .catch(error => console.log('error', error))
    },
    [
      REACT_APP_APP_ID,
      REACT_APP_MODEL_ID,
      REACT_APP_MODEL_VERSION_ID,
      REACT_APP_PAT,
      REACT_APP_USER_ID,
      formData.input,
      initialState,
    ]
  )

  return (
    <div className="App">
      <ParticleBackground className="particles" settings={settings4} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
        formData={formData}
      />
      <FaceRecognition input={formData.input} />
    </div>
  )
}

export default App
