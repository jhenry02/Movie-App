import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/reelgood_logo.png';
import { Navbar, Nav, Form, Button, ButtonGroup, Image, Container } from 'react-bootstrap'
import MySearchBar from './SearchBar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom'

import { useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import { getAuth, signOut } from 'firebase/auth';
import '../../config/firebase-config';
import audiofile from "../../Logout.mp3"

export default function MyNavbar() {

    // used to naviate to different locations
    const navigate = useNavigate();

    // Using UserContext to access Use and setUser
    const { User, setUser } = useContext(UserContext);

    const signout = (e) => {
        e.preventDefault();
        const audio = new Audio(audiofile);
        audio.play();
        // authenticates with google using api credentals
        const auth = getAuth()
        auth.signOut()
            .then(() => {
                navigate('/');  // navigate back to home page
                setUser(null);
                localStorage.clear()
            }).catch((e) => { // else catch and print errors
                console.log(e.code)
                console.log(e.message);
            });
    }

    const profile = (e) => {
        navigate('/profile');  // navigate back to home page
    }

    const authbutton = () => {
        if (!User) {  // If Not Authenticated Show Login and Signup
            return (
                <ButtonGroup>
                    <Button variant="outline-light" as={Link} to="/Login">Login</Button>
                    <Button variant="outline-light" as={Link} to="/Register">Signup</Button>
                </ButtonGroup>
            );
        } else {  // If Authenticated Show Logout
            return (
                <>
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="warning" id="dropdown-autoclose-true">
                            Settings
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item onClick={profile}>Profile</Dropdown.Item>
                        <Dropdown.Item onClick={signout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            );
        }

    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg"> {/* This component is a container towards the navbar. */}
            <Container fluid> {/* Warning: bottom marging might exceed visual.*/}
            <a href="/" target="_self" rel="noopener noreferrer">
                <Image src={logo} alt="Logo" width={80} height={60} />
                </a>
                <Navbar.Toggle aria-controls="basic-navbar=nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        {User && (
                            <>
                                <Nav.Link as={Link} to='/nowplaying'>Now Playing</Nav.Link>
                                <Nav.Link as={Link} to='/popular'>Popular</Nav.Link>
                                <Nav.Link as={Link} to='/upcoming'>Upcoming</Nav.Link>
                                <Nav.Link as={Link} to='/theater'>Theater</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {User && (
                    <>
                        <MySearchBar /> {/* This component loads the searchbar component. */}
                    </>
                )}

                <Form className="mx-3">
                    {authbutton()}
                </Form>
            </Container>
        </Navbar>
    )
}
