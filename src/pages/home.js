import React, { useState } from 'react';
import PrintList from '../components/printList.js'
import useFetch from '../Hooks/useFetch.js';
import useToTop from '../Hooks/useToTop.js';
import { useEffect } from 'react';
import ErrorScreen from './errorScreen.js';
import LoadingScreen from './loadingScreen.js';
import './home.css'

function Home() {
  
  const [page,setPage] = useState(0)
  const { showTopMsg, toTop} = useToTop()
  const { data:blogs,isPending,  error} = useFetch(`https://random-blogs-api.onrender.com/blogs?skip=${page}`,true)
  const handleScroll = ()=>{
    if(window.innerHeight + document.documentElement.scrollTop +1 === document.documentElement.scrollHeight){
        setPage((prev)=>prev + 6)
      }
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
    return () => window.removeEventListener('scroll',handleScroll)
  },[])
 
  return (
    <div >
      {showTopMsg && <div className='toTopMessage' onClick = {toTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>}
      {error && <ErrorScreen/>}
      {isPending && <LoadingScreen loading = {isPending} isSearchingPage={false} handleClose = {()=>{}}/>}
      {blogs  && <PrintList data = {blogs.slice(1)}/>}
    </div>
  );
  }
  
  export default Home;
  