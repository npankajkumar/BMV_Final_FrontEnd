import NavBar from "./components/NavBar";
import RegisterVenue from "./components/RegisterVenue";
import { DataTable } from "./components/data-table/DataTable";
import { columns } from "./components/data-table/columns";
import { availableSlots } from "./db";

function App() {
  return (
    <div className="w-full h-svh">
      <NavBar />
      <div className="m-5">
        <DataTable columns={columns} data={availableSlots}/>
      </div>
    </div>
  );
}

export default App;
