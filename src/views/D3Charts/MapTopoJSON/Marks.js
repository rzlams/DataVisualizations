import React from 'react'
import { geoEqualEarth, geoPath, geoGraticule } from 'd3'
import styles from './styles.module.scss'

const projection = geoEqualEarth()
const path = geoPath(projection)
const graticule = geoGraticule()

export const Marks = ({ wordlAtlas: { land, interiors }, cities, sizeScale, sizeValueCallback }) => (
  <g className={styles.marks}>
    <path className={styles.sphere} d={path({ type: 'Sphere' })} />

    <path className={styles.graticule} d={path(graticule())} />

    {land.features.map((f, i) => (
      <path className={styles.land} key={i} d={path(f)} />
    ))}

    <path className={styles.interiors} d={path(interiors)} />

    {cities.map((c, i) => {
      const [x, y] = projection([c.lng, c.lat])

      return <circle key={i} className={styles.cities} cx={x} cy={y} r={sizeScale(sizeValueCallback(c))} />
    })}
  </g>
)
