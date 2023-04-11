import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
function NewBlog( {blogs} ) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
      e.preventDefault()
      console.log()
      const newBlog = { title : title,
                        author : localStorage.getItem('username'),
                        text : DOMPurify.sanitize(text)}

        const res = await fetch('https://random-blogs-api.onrender.com/blogs',{
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

    return (
      <div className="formContainer">
            <h1>Dodaj Bloga!</h1>
            <form className="newBlogForm">
                <input type = 'text' placeholder= 'Tytuł' className="blogInput" value={title} onChange = { e=> setTitle(e.target.value) } required></input>
                <div className="blogText">
                  <ReactQuill theme="snow" className='text' value={text} onChange = {setText} />
                </div>
                <button className="newBlogSubmitButton" onClick = { e => handleSubmit(e) }>Dodaj bloga!</button>
            </form>
      </div>
    );}
  
  
  export default NewBlog;