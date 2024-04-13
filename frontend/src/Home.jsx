import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <h1 id="heading" className="text-center">Create your To Do List</h1>
      <Link to="/SignIn"><button className='mt-4 btn btn-dark bg-dark py-2'>SignIn/SignUp</button></Link>
    </div>
  )
}

export default Home