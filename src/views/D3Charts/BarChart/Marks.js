import React from 'react'
import styles from './styles.module.css'

export const Marks = ({ data, yScale, xScale, yValuesCallback, xValuesCallback, tooltipFromat }) =>
  data.map((d, i) => (
    <rect
      className={styles.mark}
      key={i}
      x={0}
      y={yScale(yValuesCallback(d))}
      width={xScale(xValuesCallback(d))}
      height={yScale.bandwidth()}
    >
      <title>{tooltipFromat(xValuesCallback(d))}</title>
    </rect>
  ))
