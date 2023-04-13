import React, { useEffect, useState } from "react";

import useFetch from "../Hooks/useFetch.js";
import PrintList from "../components/printList.js";
import LoadingScreen from "./loadingScreen.js";
import ErrorScreen from "./errorScreen.js";

const MyBlogs = ()=>{
    const [page,setPage] = useState(0)
    const options = {
    withCredentials: true,
    credentials: 'include'
    }
    const {data, isPending, error} = useFetch(`https://random-blogs-api.onrender.com/user/myblogs?skip=${page}`, true, options)
    const handleScroll = ()=>{
        if(window.innerHeight + document.documentElement.scrollTop + 1 === document.documentElement.scrollHeight){
            setPage((prev)=>prev + 6)
          }
      }
      useEffect(()=>{
        window.addEventListener('scroll',handleScroll)
        return () => window.removeEventListener('scroll',handleScroll)
      },[])

    return(
        <div className="myBlogsContainer">
            <PrintList data = {data.slice(1)} isSearchingPage = {false} />
            {error && <ErrorScreen/>}
            {isPending && <LoadingScreen loading = {isPending} isSearchingPage={false} handleClose = {()=>{}}/>}
        </div>
    );
}
export default MyBlogs