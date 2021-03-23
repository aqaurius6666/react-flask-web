import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react/cjs/react.production.min';
import './App.css';
import BarChart, { fetchData } from "./Components/chartComponent";

function App() {
  return (
    <div className="App">

      <BarChart />
    </div>
  );
}

export default App;
