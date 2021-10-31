import React from 'react'

const Eyes = ({ eyeOffsetX, eyeOffsetY, eyeRadius }) => {
  return (
    <>
      <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
      <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
    </>
  )
}

export default Eyes
