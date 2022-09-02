import React from 'react';
import PrintList from './printList'
import useFetch from './Hooks/useFetch';
import useToTop from './Hooks/useToTop';


function Home() {
  

  const { showTopMsg, toTop} = useToTop()
  const { data:blogs, isPending, error} = useFetch('http://localhost:8888/blogs')

    return (
      <div >
        {showTopMsg && <div className='toTopMessage' onClick = {toTop}>
          <svg xmlns="http://www.w3.org/2000/svg" className="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>}
        {error && <div>{error}</div>}
        {isPending && <div className='loadingMessage'>Loading data...</div>}
        {blogs && <PrintList data = {blogs} />}
      </div>
    );
  }
  
  export default Home;
  