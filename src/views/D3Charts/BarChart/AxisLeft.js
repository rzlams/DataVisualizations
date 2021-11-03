import React from 'react'

// yScale.domain() returns whatever value we set before to the domain
export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue, i) => (
    <g className='tick'>
      <text key={i} style={{ textAnchor: 'end' }} x={-3} dy='.32em' y={yScale(tickValue) + yScale.bandwidth() / 2}>
        {tickValue}
      </text>
    </g>
  ))
