import React from 'react';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import auth from '../../auth/Auth';

const NavBar = (props) => {
    const location = useLocation();
    const history = useHistory();

    const handleLogout = () => {
        auth.logout( async () => {
            // TODO: Fetch to delete redis session
            await fetch('/logout',{
                method: 'POST',
                credentials: 'include'
            }) 
            console.log('User logged out');
            document.cookie = "token="
            history.push('/login');
        })
    }
    return (
        <Navbar style={{backgroundColor: '#fff', height: 100}}>
            <Nav className="mr-auto">
                <Navbar.Brand className="title-logo" style={{color: '#294965', marginLeft: 200, marginRight: 300, fontSize: 24}}>BookWorms.</Navbar.Brand>
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' && 'active'}`}
                    >
                        Home
                </Link>
                <Link 
                    to="/mybooks"
                    className={`nav-link ${location.pathname === '/mybooks' && 'active'}`}
                    >
                        My Books
                </Link>
                <Link 
                    to="/discover"
                    className={`nav-link ${location.pathname === '/discover' && 'active'}`}
                    >
                        Discover
                </Link>
                <Link 
                    to="/search"
                    className={`nav-link ${location.pathname === '/search' && 'active'}`}
                    >
                        Search
                </Link>
            </Nav>
            <Dropdown style={{marginRight: 73}} >
                <Dropdown.Toggle variant="secondary" style={{backgroundColor: '#fff', borderColor: 'white'}} >
                    <Image style={{height: 42}} src='/logo192.png' roundedCircle />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{marginRight: 100}}>
                    <Dropdown.Item><Link to="/profile" className="text-decoration-none text-dark">Profile</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item><a onClick={handleLogout} className="text-decoration-none text-dark">Signout</a></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    );
};

export default NavBar;