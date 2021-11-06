import React from 'react'
import { csv, scaleLinear, extent, format, scaleOrdinal } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import { Dropdown } from '../../../components/Dropdown'
import { ColorScale } from './ColorScale'
import styles from './styles.module.scss'

const initialXAttribute = 'sepal_width'
const xAxisTickFormat = (n) => format('.2s')(n).replace('G', 'B')
const initialYAttribute = 'sepal_length'

const width = 960
const height = 500
const margin = { top: 20, right: 175, bottom: 75, left: 100 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 60
const yAxisLabelOffset = 50
const circleRadius = 7
const fadeOpacity = '0.2'

const attributes = [
  { value: 'sepal_width', label: 'Sepal Width' },
  { value: 'sepal_length', label: 'Sepal Length' },
  { value: 'petal_length', label: 'Petal Length' },
  { value: 'petal_width', label: 'Petal Width' },
  { value: 'species', label: 'Species' },
]

const getLabel = (value) => attributes.find((a) => a.value === value).label

const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'

const ScatterPlot = () => {
  const [data, setData] = React.useState(null)
  const [filteredData, setFilteredData] = React.useState([])
  const [hoveredValue, setHoveredValue] = React.useState(null)
  const [xAttribute, setXAttribute] = React.useState(initialXAttribute)
  const [yAttribute, setYAttribute] = React.useState(initialYAttribute)

  React.useEffect(function fetchData() {
    const rowDTO = (data) =>
      Object.keys(data).reduce((r, k) => ({ ...r, [k]: isNaN(Number(data[k])) ? data[k] : Number(data[k]) }), {})

    csv(csvUrl, rowDTO).then(setData)
  }, [])

  const xValuesCallback = (d) => d[xAttribute]
  const yValuesCallback = (d) => d[yAttribute]
  const colorValuesCallback = (d) => d.species

  if (!data) return 'Loading...'
  // domain = data space
  // range = screen space
  const yScale = scaleLinear()
    // .domain([max(data, yValuesCallback), max(data, yValuesCallback)])
    .domain(extent(data, yValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([0, innerHeight])
    .nice()

  const xScale = scaleLinear()
    // .domain([max(data, xValuesCallback), max(data, xValuesCallback)])
    .domain(extent(data, xValuesCallback)) // extent hace lo mismo que la linea anterior
    .range([0, innerWidth])
    .nice()

  const colorScale = scaleOrdinal().domain(data.map(colorValuesCallback)).range(['#e6842a', '#137b80', '#8e6c8a'])

  const handleColorScaleMouseEnter = (domainValue) => {
    setHoveredValue(domainValue)
    setFilteredData(data.filter((d) => d.species === domainValue))
  }

  const handleColorScaleMouseLeave = () => setHoveredValue(null)

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Dropdown
          label={'X: '}
          id='x-select'
          options={attributes}
          onChange={setXAttribute}
          selectedValue={xAttribute}
          className={styles.dropdown}
        />
        <Dropdown
          label={'Y: '}
          id='y-select'
          options={attributes}
          onChange={setYAttribute}
          selectedValue={yAttribute}
          className={styles.dropdown}
        />
      </div>

      <svg width={width} height={height} style={{ border: '1px solid black' }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g transform={`translate(${innerWidth + 50}, 60)`}>
            <text className={`${styles.axisLabel} ${styles.tick}`} x={35} y={-25}>
              {getLabel('species')}
            </text>
            <ColorScale
              colorScale={colorScale}
              tickSize={circleRadius}
              onMouseEnter={handleColorScaleMouseEnter}
              onMouseLeave={handleColorScaleMouseLeave}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>

          <AxisBottom innerHeight={innerHeight} xScale={xScale} formatTickValue={xAxisTickFormat} />
          <text
            className={`${styles.axisLabel} ${styles.tick}`}
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
          >
            {getLabel(yAttribute)}
          </text>
          <AxisLeft yScale={yScale} innerWidth={innerWidth} />
          <text className={`${styles.axisLabel} ${styles.tick}`} x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>
            {getLabel(xAttribute)}
          </text>
          <g opacity={hoveredValue ? fadeOpacity : '1'}>
            <Marks
              data={data}
              yScale={yScale}
              yValuesCallback={yValuesCallback}
              xScale={xScale}
              xValuesCallback={xValuesCallback}
              colorScale={colorScale}
              colorValuesCallback={colorValuesCallback}
              tooltipFromat={xAxisTickFormat}
              circleRadius={circleRadius}
            />
          </g>
          <Marks
            data={filteredData}
            yScale={yScale}
            yValuesCallback={yValuesCallback}
            xScale={xScale}
            xValuesCallback={xValuesCallback}
            colorScale={colorScale}
            colorValuesCallback={colorValuesCallback}
            tooltipFromat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  )
}

export default ScatterPlot
