import React from 'react'
import { line, curveNatural } from 'd3'

export const Marks = ({
  data,
  yScale,
  xScale,
  yValuesCallback,
  xValuesCallback,
  tooltipFromat,
  circleRadius = 5,
  strokeWidth = 3,
}) =>
  data.map((d, i) => (
    <g className='mark'>
      <path
        strokeWidth={strokeWidth}
        d={line()
          .x((d) => xScale(xValuesCallback(d)))
          .y((d) => yScale(yValuesCallback(d)))
          .curve(curveNatural)(data)}
      />
      {/* <circle key={i} cx={xScale(xValuesCallback(d))} cy={yScale(yValuesCallback(d))} r={circleRadius}>
        <title>{tooltipFromat(xValuesCallback(d))}</title>
      </circle> */}
    </g>
  ))
