import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../userContext'
import './nav.css'
function CustomLink({url,second}) {
    const handleSecondLinkClick = async()=>{
        try{   
            const res = await fetch('https://random-blogs-api.onrender.com/user/logout',{
                withCredentials: true,
                credentials: 'include',
            })
            if(res.status === 200) {
                localStorage.removeItem('username')
                localStorage.removeItem('userid')
                localStorage.removeItem('userblogs')
                setUser(null)
            }
        }catch(e){
            console.log(e)
        }
    }
    const {user,setUser} = useContext(UserContext)

    useEffect(()=>{
        const getUser = {
            name: localStorage.getItem('username'),
            id: localStorage.getItem('userid'),
            blogs: localStorage.getItem('userblogs')
        }
        setUser(getUser)
    },[])
    return (
        <div>
            <Link className = 'link' to = {user ? '/myBlogs' : url}>
                {user ? user.name : 'Login'}
            </Link>
            <Link  className='secondSlideLink link' onClick = {handleSecondLinkClick}>
                {user ? second : ''}
            </Link>
        </div>
    );
  }
  
  export default CustomLink;