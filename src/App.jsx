import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { toast, ToastContainer } from 'react-toastify'
import { Auth } from './pages/Firebase'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Footer from './pages/Footer'

function App() {
  const [user, setuser] = useState();
  useEffect(() => {
    Auth.beforeAuthStateChanged((user) => {
      setuser(user);
    })
  }, []);
  const logout = ()=>{
   Auth.signOut()
   .then(()=>{
    toast.success("Logout Succesfully !");
   });
  }
  return (
    <>
      <Router>
        <Header user={user} logout={logout} />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard user={user} />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
