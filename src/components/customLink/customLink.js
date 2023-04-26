import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../userContext'
import '../navbar/nav.css'
function CustomLink({url,second}) {
    const handleSecondLinkClick = async()=>{
        try{   
            const res = await fetch('https://random-blogs-api.onrender.com/user/logout',{
                withCredentials: true,
                credentials: 'include',
            })
            if(res.status === 204) {
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
        const name = localStorage.getItem('username') ? localStorage.getItem('username') : ''
        const id = localStorage.getItem('userid') ? localStorage.getItem('userid') : ''
        const blogs = localStorage.getItem('userblogs') ? localStorage.getItem('userblogs') : ''
        const getUser = {
            name: name,
            id: id,
            blogs: blogs
        }
        setUser(getUser)
    },[])
    return (
        <div>
            <Link className = 'link' to = {(user && user.name !== '') ? '/myBlogs' : url}>
                {(user && user.name !== '') ? user.name : 'Login'}
            </Link>
            <Link  className='secondSlideLink link' onClick = {handleSecondLinkClick}>
                {(user && user.name !== '') ? second : ''}
            </Link>
        </div>
    );
  }
  
  export default CustomLink;