import React from 'react'
import { csv, scaleLinear, scaleTime, extent, timeFormat } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import styles from './styles.module.css'

const xValuesCallback = (d) => d.timestamp
const xAxisLabel = 'Time'
const yValuesCallback = (d) => d.temperature
const yAxisLabel = 'Temperature'
// https://github.com/d3/d3-format
const xAxisTickFormat = timeFormat('%a')

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 75, left: 100 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 60
const yAxisLabelOffset = 50
const circleRadius = 4
const strokeWidth = 4

const csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv'

const LineChart = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(function fetchData() {
    const rowDTO = (data) => ({
      temperature: Number(data.temperature),
      timestamp: new Date(data.timestamp),
    })

    csv(csvUrl, rowDTO).then(setData)
  }, [])

  if (!data) return 'Loading...'
  // domain = data space
  // range = screen space
  const yScale = scaleLinear()
    // .domain([max(data, yValuesCallback), max(data, yValuesCallback)])
    .domain(extent(data, yValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([innerHeight, 0])
    .nice()

  const xScale = scaleTime()
    // .domain([max(data, xValuesCallback), max(data, xValuesCallback)])
    .domain(extent(data, xValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([0, innerWidth])
    .nice()

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
        <text
          className={styles.axisLabel}
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text className={styles.axisLabel} x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          yValuesCallback={yValuesCallback}
          xValuesCallback={xValuesCallback}
          tooltipFormat={xAxisTickFormat}
          circleRadius={circleRadius}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  )
}

export default LineChart
