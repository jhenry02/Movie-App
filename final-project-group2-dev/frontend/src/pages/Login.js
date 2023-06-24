import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext, React, useRef } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import '../config/firebase-config';
import Alert from 'react-bootstrap/Alert';
import { UserContext } from '../Context/UserContext';
import audiofile from "../Login.mp3"
import axios from 'axios';
import Cookies from 'js-cookie';
import { Spinner } from 'react-bootstrap';

function Login() {

  const { User, setUser, Token, setToken, CheckAuthStateChanged } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundPlayed, setIsSoundPlayed] = useState(false);
  const audioRef = useRef(null);
  // used to naviate to different locations
  const navigate = useNavigate();

  // called when user logs in
  const login = async (e) => {
    e.preventDefault();
    //navigate('/');  // navigate back to home page   
    // authenticates with google using api credentals
    const auth = getAuth()

    const Token = await signInWithEmailAndPassword(auth, email, password)
      .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
        if (usercredentials) {
          // If user exist, set user
          setUser(usercredentials.user);

          // Return Token
          return usercredentials.user.getIdToken().then((token) => {
            setToken(token)
            return token;
          });

        }
      }).catch((e) => { // else catch and print errors
        console.log(e.code)
        console.log(e.message);
        setToken(false);  // set token to false incase of error
        return;
      });


    const options = {
      headers: {
        Authorization: 'Bearer ' + Token,
        "Content-Type": "text/plain",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        withCredentials: true
      }
    }

    // if successfull login, sent request to backend for a session
    if (Token) {
      const res = await axios.get('/Login', options);
      console.log(res.data);
      if (res.data.playsound) {
        console.log("Inside the submit prior to calling sound");
        await playSound();
        navigate('/');  // navigate back to home page   
      }
    }
    // check to see if users state has changed
    CheckAuthStateChanged();

  }

  // called when user logs in with Google
  const loginWithGoogle = async () => {
    //navigate('/');  // navigate back to home page   
    // authenticates with firebase using Google provider
    const auth = getAuth()

    const provider = new GoogleAuthProvider();
    const Token = await signInWithPopup(auth, provider)
      .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
        if (usercredentials) {
          // If user exist, set user
          setUser(usercredentials.user);

          // Return Token
          return usercredentials.user.getIdToken().then((token) => {
            setToken(token)
            return token;
          });

        }
      }).catch((e) => { // else catch and print errors
        console.log(e.code)
        console.log(e.message);
        setToken(false);  // set token to false incase of error
        return;
      });

    const options = {
      headers: {
        Authorization: 'Bearer ' + Token,
        "Content-Type": "text/plain",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        withCredentials: true
      }
    }

    // if successfull login, sent request to backend for a session
    if (Token) {
      const res = await axios.get('/Login', options);
      console.log(res.data);
      if (res.data.playsound) {
        console.log("Inside the submit prior to calling sound");
        await playSound();
        navigate('/');  // navigate back to home page   
      }
    }

    // check to see if users state has changed
    CheckAuthStateChanged();

  }

  const playSound = () => {
    return new Promise(resolve => {
      console.log("Playing the sound");
      setIsLoading(true); // set isLoading to true
      const audio = audioRef.current;
      audio.play();
      audio.addEventListener('ended', () => {
        setIsSoundPlayed(true);
        setIsLoading(false); // set isLoading to false
        resolve();
      });
    });
  };
  return (
    <Container className='py-5' fluid>
      <audio src={audiofile} ref={audioRef} />
      <Row className='justify-content-center'>
        <Col md={6}>
          <h1 className='text-center mb-5'>Login</h1>
          <Form onSubmit={login}>
            <Form.Group className='pt-3' controlId='formemail'>
              <Form.Label>Email address:</Form.Label>
              <Form.Control type="email" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>
            <Form.Group className='pt-3' controlId='formpassword'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
            </Form.Group>
            <div className='d-flex justify-content-end pt-3'>
              <Button variant="warning" type="submit">
                Submit
              </Button>
              <Button className='mx-2' variant='outline-secondary' onClick={loginWithGoogle}>Log in with Google</Button>
            </div>
          </Form>
        </Col>
        {isLoading && (
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Spinner animation="border" role="status" className="mr-2" />
            <span className="font-weight-bold " style={{ fontWeight: 'bold', fontSize: '1.5rem' }}> Please wait </span>
          </div>
        )}
      </Row>
    </Container>

  );
}

export default Login