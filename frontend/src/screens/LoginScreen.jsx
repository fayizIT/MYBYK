import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Added state for "Remember Me"

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Login In With Email</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='forgot-password'>
            <Link to='/forgotpassword'>Forgot Password?</Link>
          </div>
        </Form.Group>

        <Form.Group controlId='rememberMe'>
          <Form.Check
            type='checkbox'
            label='Remember Me'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='success'
          className='mt-3'
          style={{ backgroundColor: '#3BED2B', borderColor: '#6EFA3D', width: '200px' }}
        >
          Login In
        </Button>
      </Form>

      {isLoading && <Loader />}

      <Row className='py-3'>
        <Col>
          Doesn’t have an account yet? <Link to='/register'> Signup</Link>
        </Col>
      </Row>

      <div className="divider">
        <hr className="divider-line" />
        <p className="divider-text">or login with mobile</p>
        <hr className="divider-line" />
      </div>
    </FormContainer>
  );
};

export default LoginScreen;