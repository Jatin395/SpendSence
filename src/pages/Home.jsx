import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  
  return (
    <>
    <div className="m-6">
{/* Section 1 */}      
<div className="flex flex-col gap-2 justify-center items-center text-center text-2xl m-4 h-[675px] sm:text-4xl">
        <h3><span className='text-blue-400'>Simple way</span> <br />
          to manage <span className='text-blue-400'>personal finances</span></h3>
        <button className='w-40 h-10 text-xl rounded-md mt-4 bg-blue-400 text-white hover:shadow-lg hover:scale-105'><Link to={'/signup'}>Sign up</Link></button>
      </div>
           
    </div>
    </>
  )
}

export default Home
