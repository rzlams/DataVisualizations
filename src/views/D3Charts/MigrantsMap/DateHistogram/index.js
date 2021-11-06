import React from 'react'
import { scaleLinear, extent, timeFormat, bin, timeMonths, sum, max, brushX, select } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import styles from './styles.module.scss'

const margin = { top: 0, right: 25, bottom: 20, left: 40 }
const yAxisLabelOffset = 25
const yAxisLAbel = 'Total Dead and Missing'

const xAxisTickFormat = timeFormat('%m/%d/%y')

const DateHistogram = ({ data, height, width, setBrushExtent, xValuesCallback, yValuesCallback }) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const brushRef = React.useRef(null)

  const xScale = React.useMemo(
    () => scaleLinear().domain(extent(data, xValuesCallback)).range([0, innerWidth]).nice(),
    [data, xValuesCallback, innerWidth]
  )

  const [start, stop] = xScale.domain()
  const binnedData = React.useMemo(
    () =>
      bin()
        .value(xValuesCallback)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))(data)
        .map((array) => ({ y: sum(array, yValuesCallback), x0: array.x0, x1: array.x1 })),
    [data, start, stop, xScale, xValuesCallback, yValuesCallback]
  )

  const yScale = React.useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (d) => d.y)])
        .range([innerHeight, 0]),
    [binnedData, innerHeight]
  )

  React.useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ])

    brush(select(brushRef.current))
    brush.on('brush end', (e) => {
      setBrushExtent(e.selection ? e.selection.map(xScale.invert) : [])
    })
  }, [innerWidth, innerHeight, xScale.invert, setBrushExtent])

  return (
    <>
      <rect width={width} height={height} fill='white' />

      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
        <text
          className={`${styles.axisLabel} ${styles.tick}`}
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLAbel}
        </text>

        <AxisLeft yScale={yScale} innerWidth={innerWidth} />

        <Marks
          binnedData={binnedData}
          yScale={yScale}
          xScale={xScale}
          tooltipFromat={(d) => d}
          innerHeight={innerHeight}
        />

        <g ref={brushRef}></g>
      </g>
    </>
  )
}

export default DateHistogram
