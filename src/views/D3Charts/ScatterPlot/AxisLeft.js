import React from 'react'

// yScale.domain() returns whatever value we set before to the domain
export const AxisLeft = ({ yScale, innerWidth }) =>
  yScale.ticks().map((tickValue, i) => (
    <g className='tick' transform={`translate(0, ${yScale(tickValue)})`}>
      {/* Los atributos requeridos de line son x1 x2 y1 y2 y todos tienen como valor por default 0 */}
      <line x2={innerWidth} />
      <text key={i} style={{ textAnchor: 'end' }} x={-3} dy='.32em'>
        {tickValue}
      </text>
    </g>
  ))
