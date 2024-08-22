import React from 'react'

const Navbar = () => {
  return (
    <div className=' mx-auto flex py-3 justify-around flex-wrap text-white'>
        <h1 className='text-lg font-semibold'>Todo App</h1>
        <ul className='flex gap-[40px] text-m'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Products</li>
        </ul>

    </div>
  )
}

export default Navbar