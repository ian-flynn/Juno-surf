import React, { useState } from 'react';
import logo from '../images/JunoSurfLogo.png';
import Login from './Login.jsx';

const NavBar = ({ user, setUser }) => {
  // const [menuOpen, setMenuOpen] = useState(false);
  //create onclick function that opens google oauth modal
  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };
  const googleLogout = async () => {
    console.log('starting logout');
    const res = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      withCredentials: true,
    });
    console.log('RESPONSE: ', res);
    const data = await res.json();
    console.log('DATA: ', data);

    if (data === 'logged out') {
      setUser(null);
      // window.location.reload(true);
    }
  };

  return (
    <div id='navbar'>
      <img id='logo' src={logo} alt='Juno Surf' />
      {user ? (
        <>
          <p>welcome, {user.username}</p>
          <button onClick={googleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={googleLogin}>
          Google
          <br />
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;
