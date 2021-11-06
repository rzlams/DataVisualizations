import React from 'react'
import { geoEqualEarth, geoPath, geoGraticule, scaleSqrt, max } from 'd3'
import styles from './styles.module.scss'

const projection = geoEqualEarth()
const path = geoPath(projection)
const graticule = geoGraticule()
const maxRadius = 15
const sizeValueCallback = (d) => d.totalDeadAndMissing

export const BubbleMap = ({ wordlAtlas: { land, interiors }, migrants, filteredMigrants }) => {
  const sizeScale = React.useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(filteredMigrants, sizeValueCallback)])
        .range([0, maxRadius]),
    [filteredMigrants]
  )

  return (
    <g className={styles.marks}>
      {React.useMemo(
        () => (
          <>
            <path className={styles.sphere} d={path({ type: 'Sphere' })} />

            <path className={styles.graticule} d={path(graticule())} />

            {land.features.map((f, i) => (
              <path className={styles.land} key={i} d={path(f)} />
            ))}

            <path className={styles.interiors} d={path(interiors)} />
          </>
        ),
        [interiors, land]
      )}

      {migrants.map((m, i) => {
        const [x, y] = projection(m.coords)

        return <circle key={i} className={styles.migrants} cx={x} cy={y} r={sizeScale(sizeValueCallback(m))} />
      })}
    </g>
  )
}
