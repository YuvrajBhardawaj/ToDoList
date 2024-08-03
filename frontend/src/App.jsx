import React from 'react'
import SignIn from './SignIn'
import { Route, Routes } from 'react-router-dom'
import List from './List'
import Home from './Home'
function App() {
  return (
    <div>
      <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/List" element={<List/>}/>
          <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
