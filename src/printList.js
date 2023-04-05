import {Link} from 'react-router-dom'

function PrintList({data,isSearchingPage, handleClose}) {
    return (
    <div className={isSearchingPage ? "searchBlogWrapper" : "blogWrapper"}>
        {data.map((item,index)=>{
          return <Link to = {`/blogs/${item._id}`} key={item._id || index} onClick={handleClose}>
                    <div className={isSearchingPage ? "searchBlog" : "blog"}>  
                      <h2> {item.title}</h2>
                      <p>By: {item.author}</p>
                    </div>
                </Link>
        })}
    </div>
    );
  }
  
  export default PrintList;