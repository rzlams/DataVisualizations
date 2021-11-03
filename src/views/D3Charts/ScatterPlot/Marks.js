import React from 'react'

export const Marks = ({ data, yScale, xScale, yValuesCallback, xValuesCallback, tooltipFromat, circleRadius = 10 }) =>
  data.map((d, i) => (
    <circle className='mark' key={i} cx={xScale(xValuesCallback(d))} cy={yScale(yValuesCallback(d))} r={circleRadius}>
      <title>{tooltipFromat(xValuesCallback(d))}</title>
    </circle>
  ))
