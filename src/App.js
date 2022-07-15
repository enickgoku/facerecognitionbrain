import ParticleBackground from 'react-particle-backgrounds'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import './App.css'


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
  
  return (
    <div className="App">
      <ParticleBackground className="particles" settings={settings4} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
