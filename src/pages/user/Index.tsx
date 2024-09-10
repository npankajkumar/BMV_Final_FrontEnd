
import { Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import Bookings from './Bookings';
import Venue from './Venue';
import Home from './Home';

const Index = () => {
  return (
      <Routes>
        <Route path='/' element={<div><Home/></div>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/venues/:id' element={<div><Venue/></div>}/>
        <Route path='*' element={<div>User Not Found</div>}/>
      </Routes>
  )
}

export default Index