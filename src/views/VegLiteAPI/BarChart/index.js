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

const BarChart = () => {
  const [visualization, setVisualization] = React.useState(null)

  const csvUrl =
    'https://gist.githubusercontent.com/curran/0d2cc6698cad72a48027b8de0ebb417d/raw/religionByCountryTop20.csv'

  React.useEffect(function initVega() {
    const viz = vl.markBar().encode(
      vl.x().fieldN('country').sort('-y'),
      vl.y().fieldQ('population'),
      // vl.y().fieldN('religion'),
      vl.color().fieldN('religion'),
      vl.tooltip().fieldN('population')
    )

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

export default BarChart
