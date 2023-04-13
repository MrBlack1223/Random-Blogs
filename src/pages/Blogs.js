import { useParams } from 'react-router-dom'
import React from 'react';
import useFetch from '../Hooks/useFetch.js';
import useToTop from '../Hooks/useToTop.js';
import LoadingScreen from './loadingScreen';
import './Blog.css'
function Blogs() {
    const { id } = useParams()
    const { showTopMsg, toTop} = useToTop()
    const { data:blog, isPending} = useFetch(`https://random-blogs-api.onrender.com/blogs/${id}`,false)
    
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
        <div dangerouslySetInnerHTML={{__html : blog.text}}></div>
        <h2>Blog autorstwa: {blog.author}</h2>
      </div>}
      
      </>
    );
  }
  
  export default Blogs;