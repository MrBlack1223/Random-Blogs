import {useState, useEffect} from 'react'

const useFetch = (url,isArray) =>{
  
  const [data,setData] = useState([{}])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(()=>{
      let active = true;
      fetch(url)
      .then(res=>{
          if(!res.ok ){
              throw Error('Cant fetch data')
          }
        return res.json()
      })
      .then((data)=>{
        if(active){
            if(isArray)setData(prev => [...prev,...data])
            else if(!isArray)setData(data)
            setIsPending(false)
            setError(null)
        }
      })
      .catch(error=>{
          setError(error)
          setIsPending(false)
      })
      return () => {
        active = false;
      }
    },[url])
    return {data,isPending,error}
}
export default useFetch