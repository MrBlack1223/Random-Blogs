
import AddIcon from '@mui/icons-material/Add';
import EmojiPicker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import './Comments.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
function Comments({comments,blogID,setLength}){
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [commentText,setCommentText] = useState('')
    const [blogComments,setBlogComments] = useState([{}])
    const {user,setUser} = useContext(UserContext)
    const handleEmojiClick = (emoji)=>{
        const newText = commentText.concat(emoji.emoji)
        setCommentText(prev => newText)
    }
    const handleAddClick = async(e)=>{
        e.preventDefault()
        try{
            const comment = 
            {
                text: commentText
            }
            console.log('click1')
            await fetch(`https://random-blogs-api.onrender.com/blogs/comments/add/${blogID}`,{
                method: 'POST',
                withCredentials: true,
                credentials: 'include',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comment)
            })
            console.log('click2')
            setBlogComments(prev=>[{
                _id: 0,
                author: user.name,
                text: commentText
            },...prev
            ])
            setLength(prev => prev+1)
            setCommentText('')
        }catch(e){
            console.log(e)
            console.log('click2')
        }
        
    }
    useEffect(()=>{
        if(comments !== undefined){
            const reversedArray = comments.reverse()
            setBlogComments(reversedArray)
        }
        
    },[comments])
    return(
        <div className="commentsWrapper">
            <h3 className='commentSectionHeader'>Comments section</h3>
            <form onSubmit = {(e)=>{handleAddClick(e)}} className='addCommentWrapper'>
                <textarea className="addCommentInput" placeholder="Add comment" value = {commentText} onChange={(e)=>{setCommentText(e.target.value)}}></textarea>
                <div className='emojiPickerContainer'>
                    <InsertEmoticonIcon onClick = {()=>{setShowEmojiPicker(prev => !prev)}}/>
                    <div className='emojiPickerWrapper'>   {showEmojiPicker && <EmojiPicker 
                                            lazyLoadEmojis = {true}
                                            width = '100%'
                                            height = '500px'
                                            theme= {localStorage.getItem('theme') === 'dark' ? 'dark':'light'}
                                            onEmojiClick = {(emoji)=>{handleEmojiClick(emoji)}}
                                         />}
                    </div>
                </div>
                <button className="addCommentButton" type='submit'><AddIcon sx = {{fontSize : "45px"}}/></button>
            </form>
            <div className='displayCommentsWrapper'>
                {blogComments && blogComments.map((com)=>{
                    return<div className='comment' key = {com._id}>
                    <h4 className='commentAuthor'>{com.author}</h4>
                    <span className='commentText'>{com.text}</span>
                </div>
                })}
            </div>
        </div>
    )
}

export default Comments