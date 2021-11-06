import './App.css'
import SmileFace from './views/SmileFace'
import BarChart from './views/VegLiteAPI/BarChart'
import LineChart from './views/VegLiteAPI/LineChart'
import ColorsPieChart from './views/ColorsPieChart'
import D3BarChart from './views/D3Charts/BarChart'
import D3LineChart from './views/D3Charts/LineChart'
import D3ScatterPlot from './views/D3Charts/ScatterPlot'
import MapTopoJSON from './views/D3Charts/MapTopoJSON'
import MigrantsHistogram from './views/D3Charts/MigrantsHistogram'
import MigrantsMap from './views/D3Charts/MigrantsMap'

function App() {
  return (
    <div className='App'>
      {/* <SmileFace /> */}
      {/* A los de Vega Lite API nunca les sirvio el toltip */}
      {/* <BarChart /> */}
      {/* <LineChart /> */}
      {/* <ColorsPieChart /> */}
      {/* <D3BarChart /> */}
      {/* <D3LineChart /> */}
      {/* <D3ScatterPlot /> */}
      {/* <MapTopoJSON /> */}
      {/* <MigrantsHistogram /> */}
      {/* Este mapa quedo con un problema de performance en el brush */}
      <MigrantsMap />
    </div>
  )
}

export default App
