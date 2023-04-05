import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LoadingScreen from './loadingScreen';
import SearchScreen from './searchScreen';
function Nav() {
    const [showSearching,setShowSearching] = useState(false)

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
          <Link to='/newBlog'>New blog</Link>
          <Link to='/'>Home</Link>
        </div>
        <SearchIcon className='searchIconNavbar' fontSize='large' onClick={handleSearchClick}/>
        <button className='themeButtonContainer' onClick={changeTheme}><div className='themeSwitch'></div></button>
        {showSearching && <SearchScreen setShowSearch={setShowSearching}/>}
      </div>
    );
  }
  export default Nav;