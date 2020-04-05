import React, { useState, Fragment } from 'react';
import api from './services/api';
import { FiArchive, FiUsers, FiSun, FiMoon, FiGithub, FiAlertCircle } from 'react-icons/fi';

import './style.css';

function App() {
  const [ user, setUser ] = useState('');
  const [ userImg, setUserImg ] = useState('');
  const [ userFollowers, setUserFollowers ] = useState('');
  const [ userRepos, setUserRepos ] = useState('');
  const [ userBio, setUserBio ] = useState('');
  const [ userHireable, setUserHireable ] = useState('');
  const [ userLink, setUserLink ] = useState('');

  const [ loader, setLoader ] = useState(false);

  const localTheme = useState(localStorage.getItem('@githubOverview/theme'));

  const [ theme, setTheme ] = (localTheme ||'light');

  const [ error, setError ] = useState(false);

  const getUser = async (e) => {
    try {
      e.preventDefault();
      setError(false)
      
      const user = e.target.elements.username.value;
      
      if (user) {
        setLoader(true);

        const res = await api.get(`${user}`);
        
        const userInfo = res.data;
        
        const userName = userInfo.name;
        const userImg = userInfo.avatar_url;
        const userFollowers = userInfo.followers;
        const userRepos = userInfo.public_repos;
        const userBio = userInfo.bio;
        const userHireable = userInfo.hireable;
        const userLink = userInfo.html_url;
        
        setUser(userName);
        setUserImg(userImg);
        setUserFollowers(userFollowers);
        setUserRepos(userRepos);
        setUserBio(userBio);
        setUserHireable(userHireable);
        setUserLink(userLink);
      
        setLoader(false);
      } 

      return;
    } catch(err) { 
      console.log(err);

      setLoader(false);
      setError(true);
    }
  }

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
      localStorage.setItem('@githubOverview/theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('@githubOverview/theme', 'light');
    }
  }
  
  return (
    <div className="mainContainer" id={ theme }>
      <div className="content">
        <div className="container formContainer">
          <h1 className="mainTitle"><FiGithub />Github Overview</h1>

          <button className="toggleMode" onClick={ toggleTheme }>
            { theme === 'light'
              ? <FiMoon />
              : <FiSun />
            }
          </button>

          <form onSubmit={ getUser } className="getUserInfo">
            <input 
              placeholder="Github username"
              name="username"
            />
            <button type="submit">Send</button>
          </form>
        </div>

        <div className="container overViewContainer">
          {
            loader 
            ? 
              <div className="loader-container">
                <div className="loader">Loading...</div>
              </div> 
            : <Fragment />
          }

          { error 
            ? 
              <div className="error">
                <p className="errorText"><FiAlertCircle /> No user with this username! Please try again!</p>
              </div>
            : <Fragment />
          }

          { user && !error
            ? 
              <div className="userInfoBlock">
                <div className="userInfoVisual">
                  <img src={ userImg } alt={ user } className="userInfoImg"/>
                </div>

                <div className="userInfoDesc">
                  <p className="userInfoName">{ user }</p>
                  <p className="userInfoBio">{ userBio }</p>
                  <p className="userInfoRepos userInfoDefault"><FiArchive size={ 13 } color="#ee505e" /> <span className="userTitleDefaultTitle">Repositories:</span> { userRepos }</p>
                  <p className="userInfoFollowers userInfoDefault"><FiUsers size={ 13 } color="#ee505e" /> <span className="userTitleDefaultTitle">Followers:</span> { userFollowers }</p>

                  <div className="userInfoLinks">
                    <a href={ userLink } className="userInfoLink">Contact</a>
                    { userHireable ? <a href={ userLink } className="userInfoHirable">Hire me!</a> : <Fragment /> }
                  </div>
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
