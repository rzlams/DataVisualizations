import React from 'react'
import BackgroundCircle from './BackgroundCircle'
import Eyes from './Eyes'
import Mouth from './Mouth'

const SmileFace = ({
  width = 960,
  height = 500,
  centerX = width / 2,
  centerY = height / 2,
  strokeWidth = 10,
  eyeOffsetX = 90,
  eyeOffsetY = 100,
  eyeRadius = 40,
  mouthWidth = 20,
  mouthRadius = 140,
}) => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <BackgroundCircle radius={centerY - strokeWidth / 2} strokeWidth={strokeWidth} />
        <Eyes eyeOffsetX={eyeOffsetX} eyeOffsetY={eyeOffsetY} eyeRadius={eyeRadius} />
        <Mouth mouthWidth={mouthWidth} mouthRadius={mouthRadius} />
      </g>
    </svg>
  )
}

export default SmileFace
