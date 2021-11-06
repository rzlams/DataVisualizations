import React from 'react'
import styles from './styles.module.scss'

export const Marks = ({
  data,
  yScale,
  xScale,
  yValuesCallback,
  xValuesCallback,
  tooltipFromat,
  circleRadius = 10,
  colorScale,
  colorValuesCallback,
}) =>
  data.map((d, i) => (
    <circle
      key={i}
      className={styles.mark}
      cx={xScale(xValuesCallback(d))}
      cy={yScale(yValuesCallback(d))}
      fill={colorScale(colorValuesCallback(d))}
      r={circleRadius}
    >
      <title>{tooltipFromat(xValuesCallback(d))}</title>
    </circle>
  ))
