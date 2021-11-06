import React from 'react'
import styles from './styles.module.scss'

export const Marks = ({ binnedData, yScale, xScale, innerHeight, tooltipFromat }) =>
  binnedData.map((d, i) => (
    <rect
      key={i}
      className={styles.mark}
      x={xScale(d.x0)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={innerHeight - yScale(d.y)}
    >
      <title>{tooltipFromat(d.y)}</title>
    </rect>
  ))
