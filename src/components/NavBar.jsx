import React from 'react';
import logo from '../images/JunoSurfLogo.png';

const NavBar = ({ user }) => {
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
      <div id='logo-container'>
        <img src={logo} alt='Juno Surf' />
      </div>
      {user ? (
        <button id='login-logout' className='logout' onClick={googleLogout}>
          Logout
        </button>
      ) : (
        <button id='login-logout' onClick={googleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default NavBar;
