import { Link } from 'react-router-dom'
import { useEffect } from 'react'
function Nav() {

    const checkTheme = ()=>{
      let theme = localStorage.getItem('theme') || 'light'

      if(theme == 'dark'){
        document.querySelector('body').classList.remove('dark')
        localStorage.setItem('theme','light')
      }else if(theme == 'light'){
        document.querySelector('body').classList.add('dark')
        localStorage.setItem('theme','dark')
      }
      
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
        <button className='themeButtonContainer' onClick = {checkTheme}><div className='themeSwitch'></div></button>
      </div>
    );
  }
  export default Nav;