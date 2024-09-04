import NavBar from "./components/NavBar";
import RegisterVenue from "./components/RegisterVenue";

function App() {
  return (
    <div className="w-full h-svh">
      <NavBar />
      <div className="m-5">
        <RegisterVenue />
      </div>
    </div>
  );
}

export default App;
