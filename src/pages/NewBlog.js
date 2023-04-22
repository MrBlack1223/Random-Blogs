import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import './NewBlog.css'
import useFetch from '../Hooks/useFetch';
function NewBlog( {editMode} ) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()
    const idURl = editMode ? `https://random-blogs-api.onrender.com/blogs/${id}` : ''
    const { data, isPending} = useFetch(idURl,false)

    const handleSubmit = async(e) => {
      e.preventDefault()
      const newBlog = { title : title,
                        author : localStorage.getItem('username'),
                        text : DOMPurify.sanitize(text)}
        const url = editMode ? `https://random-blogs-api.onrender.com/blogs/update/${id}` : 'https://random-blogs-api.onrender.com/blogs'
        
        const res = await fetch(url,{
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBlog)
        })
        .catch(error => {
          console.log(error)
        })

        if(res.status === 200){
          setTitle('')
          setAuthor('')
          setText('')
          navigate('/')
        }
        else if(res.status === 500){
          navigate('/login')
        }
        
    }
  useEffect(()=>{
      if(editMode && typeof(data.text) === 'string'){
        setText(data.text)
        setTitle(data.title)
      }
      
  },[data])

    return (
      <div className="formContainer">
            <h1>{editMode ? "Edytuj Bloga" : "Dodaj Bloga!"}</h1>
            <form className="newBlogForm">
                <input type = 'text' placeholder= 'Tytuł' className="blogInput" value={title} onChange = { e=> setTitle(e.target.value) } required></input>
                <div className="blogText">
                  <ReactQuill theme="snow" className='text' value={text} onChange = {setText} />
                </div>
                <button className="newBlogSubmitButton" onClick = { e => handleSubmit(e) }>{editMode ? "Edytuj Bloga" : "Dodaj Bloga!" }</button>
            </form>
      </div>
    );}
  
  
  export default NewBlog;