import React from 'react'
import { csv, scaleBand, scaleLinear, max, format } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import styles from './styles.module.css'

const yValuesCallback = (d) => d.Country
const xAxisLabel = 'Sepal Length'
const xValuesCallback = (d) => d.Population
const xAxisTickFormat = (n) => format('.2s')(n).replace('G', 'B')

const width = 960
const height = 500
const margin = { top: 20, right: 30, bottom: 75, left: 220 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 60

const csvUrl = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv'

const BarChart = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(function fetchData() {
    const rowDTO = (data) => ({ ...data, Population: Number(data['2020']) * 1000 })

    csv(csvUrl, rowDTO).then((data) => setData(data.slice(0, 10)))
  }, [])

  if (!data) return 'Loading...'
  // domain = data space
  // range = screen space
  const yScale = scaleBand()
    .domain(data.map(yValuesCallback)) // works well with nominal values
    .range([0, innerHeight]) // the bar starts at zero and grows until the total height
    .paddingInner(0.15)

  const xScale = scaleLinear()
    .domain([0, max(data, xValuesCallback)]) // from zero to the highest population value
    .range([0, innerWidth]) // the bar starts at zero and grows until the total width

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
        <AxisLeft yScale={yScale} />
        <text className={styles.axisLabel} x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          yScale={yScale}
          xScale={xScale}
          yValuesCallback={yValuesCallback}
          xValuesCallback={xValuesCallback}
          tooltipFromat={xAxisTickFormat}
        />
      </g>
    </svg>
  )
}

export default BarChart
