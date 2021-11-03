import React from 'react'
import { csv, scaleLinear, extent, format } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import './styles.css'

const xValuesCallback = (d) => d.sepal_length
const xAxisLabel = 'Sepal Length'
const yValuesCallback = (d) => d.sepal_width
const yAxisLabel = 'Sepal Width'
const xAxisTickFormat = (n) => format('.2s')(n).replace('G', 'B')

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 75, left: 100 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 60
const yAxisLabelOffset = 50
const circleRadius = 7

const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'

const ScatterPlot = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(function fetchData() {
    const rowDTO = (data) =>
      Object.keys(data).reduce((r, k) => ({ ...r, [k]: isNaN(Number(data[k])) ? data[k] : Number(data[k]) }), {})

    csv(csvUrl, rowDTO).then(setData)
  }, [])

  if (!data) return 'Loading...'
  // domain = data space
  // range = screen space
  const yScale = scaleLinear()
    // .domain([max(data, yValuesCallback), max(data, yValuesCallback)])
    .domain(extent(data, yValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([0, innerHeight])
  const xScale = scaleLinear()
    // .domain([max(data, xValuesCallback), max(data, xValuesCallback)])
    .domain(extent(data, xValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([0, innerWidth])
    .nice()

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
        <text className='axis-label' transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}>
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text className='axis-label' x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          yValuesCallback={yValuesCallback}
          xValuesCallback={xValuesCallback}
          tooltipFromat={xAxisTickFormat}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  )
}

export default ScatterPlot
