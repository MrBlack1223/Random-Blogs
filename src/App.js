import React, { createContext, useState } from 'react';
import { Route, Routes} from 'react-router-dom'

import './App.css';
import Home from './pages/home.js'
import Nav from'./components/nav.js'
import NewBlog from './pages/NewBlog.js'
import Blogs from './pages/Blogs.js'
import LoginScreen from './pages/loginPage.js';
import { UserContext } from './userContext.js';
import MyBlogs from './pages/myBlogs';


function App() {
  
  const [user,setUser] = useState(null)

  return (
    <div className="App">
      <UserContext.Provider value = {{user,setUser}}>
        <Nav/>
        <div className='home'>
          <Routes>
              <Route path='/' element= {<Home/>}/>
              <Route path='/newBlog' element = {<NewBlog/>} />
              <Route path='/blogs/:id' element = {<Blogs/>} />
              <Route path='/login' element = {<LoginScreen/>} />
              <Route path='/myBlogs' element = {<MyBlogs/>} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
