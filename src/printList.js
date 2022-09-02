import {Link} from 'react-router-dom'

function PrintList({data}) {
    return (
    <div className="blogWrapper">
        {data.map((item,index)=>{
          return <Link to = {`/blogs/${item._id}`} key={item._id || index}>
                    <div className="blog">  
                      <h2> {item.title}</h2>
                      <p>By: {item.author}</p>
                    </div>
                </Link>
        })}
    </div>
    );
  }
  
  export default PrintList;