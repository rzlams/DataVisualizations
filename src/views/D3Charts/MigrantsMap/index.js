import React from 'react'
import * as topojson from 'topojson-client'
import { json, csv } from 'd3'
import { BubbleMap } from './BubbleMap'
import DateHistogram from './DateHistogram'

const width = 960
const height = 500

const dateHistogramSize = '0.2'
const xValuesCallback = (d) => d.time
const yValuesCallback = (d) => d.totalDeadAndMissing

const countriesJsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
const mirantsCsvUrl =
  'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

const MigrantsMap = () => {
  const [wordlAtlasData, setWordlAtlasData] = React.useState(null)
  const [migrantsData, setMigrantsData] = React.useState(null)
  const [brushExtent, setBrushExtent] = React.useState([])

  React.useEffect(function fetchData() {
    json(countriesJsonUrl).then((topology) => {
      const countries = topology.objects.countries
      const geoJSONData = topojson.feature(topology, countries)
      setWordlAtlasData({
        land: geoJSONData,
        interiors: topojson.mesh(topology, countries, (a, b) => a !== b),
      })
    })

    const rowDTO = (r) => ({
      time: new Date(r['Reported Date']),
      totalDeadAndMissing: Number(r['Total Dead and Missing']),
      coords: r['Location Coordinates']
        .split(',')
        .map((c) => Number(c))
        .reverse(),
    })
    csv(mirantsCsvUrl, rowDTO).then(setMigrantsData)
  }, [])

  if (!wordlAtlasData || !migrantsData) return 'Loading...'

  const filteredMigrantsData = migrantsData.filter((d) => {
    if (!brushExtent || brushExtent.length === 0) return d

    const date = xValuesCallback(d)
    return date > brushExtent[0] && date < brushExtent[1]
  })

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <BubbleMap wordlAtlas={wordlAtlasData} migrants={migrantsData} filteredMigrants={filteredMigrantsData} />
      <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
        <DateHistogram
          data={migrantsData}
          height={dateHistogramSize * height}
          width={width}
          setBrushExtent={setBrushExtent}
          xValuesCallback={xValuesCallback}
          yValuesCallback={yValuesCallback}
        />
      </g>
    </svg>
  )
}

export default MigrantsMap
