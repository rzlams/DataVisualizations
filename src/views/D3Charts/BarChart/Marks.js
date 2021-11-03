import React from 'react'

export const Marks = ({ data, yScale, xScale, yValuesCallback, xValuesCallback, tooltipFromat }) =>
  data.map((d, i) => (
    <rect
      className='mark'
      key={i}
      x={0}
      y={yScale(yValuesCallback(d))}
      width={xScale(xValuesCallback(d))}
      height={yScale.bandwidth()}
    >
      <title>{tooltipFromat(xValuesCallback(d))}</title>
    </rect>
  ))
