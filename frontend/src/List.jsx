import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
function List() {
    const [list,setList]=useState("")
    const [task,setTask]=useState({})
  
    useEffect(() => {
      axios.get('/api/to_do_list')
          .then((res) => {
              if (res.data.success)
                  setTask(res.data.data);
          })
          .catch((err) => console.log(err));
  },[]);
  
    const submitHandler=(e)=>{
      e.preventDefault()
      if(list.length>0){
        axios.post('/api/to_do_list',{list})
        .then((res)=>{
            console.log(res)
            setList("")
            axios.get('/api/to_do_list')
            .then((res) => {
                if (res.data.success)
                    setTask(res.data.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err)=>console.log(err))
        }
    }
    const onDelete=(index)=>{
      axios.delete(`/api/to_do_list/${index}`)
      .then((res)=>{
        console.log(res.data)
        setTask(res.data)
      })
      .catch((err)=>console.log(err))
    }
    function renderTask() {
        return(
           Object.entries(task).map(([key, value],index) => (
            <li key={key} className="flex justify-between my-4 items-center">
                <h1>{index+1}</h1>
                <h1>{value}</h1>
                <button className="text-white bg-black rounded-3xl px-3 py-2" onClick={() => onDelete(key)}>Delete</button>
            </li>
        )))
    }
    
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand">To_Do_List</a>
            <div className="d-flex">
              <button type="button" className="btn btn-dark me-2">Logout</button>
              
            </div>
          </div>
        </nav>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 '>
          <form onSubmit={submitHandler} className="flex ">
            <input type="text" className="rounded-3xl w-full px-3 py-2 text-xl border-zinc-700 border-2" placeholder="Enter Your Task..." value={list} onChange={(e)=>setList(e.target.value)}/>
            <button className="bg-black text-white px-4 py-2 text-xl font-bold rounded-3xl">ADD</button>
          </form>
          <hr />
          <div className="text-center p-8 w-full">
            <ul>
            {Object.keys(task).length>0?renderTask():<h2>No Tasks Available</h2>}
            </ul>
          </div>
        </div>       
      </>
    )
  }

export default List
