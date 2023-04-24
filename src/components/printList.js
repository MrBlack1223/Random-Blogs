import {Link, useNavigate} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Message from './message';
import { useEffect, useState } from 'react';

function PrintList({data,isSearchingPage, handleClose}) {
     const navigate = useNavigate()
     const [blogs,setBlogs] = useState(data)
     const [showMsg,setShowMsg] = useState(false)
     const [deleteBlogID,setDeleteBlogID] = useState('')
     const  handleDeleteClick = async (item)=>{
      setShowMsg(true)
      setDeleteBlogID(item)
      document.body.style.overflow = 'hidden'
    }
    const handleDeleteBlog = async(item)=>{
      document.body.style.overflowY = 'scroll'
      try{
        const options = {
          method: 'DELETE',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const res = fetch(`https://random-blogs-api.onrender.com/blogs/delete/${item}`,options)
        const newArray = blogs.filter(blog => blog._id.toString() !== item )
        setBlogs(newArray)
        setShowMsg(false)
        
      }catch(e){
        console.log("Nie mozna usunąć bloga!")
      }
    }
    useEffect(()=>{
      setBlogs(data)
    },[data])
    return (
    <div className={isSearchingPage ? "searchBlogWrapper" : "blogWrapper"}>
        {blogs.map((item,index)=>{
          return <div className={isSearchingPage ? "searchBlogAndEditWrapper" : "blogAndEditWrapper"}>
                <Link to = {`/blogs/${item._id}`} key={item._id || index} onClick={handleClose} className={isSearchingPage ? "searchBlogLink" : "blogLink"}>
                    <div className={isSearchingPage ? "searchBlog" : "blog"}>  
                      <h2> {item.title}</h2>
                      <p>By: {item.author}</p>
                    </div>
                </Link>
                <div className="likesContainer">
                    <FavoriteBorderIcon/>
                    <div>{item.likes !== undefined ?  item.likes.length : '0'}</div>
                </div>
                <div className="commentsContainer">
                    <ChatBubbleOutlineOutlinedIcon/>
                    <div>{item.comments !== undefined ?  item.comments.length : '0'}</div>
                </div>
                {item.author === localStorage.getItem('username') ?
                  <div className = {isSearchingPage ? "searchEditIconsContainer" : "editIconsContainer"}>
                    <Link className='editIcon' to = {`/editBlog/${item._id}`}> <EditIcon /> </Link>
                    <DeleteIcon className='deleteIcon' onClick = {()=>{handleDeleteClick(item._id)}}/>
                  </div> :
                ''}
                
                </div>
        })}
    {showMsg && <Message
                  showMsg={showMsg} 
                  handleYes={()=>{handleDeleteBlog(deleteBlogID)}}
                  handleClose = {()=>{setShowMsg(false); document.body.style.overflowY = 'scroll'}}
                  msg = 'Are you sure ?'
                />
    }
    </div>
    );
  }
  
  export default PrintList;