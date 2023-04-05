import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import CloseIcon from '@mui/icons-material/Close';
import useFetch from './Hooks/useFetch.js';
import PrintList from './printList.js';

function SearchScreen({setShowSearch}) {
    const [query,setQuery] = useState('')
    const {data , isPending, error} = useFetch(`https://random-blogs-api.onrender.com/blogs/search/byQuery?q=${query}`,false)
    const handleClose = ()=>{
        setShowSearch(false)
        document.querySelector('body').style.overflow = "scroll"
    }
    const handleInputChange = (e)=>{
        setQuery(e.target.value)
    }   
    return (
      <>
        <div className='searchingScreenContainer'>
            <div className='opacityMaker'></div>
            <div className='search'>
                <div className='searchNav'>
                    <input className='searchBar' value={query} onChange={handleInputChange}></input>
                    <CloseIcon className='closeSearchSite' onClick = {handleClose} fontSize='large'/>
                </div>
                <div className='searchResult'>
                    {isPending &&<div className='searchLoaderContainer'><ClipLoader 
                        loading={isPending}
                        color = '#f1356d'
                        size= '60px'
                        className= 'loaderSearch'
                    /></div>}
                    {error && "Sorry error"}
                    {data && <PrintList data = {data.filter( item=>item._id !== undefined) } isSearchingPage={true} handleClose ={handleClose}/>}
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default SearchScreen;