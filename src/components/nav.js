import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SearchScreen from '../pages/searchScreen.js';
import { UserContext } from '../userContext.js';
import CustomLink from './customLink.js';

import './nav.css'
function Nav() {
    const [showSearching,setShowSearching] = useState(false)
    const {user,setUser} = useContext(UserContext)

    const checkTheme = ()=>{
      let theme = localStorage.getItem('theme') || 'light'
      if(theme === 'dark'){
        document.querySelector('body').classList.add('dark')
      }else if(theme === 'light'){
        document.querySelector('body').classList.remove('dark')
      }
    }
    const changeTheme = ()=>{
      let theme = localStorage.getItem('theme') || 'light'
      if(theme === 'dark'){
        document.querySelector('body').classList.remove('dark')
        localStorage.setItem('theme','light')
      }else if(theme === 'light'){
        document.querySelector('body').classList.add('dark')
        localStorage.setItem('theme','dark')
      }
    }
    const handleSearchClick = ()=>{
      setShowSearching(prev=> !prev)
      document.querySelector('body').style.overflow = "hidden"
    }
    useEffect(()=>{
      checkTheme()
    },[])

    return (
      <div className="navbar">
        <h1>Random Blogs</h1>
        <div className='links'>
          <Link to={user ? '/newBlog' : '/login'}>New blog</Link>
          <Link to='/'>Home</Link>
          <CustomLink url = '/login' second = 'Logout'/>
        </div>
        <SearchIcon className='searchIconNavbar' fontSize='large' onClick={handleSearchClick}/>
        <button className='themeButtonContainer' onClick={changeTheme}><div className='themeSwitch'></div></button>
        {showSearching && <SearchScreen setShowSearch={setShowSearching}/>}
      </div>
    );
  }
  export default Nav;