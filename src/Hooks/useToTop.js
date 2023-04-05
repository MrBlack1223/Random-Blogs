import {useState, useEffect} from 'react'

const useToTop = () =>{
        
  const [showTopMsg,setShowTopMsg] = useState(null)
  const toTop = ()=>{
    window.scroll(0,0)
  }
  useEffect(()=>{
    const handleScroll = e =>{
        if(window.scrollY >= 200){
          setShowTopMsg(true)
        }
        else if(window.scrollY < 200){
          setShowTopMsg(null)
        }
      }
      window.addEventListener('scroll',handleScroll)
    },[])
    return {showTopMsg, toTop}
}
export default useToTop