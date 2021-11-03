import './App.css'
import BarChart from './views/VegLiteAPI/BarChart'
import LineChart from './views/VegLiteAPI/LineChart'
import SmileFace from './views/SmileFace'
import ColorsPieChart from './views/ColorsPieChart'
import D3BarChart from './views/D3Charts/BarChart'
import D3ScatterPlot from './views/D3Charts/ScatterPlot'
import D3LineChart from './views/D3Charts/LineChart'

function App() {
  return (
    <div className='App'>
      {/* <SmileFace /> */}
      {/* <BarChart /> */}
      {/* <LineChart /> */}
      {/* <ColorsPieChart /> */}
      {/* <D3BarChart /> */}
      {/* <D3ScatterPlot /> */}
      <D3LineChart />
    </div>
  )
}

export default App
