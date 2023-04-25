import { useNavigate, useParams } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch.js';
import useToTop from '../Hooks/useToTop.js';
import LoadingScreen from './loadingScreen';


import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import './Blog.css'
import { BlogContext, UserContext } from '../userContext.js';
import Comments from './Comments.js';

function Blogs() {
    const { id } = useParams()
    const { showTopMsg, toTop} = useToTop()
    const { data:blog, isPending} = useFetch(`https://random-blogs-api.onrender.com/blogs/${id}`,false)
    const {user,setUser} = useContext(UserContext)
    const [blogLikes, setBlogLikes] = useState([])
    const [blogCommentsLength, setBlogCommentsLength] = useState(0)
    const navigate = useNavigate();

    const [isBlogLiked,setIsBlogLiked] = useState(false)

    const handleLike = async (isLike)=>{
      try{
        const options = {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}
          const url = isLike ? `https://random-blogs-api.onrender.com/blogs/like/${id}` : `https://random-blogs-api.onrender.com/blogs/dislike/${id}`
          await fetch(url, options)
          const newArray = isBlogLiked ? blogLikes.filter(item=>item !== user.id) : [...blogLikes,user.id]
          setBlogLikes(newArray)
          setIsBlogLiked(prev=>!prev)
      }catch(e){
        navigate('/login')
      }
    }
    useEffect(()=>{
      const name = localStorage.getItem('username')
      const id = localStorage.getItem('userid')
      const blogs = localStorage.getItem('userblogs')

      setUser({
        name:name,
        id:id,
        blogs:blogs
      })

    },[])
    useEffect(()=>{
      if(blog.likes !== undefined){
        setBlogLikes(blog.likes)
        const blogLiked = blog.likes.includes(user.id,0)
        setIsBlogLiked(blogLiked)
      }
      if(blog.comments !== undefined)setBlogCommentsLength(blog.comments.length)
    },[blog])

    return (
      <>
        {isPending && <LoadingScreen loading = {isPending}/>}
        {showTopMsg && <div className='toTopMessageArticle' onClick = {toTop}>
          <svg xmlns="http://www.w3.org/2000/svg" className="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>}
        {blog && <div className='blogDisplayContainer'>
        <h1>{blog.title}</h1>
        <div className = 'mainArticle' dangerouslySetInnerHTML={{__html : blog.text}}></div>
        <h2 className='likeAndCommentButtonWrapper'>
            Blog autorstwa: {blog.author}
            <div className='likeAndCommentButtonContainer'>
              <h3 className='like'>
                {isBlogLiked ? <FavoriteOutlinedIcon sx={{ color: 'var(--main-color)' }} onClick = {()=>{handleLike(false)}}/>  : <FavoriteBorderIcon onClick = {()=>{handleLike(true)}}/>}
                {blogLikes !== undefined ?  blogLikes.length : '0'}
              </h3>
              <h3 className='commentIcon'>
                <ChatBubbleOutlineOutlinedIcon/>
                {blog.comments !== undefined ? blogCommentsLength : '0'}
              </h3>
            </div>
        </h2>
      </div>}
      <Comments comments = {blog.comments} blogID={id} setLength = {setBlogCommentsLength}/>
      </>
    );
  }
  
  export default Blogs;