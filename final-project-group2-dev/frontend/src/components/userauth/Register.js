import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import '../../config/firebase-config';

import { UserContext } from '../../Context/UserContext';
import axios from 'axios';

function Register() {


  const { User, setUser } = useContext(UserContext)
  const [token, setToken] = useState('');   // sets token

  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [zipcode, setzipcode] = useState('');
  const [state, setstate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => { // when users login state changes...
      if (user) {
        console.log(user)
        // setAuth(true);
        // userCred.getIdToken().then((token)=>{
        //   setToken(token);
        // })
      }
    })
  }, [])

  const reg = async (e) => {
    e.preventDefault();
    navigate('/'); 
    // authenticates with google using api credentals
    const auth = getAuth()
    try {
      const usercredentials = await createUserWithEmailAndPassword(auth, email, password);
      // If usercredentials are returned, user exists, hence get token and send data to server
      const token_auth = await usercredentials.user.getIdToken()
      if (usercredentials) {
        setUser(usercredentials.user)
        const response = await axios.post('/Register', {
          first_name: first_name,
          last_name: last_name,
          zipcode: zipcode,
          state: state,
          token: token_auth
        });
        setResponse(response);
        console.log("Register data sent: ");
        console.dir(response);
      }
    } catch (error) {
      setResponse(error);
      setError(true);
      console.log("The error during an error is: " + error);
    }
  }


  return (
    <>
      <Container className='py-5' fluid>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h1 className='text-center mb-5'>Signup</h1>
            <Form onSubmit={reg}>
              <Form.Group className='pt-3' controlId='formemail'>
                <Form.Label>Email address:</Form.Label>
                <Form.Control type='email' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className='pt-3' controlId='formemail'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className='pt-3' controlId='formfirstname'>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type='first_name' placeholder='First Name' onChange={(e) => setfirst_name(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='pt-3' controlId='formlastname'>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type='last_name' placeholder='Last Name' onChange={(e) => setlast_name(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='justify-content-between'>
                <Col md={6}>
                  <Form.Group className='pt-3' controlId='formzipcode'>
                    <Form.Label>Zipcode:</Form.Label>
                    <Form.Control type='zipcode' placeholder='Zipcode' onChange={(e) => setzipcode(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='pt-3' controlId='formstate'>
                    <Form.Label>State:</Form.Label>
                    <Form.Control type='state' placeholder='State' onChange={(e) => setstate(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <div className='d-flex justify-content-end pt-3'>
                <Button variant='warning' type='submit' className='ml-auto'>
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Register