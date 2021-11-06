import React from 'react'
import styles from './styles.module.css'

// yScale.domain() returns whatever value we set before to the domain
export const AxisLeft = ({ yScale }) =>
  yScale.domain().map((tickValue, i) => (
    <g key={i} className={styles.tick}>
      <text style={{ textAnchor: 'end' }} x={-3} dy='.32em' y={yScale(tickValue) + yScale.bandwidth() / 2}>
        {tickValue}
      </text>
    </g>
  ))
