// ...import statements...

// import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { NavDropdown } from 'react-bootstrap';



const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [logoutApiCall] = useLogoutMutation();
  
    const logoutHandler = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <header>
        <Navbar className="custom-navbar" style={{ background: 'lightgreen' }} variant="light" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>MYBYK</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <LinkContainer to='/home'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/ride'>
                  <Nav.Link>Ride</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/wallet'>
                  <Nav.Link>Wallet</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/notification'>
                  <Nav.Link>Notification</Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <>
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/login'>
                      <Nav.Link>
                        <FaSignInAlt /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    );
  };
  
  export default Header;
  