import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link , useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import './topbar.css';

function Topbar(){
  const location = useLocation();

  //Get the authentication state of the current user
  const { state } = useAuthContext();

    return(
      <div className='top-bar'>
        <div className='logo-container'>
            <p className='logo'>Gallery Share</p>
        </div>
        <Nav className='navbar' fill variant='underline' activeKey={location.pathname}>
          <Nav.Item>
            <Nav.Link className='navbar-links' as={Link} to='/' eventKey={'/'}>Home</Nav.Link>
          </Nav.Item>
          {
            state ? (
              <Nav.Item>
                <Nav.Link className='navbar-links' as={Link} to='/login' eventKey={'/login'}>Login</Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link className='navbar-links' as={Link} to='/profile' eventKey={'/profile'}>Profile</Nav.Link>
              </Nav.Item>
            )
          }
        </Nav>
      </div>
    )
  }

  export default Topbar;