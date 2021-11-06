import React from 'react'

const BackgroundCircle = ({ radius, strokeWidth, fill = 'yellow', stroke = 'black' }) => {
  return <circle r={radius} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
}

export default BackgroundCircle
