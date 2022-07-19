import React from 'react'

const FaceRecognition = ({ input }) => {
  return (
    <div className="center ms">
      <div className="absolute ma2">
        <img alt="box" src={input} width="500px" height="auto" />
      </div>
    </div>
  )
}

export default FaceRecognition
