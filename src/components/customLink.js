import {Link} from 'react-router-dom'
import './customLink.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../userContext'
function CustomLink({url,second}) {
    const handleSecondLinkClick = async()=>{
        try{   
            const res = await fetch('http://localhost:8888/user/logout',{
                withCredentials: true,
                credentials: 'include',
            })
            if(res.status === 200) {
                localStorage.removeItem('username')
                setUser(null)
            }
        }catch(e){
            console.log(e)
        }
    }
    const {user,setUser} = useContext(UserContext)

    useEffect(()=>{
        setUser(localStorage.getItem('username'))
    },[])
    return (
        <div>
            <Link to = {user ? '/myBlogs' : url}>
                {user ? user : 'Login'}
            </Link>
            <Link className='secondSlideLink' onClick = {handleSecondLinkClick}>
                {user ? second : ''}
            </Link>
        </div>
    );
  }
  
  export default CustomLink;