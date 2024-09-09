
import { Route, Routes } from 'react-router-dom';

const Index = () => {
  return (
      <Routes>
        <Route path='/' element={<div>User Home</div>}/>
        <Route path='/profile' element={<div>User Profile</div>}/>
        <Route path='/bookings' element={<div>User Home</div>}/>
        <Route path='/venue' element={<div>User Home</div>}/>
        <Route path='*' element={<div>User Not Found</div>}/>
      </Routes>
  )
}

export default Index