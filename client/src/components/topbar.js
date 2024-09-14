import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useLocation} from 'react-router-dom';
import './topbar.css';

function Topbar(){
  const location = useLocation();

    return(
      <div className='top-bar'>
        <div className='logo-container'>
            <p className='logo'>Gallery Share</p>
        </div>
        <Nav className='navbar'fill variant='underline' activeKey={location.pathname}>
          <Nav.Item>
            <Nav.Link className='navbar-links' as={Link} to='/' href='/'>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='navbar-links' as={Link} to='/login' eventKey={'/login'}>Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='navbar-links' as={Link} to='/' eventKey={'/signup'}>Discover</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    )
  }

  export default Topbar;