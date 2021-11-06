import React from 'react'
import { csv, scaleLinear, extent, timeFormat, bin, timeMonths, sum, max } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import styles from './styles.module.scss'

const width = 960
const height = 500
const margin = { top: 20, right: 20, bottom: 75, left: 100 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 60
const yAxisLabelOffset = 50
const xAxisLAbel = 'Time'
const yAxisLAbel = 'Total Dead and Missing'

const xAxisTickFormat = timeFormat('%m/%d/%y')
const xValuesCallback = (d) => d.time
const yValuesCallback = (d) => d.totalDeadAndMissing

const csvUrl =
  'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv'

const MigrantsHistogram = () => {
  const [data, setData] = React.useState(null)

  React.useEffect(function fetchData() {
    const rowDTO = (r) => ({
      ...r,
      totalDeadAndMissing: Number(r['Total Dead and Missing']),
      time: new Date(r['Reported Date']),
    })

    csv(csvUrl, rowDTO).then(setData)
  }, [])

  if (!data) return 'Loading...'

  const xScale = scaleLinear().domain(extent(data, xValuesCallback)).range([0, innerWidth]).nice()
  const [start, stop] = xScale.domain()
  const binnedData = bin()
    .value(xValuesCallback)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({ y: sum(array, yValuesCallback), x0: array.x0, x1: array.x1 }))

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0])

  return (
    <svg width={width} height={height} style={{ border: '1px solid black' }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
        <text
          className={`${styles.axisLabel} ${styles.tick}`}
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLAbel}
        </text>

        <AxisLeft yScale={yScale} innerWidth={innerWidth} />
        <text className={`${styles.axisLabel} ${styles.tick}`} x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>
          {xAxisLAbel}
        </text>

        <Marks
          binnedData={binnedData}
          yScale={yScale}
          xScale={xScale}
          tooltipFromat={(d) => d}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  )
}

export default MigrantsHistogram
