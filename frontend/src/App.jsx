import React from 'react'
import Nav from './Nav'
import SignIn from './SignIn'
import { Route, Routes } from 'react-router-dom'
import List from './List'
function App() {
  return (
    <div>
      <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/List" element={<List/>}/>
      </Routes>
    </div>
  )
}

export default App
