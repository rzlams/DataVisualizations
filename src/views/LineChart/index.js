import React from 'react'
import * as vega from 'vega'
import * as vegaLite from 'vega-lite'
import * as vl from 'vega-lite-api'
import { Handler } from 'vega-tooltip'
import { config } from './config'
import { getData } from './getData'
import { viz } from './viz'
import parseHTML from 'html-react-parser'

vl.register(vega, vegaLite, {
  view: { renderer: 'svg' },
  init: (view) => {
    view.tooltip(new Handler().call)
  },
})

const LineChart = () => {
  const [visualization, setVisualization] = React.useState(null)

  React.useEffect(function initVega() {
    getData().then((data) => {
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
