import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"
import UserVenueCardsGrid from "./components/UserVenueCardsGrid"

function App() {

  return (
    <div className="w-full">
      <NavBar />
      <SearchBar className="mx-auto my-8"/>
      <UserVenueCardsGrid title="Top-rated" className="ml-10"/>
    </div>
  )
}

export default App
