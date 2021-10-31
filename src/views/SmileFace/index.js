import React from 'react'
import BackgroundCircle from './BackgroundCircle'
import Eyes from './Eyes'
import Mouth from './Mouth'

// import { csv } from 'd3'
// const fetchText = async (url) => {
//   const response = await fetch(url)
//   const data = await response.text()
//   return csvParse(data)
// }

// const csvUrl = 'https://gist.githubusercontent.com/skill-devs/5ab544e7b0b181e5ca3634bccc60a834/raw/cssColor.csv'
// const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv'
// csv(csvUrl).then((data) => console.log(data))

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
