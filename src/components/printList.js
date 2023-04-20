import {Link} from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

function PrintList({data,isSearchingPage, handleClose}) {
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
                {item.author === localStorage.getItem('username') ?
                  <Link className = {isSearchingPage ? "searchEditIcon" : "editIcon"} to = {`/editBlog/${item._id}`}> <EditIcon /> </Link>
                  :
                ''}
                </div>
        })}
    </div>
    );
  }
  
  export default PrintList;