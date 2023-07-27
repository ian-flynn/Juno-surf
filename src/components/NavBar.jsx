import React, { useState } from 'react';
import logo from '../images/JunoSurfLogo.png';
import Login from './Login.jsx';

const NavBar = ({ user }) => {
  // const [menuOpen, setMenuOpen] = useState(false);
  //create onclick function that opens google oauth modal
  const googleLogin = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  return (
    <div id='navbar'>
      <img id='logo' src={logo} alt='Juno Surf' />
      {user ? (
        <>
          {/* <p>{user}</p> */}
          <button>Logout</button>
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
