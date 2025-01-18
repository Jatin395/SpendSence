import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from './Firebase';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    if(form.email && form.password){
      signInWithEmailAndPassword(Auth,form.email,form.password)
      .then((user)=>{
        console.log(user);
        toast.success("Logend In Succesfully");
        navigate('/dashboard');
      })
      .catch((error)=>{
       toast.error("Something went wrong Try again !");
      })

    }else{
      toast.error("Please Fill All Inputs Feilds !");
    }
  }
  const handleclick = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="flex h-[90vh] w-full flex-wrap justify-center items-center text-start">
        <div className="flex gap-4 flex-col justify-evenly p-4 w-[350px] m-4 sm:m-1 sm:w-[500px] sm:h-[450px] shadow-lg rounded-md">
          <form onSubmit={handlesubmit}>
            <div className="w-full text-center">
              <h2 className='text-xl font-semibold'>Log in SpendSence</h2>
            </div>            
            <div className=" w-full justify-evenly m-4 flex gap-4 sm:text-xl">
              <label>Email :</label>
              <input type='email' className='border border-black' name='email' onChange={handleclick}></input>
            </div>
            <div className="m-4 mt-6 w-full justify-evenly flex gap-4 sm:text-xl">
              <label>Password :</label>
              <input type='password' name='password' className='border border-black' onChange={handleclick}></input>
            </div>            
            <div className="w-full text-center m-4">
              <button type='submit' className='text-xl bg-blue-400 text-white rounded-md p-2 hover:bg-blue-600'>Log in</button>
            </div>
            <div className="w-full text-center">
              <h2>Don't have Account : <span className='text-teal-950'><Link to={'/signup'}>Sign Up</Link></span></h2>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Login
