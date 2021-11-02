import * as vl from 'vega-lite-api'

export const viz = vl
  .markBar()
  .encode(vl.x().fieldN('country').sort('-y'), vl.y().fieldQ('population'), vl.tooltip().fieldN('population'))
