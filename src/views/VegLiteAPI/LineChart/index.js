import React from 'react'
import { csv } from 'd3'
import * as vega from 'vega'
import * as vegaLite from 'vega-lite'
import * as vl from 'vega-lite-api'
import { Handler } from 'vega-tooltip'
import { config } from '../config'
import parseHTML from 'html-react-parser'

vl.register(vega, vegaLite, {
  view: { renderer: 'svg' },
  init: (view) => {
    view.tooltip(new Handler().call)
  },
})

const LineChart = () => {
  const [visualization, setVisualization] = React.useState(null)

  const csvUrl =
    'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv'

  React.useEffect(function initVega() {
    const viz = vl
      .markLine({ size: 5, opacity: 1 })
      // .markArea({ size: 5, opacity: 1 })
      .encode(vl.x().fieldT('timestamp'), vl.y().fieldQ('temperature'), vl.tooltip().fieldN('temperature'))

    csv(csvUrl).then((data) => {
      const marks = viz
        .data(data)
        .width(window.innerWidth)
        .height(window.innerHeight)
        .autosize({ type: 'fit', cotains: 'padding' })
        .config(config)

      marks.render().then((visualization) => setVisualization(visualization?.outerHTML))
    })
  }, [])

  return visualization ? parseHTML(visualization) : 'Loading...'
}

export default LineChart
