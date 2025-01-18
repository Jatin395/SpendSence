import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { Auth, MyDB } from './Firebase';
import { collection, doc, addDoc, setDoc } from "firebase/firestore";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    if (form.email && form.confirmpassword && form.name && form.password) {
      if (form.password !== form.confirmpassword) {
        toast.error("Please Check the error !");
      } else {
        createUserWithEmailAndPassword(Auth, form.email, form.password)
          .then((Credentials) => {
            adduser(Credentials.user);
            updateProfile(Credentials.user, {
              displayName: form.name
            }
            )
              .then(() => {
                toast.success("Acount Creted Succesfully !");
                navigate('/dashboard');
              })
          })
      }

    } else {
      toast.error("Fill All Input Feilds");
    }
  }
  const handleclick = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const adduser = (user) => {
    setDoc(doc(MyDB, "users", user.uid), {
      email: user?.email,
      id: user.uid,
      createAt: new Date()
    }).then(() => {
      toast.success("User Added Succesfully !");
    })
  }
  return (
    <>
      <div className="flex h-[90vh] sm:w-full flex-wrap justify-center items-center text-start">
        <div className="flex gap-4 flex-col justify-evenly p-4 w-[350px] sm:m-4 m-1 sm:w-[500px] sm:h-[450px] shadow-lg rounded-md">

          <form onSubmit={handlesubmit}>

            <div className="sm:w-full text-center">
              <h2 className='sm:text-xl font-semibold'>Sign Up in SpendSence</h2>
            </div>

            <div className="m-4 flex sm:w-full justify-evenly gap-4 sm:text-xl">
              <label>Full Name :</label>
              <input type='text' name='name' className='rounded-sm border border-black sm:p-1' onChange={handleclick}></input>
            </div>

            <div className="sm:w-full justify-evenly m-4 flex gap-4 sm:text-xl">
              <label>Email :</label>
              <input type='email' className='rounded-sm border border-black sm:p-1 sm:ml-8' name='email' onChange={handleclick}></input>
            </div>

            <div className="m-4 mt-6 sm:w-full justify-evenly flex gap-4 sm:text-xl">
              <label>Password :</label>
              <input type='password' name='password' className='rounded-sm border border-black p-1' onChange={handleclick}></input>
            </div>

            <div className="m-4 sm:w-full justify-evenly flex gap-4 sm:text-xl">
              <label>Confirm Password :</label>
              <input type='password' name='confirmpassword' className='mr-8 rounded-sm border border-black p-1' onChange={handleclick}></input>
            </div>

            <div className="sm:w-full text-center m-4">
              <button type='submit' className='text-xl bg-blue-400 text-white rounded-md p-2 hover:bg-blue-600'>Sign up</button>
            </div>

            <div className="sm:w-full text-center">
              <h2>Already Have Account : <span className='text-teal-950'><Link to={'/login'}>Login</Link></span></h2>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup
