import React from 'react'
import * as topojson from 'topojson-client'
import { json, csv, scaleSqrt, max } from 'd3'
import { Marks } from './Marks'

const width = 960
const height = 500
const sizeValueCallback = (d) => d.population
const maxRadius = 15

const countriesJsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
const citiesCsvUrl =
  'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/worldcities_clean.csv'

const MapTopoJSON = () => {
  const [wordlAtlasData, setWordlAtlasData] = React.useState(null)
  const [citiesData, setCitiesData] = React.useState(null)

  React.useEffect(function fetchData() {
    json(countriesJsonUrl).then((topology) => {
      const countries = topology.objects.countries
      const geoJSONData = topojson.feature(topology, countries)
      setWordlAtlasData({
        land: geoJSONData,
        interiors: topojson.mesh(topology, countries, (a, b) => a !== b),
      })
    })

    const rowDTO = (r) => ({ ...r, lat: Number(r.lat), lng: Number(r.lng), population: Number(r.population) })
    csv(citiesCsvUrl, rowDTO).then(setCitiesData)
  }, [])

  if (!wordlAtlasData || !citiesData) return 'Loading...'

  const sizeScale = scaleSqrt()
    .domain([0, max(citiesData, sizeValueCallback)])
    .range([0, maxRadius])

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <Marks
        wordlAtlas={wordlAtlasData}
        cities={citiesData}
        sizeScale={sizeScale}
        sizeValueCallback={sizeValueCallback}
      />
    </svg>
  )
}

export default MapTopoJSON
