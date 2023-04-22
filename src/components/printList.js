import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
function PrintList({data,isSearchingPage, handleClose}) {
     const  handleDeleteClick = async (item)=>{
      try{
        const options = {
          method: 'DELETE',
          withCredentials: true,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const res = fetch(`https://random-blogs-api.onrender.com/blogs/delete/${item}`,options)
      }catch(e){

      }
    }
    return (
    <div className={isSearchingPage ? "searchBlogWrapper" : "blogWrapper"}>
        {data.map((item,index)=>{
          return <div className={isSearchingPage ? "searchBlogAndEditWrapper" : "blogAndEditWrapper"}>
                <Link to = {`/blogs/${item._id}`} key={item._id || index} onClick={handleClose} className={isSearchingPage ? "searchBlogLink" : "blogLink"}>
                    <div className={isSearchingPage ? "searchBlog" : "blog"}>  
                      <h2> {item.title}</h2>
                      <p>By: {item.author}</p>
                    </div>
                </Link>
                <div className="likesContainer">
                    <FavoriteBorderIcon/>
                    <div>{item.likes !== undefined ?  item.likes.length : '133'}</div>
                </div>
                <div className="commentsContainer">
                    <ChatBubbleOutlineOutlinedIcon/>
                    <div>{item.comments !== undefined ?  item.comments.length : '777'}</div>
                </div>
                {item.author === localStorage.getItem('username') ?
                  <div className = {isSearchingPage ? "searchEditIconsContainer" : "editIconsContainer"}>
                    <Link className='editIcon' to = {`/editBlog/${item._id}`}> <EditIcon /> </Link>
                    <DeleteIcon className='deleteIcon' onClick = {()=>{handleDeleteClick(item._id)}}/>
                  </div> :
                ''}
                </div>
        })}
    </div>
    );
  }
  
  export default PrintList;