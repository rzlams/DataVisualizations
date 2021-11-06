import React from 'react'
import styles from './styles.module.scss'

export const ColorScale = ({
  colorScale,
  tickSpacing = 22,
  tickSize = 12,
  tickTextOffset = 20,
  onMouseEnter,
  onMouseLeave,
  hoveredValue,
  fadeOpacity,
}) => {
  const handleMouseEnter = (domainValue) => typeof onMouseEnter === 'function' && onMouseEnter(domainValue)
  const handleMouseLeave = () => typeof onMouseLeave === 'function' && onMouseLeave()

  return colorScale.domain().map((d, i) => (
    <g
      key={i}
      transform={`translate(0, ${i * tickSpacing})`}
      onMouseEnter={() => handleMouseEnter(d)}
      onMouseLeave={handleMouseLeave}
      opacity={!hoveredValue || d === hoveredValue ? '1' : fadeOpacity}
    >
      <circle fill={colorScale(d)} r={tickSize} />

      <text className={styles.tick} dy='.32em' x={tickTextOffset}>
        {d}
      </text>
    </g>
  ))
}
