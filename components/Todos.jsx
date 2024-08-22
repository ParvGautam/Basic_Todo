import React from 'react'

const Todos = ({title, description,isComplete,id,mongoId,deleteTodo,completedTodo}) => {
  return (
    <tr className="bg-black border-b dark:bg-black dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id+1}
                </th>
                <td className={`px-6 py-4 ${isComplete ? "line-through" : ""}`}>
                    {title}
                </td>
                <td className={`px-6 py-4 ${isComplete ? "line-through" : ""}`}>
                    {description}
                </td>
                <td className="px-6 py-4">
                    {isComplete ? "Complete" : "Pending"}
                </td>
                <td className="px-6 py-4 flex justify-around">
                {isComplete ? (<button onClick={()=>deleteTodo(mongoId)} className='px-4 py-2 bg-red-700 text-white hover:bg-red-600 transition-all rounded-sm'>
                    Delete
                </button>
                
            ) :<div className='w-full flex justify-around'> <button onClick={()=>completedTodo(mongoId)} className='px-4 py-2 bg-green-600 text-white hover:bg-green-500 transition-all rounded-sm'>
            Done
        </button>
        <button onClick={()=>deleteTodo(mongoId)} className='px-4 py-2 bg-red-700 text-white hover:bg-red-600 transition-all rounded-sm'>
                    Delete
                </button>
        </div> }
            
                </td>
            </tr>
  )
}

export default Todos