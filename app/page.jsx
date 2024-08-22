"use client"

import React, { useEffect, useState } from 'react'
import Todos from '@/components/Todos'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const page = () => {
  const[formData,setFormData]=useState({
    title:"",
    description:"",
  })

  const onchangeHandler = (e) =>{
    const name=e.target.name;
    const value=e.target.value;
    setFormData(form => ({...form,[name]:value}))
  }
  console.log(formData)
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try{
      //api
      const response = await axios.post("/api",formData)
      toast.success(response.data.msg)
      setFormData({
        title:"",
        description:"",
      })
      await fetchTodo();
    }
    catch(error){
      toast.error("Error");
    }
  }

  const[todoData,setTodoData]=useState([])


  const fetchTodo= async()=>{
    const response=await axios("/api")
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) =>{
    const response=await axios.delete("/api",{
      params:{
        mongoId:id,
      }
    })
    toast.success(response.data.msg);
    fetchTodo();
  }

  const completeTodo=async (id)=>{
    const response=await axios.put('/api',{},{
      params:{
        mongoId:id,
      }
    })
    toast.success(response.data.msg);
    fetchTodo();
  }

  useEffect(()=>{
    fetchTodo()
  },[])

  return (
    <div className='w-full '>
      <ToastContainer theme='dark'/>
      <form onSubmit={onSubmitHandler} className=' flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto text-white'>
        <input value={formData.title} onChange={onchangeHandler} type="text" name='title' placeholder='Enter Title' className='bg-black  px-3 py-2 border-[1px] w-full' />
        <textarea value={formData.description} onChange={onchangeHandler} name="description" placeholder='Enter Description' className='bg-black  px-3 py-2 border-[1px] w-full resize-none'></textarea>
      
     

<button className="button-82-pushable mt-2 relative border-none bg-transparent p-0 cursor-pointer outline-none transition-filter duration-250 ease-in select-none hover:filter-brightness-110 active:outline-none focus:outline-none focus-visible:outline-offset-4">
  <span className="button-82-shadow absolute inset-0 rounded-[12px] bg-[hsl(0,0%,0%,0.25)] transform translate-y-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)]"></span>
  <span className="button-82-edge absolute inset-0 rounded-[12px] bg-gradient-to-l from-[hsl(340,100%,16%)] via-[hsl(340,100%,32%)] to-[hsl(340,100%,16%)]"></span>
  <span className="button-82-front relative block px-[27px] py-[12px] rounded-[12px] text-white text-[1.1rem] bg-[hsl(345,100%,47%)] transform translate-y-[-4px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] hover:translate-y-[-6px] hover:duration-[250ms] active:translate-y-[-2px] active:duration-[34ms] sm:px-[42px] sm:text-[1.25rem]">
    Add Task
  </span>
</button>
      </form>
      
      

<div className="relative overflow-x-auto mt-16 w-[60%] mx-auto ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           {
            todoData.map((item,index)=>(
              <Todos key={index} title={item.title} description={item.description} isComplete={item.isCompleted} id={index} mongoId={item._id} deleteTodo={deleteTodo} completedTodo={completeTodo} />
            ))
           }
        </tbody>
    </table>
</div>


    </div>
  )
}

export default page