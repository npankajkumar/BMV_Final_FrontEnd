import NavBar from "./components/NavBar";
import {EarningsChart} from "./components/line-chart/LineChart"
import { chartData } from "./db";

function App() {
  return (
    <div className="w-full h-svh">
      <NavBar />
      <div className="m-5">
        <EarningsChart className="w-1/4 h-1/4" data={chartData} percentageIncrease={0.12} bookings={100}/>
      </div>
    </div>
  );
}

export default App;
