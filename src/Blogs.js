import { useParams } from 'react-router-dom'
import React from 'react';
import useFetch from './Hooks/useFetch';
import useToTop from './Hooks/useToTop';

function Blogs() {
    const { id } = useParams()

    const { showTopMsg, toTop} = useToTop()
    const { data:blog, isPending} = useFetch(`http://localhost:8888/blogs/${id}`)
    
    return (
      <>
        {isPending && <div className='loadingMessage'>Loading data</div>}
        {showTopMsg && <div className='toTopMessageArticle' onClick = {toTop}>
          <svg xmlns="http://www.w3.org/2000/svg" className="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>}
        {blog && <div className='blogDisplayContainer'>
        <h1>{blog.title}</h1>
        <p>{blog.text}</p>
        <h2>Blog autorstwa: {blog.author}</h2>
      </div>}
      
      </>
    );
  }
  
  export default Blogs;