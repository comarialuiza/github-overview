import React, { useState } from 'react';
import api from './services/api';

import './style.css';

function App() {
  const [ user, setUser ] = useState(''); 

  async function getUserInfo(e) {
    e.preventDefault();

    try {
      const res = await api.get(`${user}`);
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <h1 className="mainTitle">Github Overview</h1>

        <form onSubmit={ getUserInfo } className="getUserInfo">
          <input 
            placeholder="Github username"
            value={ user }
            onChange={ e => setUser(e.target.value) }
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
