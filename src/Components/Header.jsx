import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user,logout }) {
  const navigate = useNavigate();
  const [logoutbtn, setLogoutbtn] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      setLogoutbtn(true);
      navigate('/dashboard');  
    } else {
      setLogoutbtn(false);
    }
  }, [user, navigate]);  

  return (
    <div className="bg-blue-400 p-4 h-14 flex justify-between font-medium text-center items-center">
      <h2 className='text-2xl text-white'><Link to={'/'}>SpendSense</Link></h2>
      {!logoutbtn ? (
        <button>
          <Link to={'/login'} className='text-white text-lg hover:bg-white hover:text-blue-400 rounded-sm p-2'>Login</Link>
        </button>
      ) : (
        <button className='text-white text-lg hover:bg-white hover:text-blue-400 rounded-sm p-2' onClick={logout}>Logout</button>
      )}
    </div>
  );
}

export default Header;
