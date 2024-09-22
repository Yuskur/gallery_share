import logo from './logo.svg';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/profile';
import PostEdit from './pages/post-edit';
import Login from './pages/login';
import Topbar from './components/topbar';
import Landing from './pages/landing-page';


function AppWraper() {
  return (
    <div className='app'>
      <div className='topbar'>
        <Topbar/>
      </div>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/post-edit' element={<PostEdit />}/>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return(
    <BrowserRouter>
      <AppWraper />
    </BrowserRouter>
  );
}

export default App;
