import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import SurfData from './SurfData.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  //check if the user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      console.log('fetching user');
      try {
        const response = await fetch('http://localhost:3000/auth/user');
        console.log('here');
        // console.log(response);
        const data = await response.json();
        console.log('data', data);
        if (data) {
          console.log('user', `${data}`);
          // setUser(data);
        } else {
          console.log('no user');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div id='wrapper'>
      <div id='app'>
        <NavBar user={user} />
        <SurfData />
      </div>
    </div>
  );
};

export default App;
