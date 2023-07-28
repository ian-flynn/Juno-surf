import React, { useState } from 'react';
import logo from '../images/JunoSurfLogo.png';
import Login from './Login.jsx';

const NavBar = ({ user, setUser }) => {
  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };
  const googleLogout = async () => {
    const res = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (data === 'logged out') {
      window.location.reload(true);
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
