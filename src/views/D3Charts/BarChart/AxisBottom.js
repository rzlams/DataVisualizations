import React from 'react'

export const AxisBottom = ({ innerHeight, xScale, formatTickValue }) =>
  xScale.ticks().map((tickValue, i) => (
    <g className='tick' key={i} transform={`translate(${xScale(tickValue)}, 0)`}>
      <line x1={0} y1={0} x2={0} y2={innerHeight} />
      <text style={{ textAnchor: 'middle' }} dy='1em' y={innerHeight}>
        {formatTickValue(tickValue)}
      </text>
    </g>
  ))
