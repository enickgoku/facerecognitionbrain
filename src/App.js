import ParticleBackground from 'react-particle-backgrounds'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import './App.css'
import Clarifai from '../node_modules/clarifai'
import React, { useState } from 'react'

const USER_ID = 'YOUR_USER_ID_HERE';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'YOUR_PAT_HERE';
const APP_ID = 'YOUR_APP_ID_HERE';
const MODEL_ID = 'YOUR_MODEL_ID_HERE';
const MODEL_VERSION_ID = 'YOUR_MODEL_VERSION_ID';
// Change this to whatever image URL you want to process
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';


///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

const app = new Clarifai.App({
  apiKey: '22fa31bf4c4448b2bdb9b3592d4af025'
})

const settings4 = {
  particle: {
    particleCount: 100,
    color: "red",
    minSize: 2,
    maxSize: 4
  },
  velocity: {
    directionAngle: 0,
    directionAngleVariance: 30,
    minSpeed: 0.2,
    maxSpeed: 4
  },
  opacity: {
    minOpacity: 0,
    maxOpacity: 0.5,
    opacityTransitionTime: 5000
  }
}

function App() {
  
  const initialState = {
    input: '',
  }
  const [input, setInput] = useState({ ...initialState })

  const onInputChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value
    })
    console.log(target.value)
  }

  const onButtonSubmit = (event) => {
    event.preventDefault()
    console.log('click')
    setInput({ ...initialState })
  }

  return (
    <div className="App">
      <ParticleBackground className="particles"
        settings={settings4} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit} 
      />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
