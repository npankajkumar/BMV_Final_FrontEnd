import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"
import UserVenueCardsGrid from "./components/UserVenueCardsGrid"
import { venueCardsData } from "./db"
import Venue from "./pages/user/Venue"

function App() {

  return (
    <div className="w-full">
      <NavBar />
      {/* <SearchBar className="mx-auto my-8"/>
      <UserVenueCardsGrid title="Top-rated" className="ml-10" cardDataArray={venueCardsData}/> */}
      <Venue/>
    </div>
  )
}

export default App
