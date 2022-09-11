import React, { useCallback, useRef, useState } from 'react'
import Loading from '../Loading'
import './FaceRecognition.css'

const FaceRecognition = ({ faceData, loading }) => {
  const imageRef = useRef()
  const [faces, setFaces] = useState([])

  const { imageURL } = faceData || {}

  const calculateFaces = useCallback(() => {
    if (faceData.outputs) {
      const clarifaiFaces = faceData.outputs[0].data.regions.map(
        region => region.region_info.bounding_box
      )

      const width = Number(imageRef.current.width)
      const height = Number(imageRef.current.height)

      const faces = clarifaiFaces.map(face => ({
        border: '1px solid blue',
        top: face.top_row * height,
        bottom: face.bottom_row * height,
        right: face.right_col * width,
        left: face.left_col * width,
        height: face.bottom_row * height - face.top_row * height,
        width: face.right_col * width - face.left_col * width,
      }))

      setFaces(faces)
    }
  }, [faceData.outputs])

  if (loading) return <Loading />
  if (!imageURL) return null

  return (
    <div className="center ms">
      <div className="absolute ma2">
        <img
          ref={imageRef}
          id="inputimage"
          alt="box"
          src={imageURL}
          width="500px"
          height="auto"
          onLoad={calculateFaces}
        />
        {faces.map(face => (
          <div
            key={`${face.top}-${face.bottom}-${face.left}-${face.right}`}
            className="bounding-box"
            style={face}
          />
        ))}
      </div>
    </div>
  )
}

export default FaceRecognition
