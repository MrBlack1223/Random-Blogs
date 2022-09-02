
import './App.css';
import Home from './home'
import Nav from'./nav'
import NewBlog from './NewBlog'
import Blogs from './Blogs'
import { Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className='home'>
        <Routes>
            <Route path='/' element= {<Home/>}/>
            <Route path='/newBlog' element = {<NewBlog/>} />
            <Route path='/blogs/:id' element = {<Blogs/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
