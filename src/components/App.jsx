import React, { useEffect, useState } from 'react';
import NavBar from './NavBar.jsx';
import SurfData from './SurfData.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const url =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'temp address for junosurf,com or whatever';
        const response = await fetch(`${url}/user`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.user) {
          const username = data.user.username;
          const beach = data.user.beachCode ? data.user.beachCode : null;
          setUser({ username, beach });
        } else setUser(null);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div id='wrapper'>
      <div id='app'>
        <NavBar user={user} setUser={setUser} />
        <SurfData />
      </div>
    </div>
  );
};

export default App;
