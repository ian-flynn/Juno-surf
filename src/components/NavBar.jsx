import React, { useState } from 'react';
import logo from '../images/JunoSurfLogo.png';
import Login from './Login.jsx';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  //create onclick function that opens google oauth modal
  const googleLogin = () => {
    console.log('google login');
    window.open('http://localhost:3000/auth/google', '_self');
  };

  return (
    <div id='navbar'>
      <img id='logo' src={logo} alt='Juno Surf' />
      {/* <button onClick={() => setMenuOpen(!menuOpen)}>Login</button> */}
      <button onClick={googleLogin}>Login</button>
      <Login menuOpen={menuOpen} />
    </div>
  );
};

export default NavBar;
