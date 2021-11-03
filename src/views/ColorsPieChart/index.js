import React from 'react'
import { csv, arc, pie } from 'd3'

const PieChart = () => {
  const [data, setData] = React.useState(null)

  const csvUrl = 'https://gist.githubusercontent.com/skill-devs/5ab544e7b0b181e5ca3634bccc60a834/raw/cssColor.csv'

  React.useEffect(function fetchData() {
    csv(csvUrl).then(setData)
  }, [])

  const width = 960
  const height = 500
  const centerX = width / 2
  const centerY = height / 2
  const pieArc = arc().innerRadius(0).outerRadius(width)

  const colorPie = pie().value(1)

  if (!data) return 'Loading...'

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          {colorPie(data).map((d, i) => (
            <path key={i} fill={d.data['Valor RGB hexadecimal']} d={pieArc(d)} />
          ))}
        </g>
      </svg>

      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          {data.map((d, i) => (
            <path
              key={i}
              fill={d['Valor RGB hexadecimal']}
              d={pieArc({
                startAngle: (i / data.length) * 2 * Math.PI,
                endAngle: ((i + 1) / data.length) * 2 * Math.PI,
              })}
            />
          ))}
        </g>
      </svg>
    </>
  )
}

export default PieChart
