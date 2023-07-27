import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import SurfData from './SurfData.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  //check if the user is logged in
  const fetchUser = async () => {
    try {
      console.log(process.env.NODE_ENV);
      const response = await fetch('http://localhost:3000/user', {
        credentials: 'include',
      });
      // console.log('here');
      // console.log(response);
      const data = await response.json();
      console.log('data', data);
      if (data) {
        // console.log('user', data);
        // setUser(data);
      } else {
        console.log('no user');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id='wrapper'>
      <div id='app'>
        <NavBar user={user} />
        <SurfData />
        <button onClick={fetchUser}>Fetch User</button>
      </div>
    </div>
  );
};

export default App;
