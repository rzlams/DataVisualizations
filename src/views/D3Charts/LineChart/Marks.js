import React from 'react'
import { line, curveNatural } from 'd3'
import styles from './styles.module.css'

export const Marks = ({
  data,
  yScale,
  xScale,
  yValuesCallback,
  xValuesCallback,
  tooltipFormat,
  circleRadius = 5,
  strokeWidth = 3,
}) =>
  data.map((d, i) => (
    <g key={i} className={styles.mark}>
      <path
        strokeWidth={strokeWidth}
        d={line()
          .x((d) => xScale(xValuesCallback(d)))
          .y((d) => yScale(yValuesCallback(d)))
          .curve(curveNatural)(data)}
      />
      {/* <circle key={i} cx={xScale(xValuesCallback(d))} cy={yScale(yValuesCallback(d))} r={circleRadius}>
        <title>{tooltipFormat(xValuesCallback(d))}</title>
      </circle> */}
    </g>
  ))
