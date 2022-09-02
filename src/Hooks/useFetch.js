import {useState, useEffect} from 'react'

const useFetch = (url) =>{
  const [data,setData] = useState([{}])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{
      fetch(url)
      .then(res=>{
          if(!res.ok){
              throw Error('Cant fetch data')
          }
        return res.json()
      })
      .then((data)=>{
        setData(data)
        setIsPending(false)
        setError(null)
      })
      .catch(error=>{
          setError(error)
          setIsPending(false)
      })
    },[url])
    return {data,isPending,error}
}
export default useFetch