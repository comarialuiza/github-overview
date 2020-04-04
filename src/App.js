import React, { useState, Fragment } from 'react';
import api from './services/api';

import './style.css';

function App() {

  const [ user, setUser ] = useState('');
  const [ userImg, setUserImg ] = useState('');
  const [ userFollowing, setUserFollowing ] = useState('');
  const [ userFollowers, setUserFollowers ] = useState('');
  const [ userBio, setUserBio ] = useState('');
  const [ userHireable, setUserHireable ] = useState('');
  const [ userLink, setUserLink ] = useState('');

  const getUser = async (e) => {
    try {
      e.preventDefault();
      const user = e.target.elements.username.value;

      if (user) {
        const res = await api.get(`${user}`);
        
        const userInfo = res.data;
        console.log(res);
  
        const userName = userInfo.name;
        const userImg = userInfo.avatar_url;
        const userFollowing = userInfo.following_url;
        const userFollowers = userInfo.followers_url;
        const userBio = userInfo.bio;
        const userHireable = userInfo.hireable;
        const userLink = userInfo.html_url;
  
        setUser(userName);
        setUserImg(userImg);
        setUserFollowing(userFollowing);
        setUserFollowers(userFollowers);
        setUserBio(userBio);
        setUserHireable(userHireable);
        setUserLink(userLink);
      } 

      return;
    } catch(err) { 
      console.log(err);
    }
  }
  
  return (
    <div className="mainContainer">
      <div className="content">
        <div className="container formContainer">
          <h1 className="mainTitle">Github Overview</h1>

          <form onSubmit={ getUser } className="getUserInfo">
            <input 
              placeholder="Github username"
              name="username"
            />
            <button type="submit">Send</button>
          </form>
        </div>

        <div className="container overViewContainer">
          { user 
            ? 
              <div className="userInfoBlock">
                <div className="userInfoVisual">
                  <img src={ userImg } alt={ user } className="userInfoImg"/>
                </div>

                <div className="userInfoDesc">
                  <p className="userInfoName">{ user }</p>
                  <p className="userInfoBio">{ userBio }</p>

                  <a href={ userLink } className="userInfoLink">Contact</a>
                </div>
              </div>
            : 
              <Fragment />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
