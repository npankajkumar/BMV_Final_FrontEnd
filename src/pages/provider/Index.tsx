import NavBar from '@/components/NavBar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Index = () => {
  return (
      <Routes>
      <Route path='/' element={<div>Provider Home</div>}/>
      <Route path='/profile' element={<div>Provider Profile</div>}/>
      <Route path='/bookings' element={<div>Provider Bookings</div>}/>
      <Route path='/venues' element={<div>Provider Venues</div>}/>
      <Route path='/venues/:id' element={<div>Provider Venue Managment</div>}/>
      <Route path='*' element={<div>Provider Not Found</div>}/>
      </Routes>
  )
}

export default Index