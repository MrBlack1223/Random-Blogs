import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function NewBlog( {blogs} ) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault()

      const newBlog = {title : title,
                        author : author,
                        text : text}

        fetch('http://localhost:8888/blogs',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBlog)
        })
        .catch(error => {
          console.log(error)
        })

        setTitle('')
        setAuthor('')
        setText('')
        navigate('/');
    }

    return (
      <div className="formContainer">
            <h1>Dodaj Bloga!</h1>
            <form className="newBlogForm">
                <input type = 'text' placeholder= 'Tytuł' className="blogInput" value={title} onChange = { e=> setTitle(e.target.value) } required></input>
                <input type = 'text' placeholder= 'Autor' className="blogInput" value={author} onChange = { e=> setAuthor(e.target.value) } required></input>
                <textarea className="blogText" value={text} onChange = { e => setText(e.target.value) } required></textarea>
                <button className="newBlogSubmitButton" onClick = { e => handleSubmit(e) }>Dodaj bloga!</button>
            </form>
      </div>
    );}
  
  
  export default NewBlog;