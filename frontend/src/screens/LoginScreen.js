import { useState } from 'react';
import { useNavigate, /*useLocation*/ } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //  const location = useLocation();
  //  const redirectInUrl = new URLSearchParams(location.search).get('redirect');
  //  const redirect = redirectInUrl ? redirectInUrl : '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginFailed(false);
    try {
      const username = event.currentTarget.username.value;
      const password = event.currentTarget.password.value;

      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (res.status === 200) {
        const response = await res.json();
        localStorage.setItem('username', response.username);
        navigate('/products');
      } else if (res.status === 401) {
        console.log('401????');
        setErrorMessage('Incorrect username/password!');
        setLoginFailed(true);
        localStorage.removeItem('username');
      }
    } catch {
      setErrorMessage('Oops! Something went wrong... Please try again!');
      setLoginFailed(true);
      localStorage.removeItem('username');
    }
  };

  return (
    <Container className="py-5">
      <Container className="bg-dark text-white col-md-8 col-lg-6 text-center p-5">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <p class="text-white-50 mb-4">Please enter your login and password!</p>
        <Form
          onSubmit={handleSubmit}
          className="row d-flex justify-content-center align-items-center"
        >
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label>Username</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label>Password</Form.Label>
          </Form.Group>
          {/* <Link
            to={`/signup?redirect=${redirect}`}
            className="text-white-50 small mb-5 pb-lg-2"
          >
            Forgot password
          </Link> */}
          {loginFailed && <div className="text-danger">{errorMessage}</div>}
          <div className="mb-3">
            <Button type="submit" className="my-custom-button">
              Login
            </Button>
          </div>
          {/* <div className="mb-3 p-2">
            Don't have an account?{' '}
            <Link
              to={`/signup?redirect=${redirect}`}
              className="text-white-50 fw-bold"
            >
              Sign up
            </Link>
          </div> */}
        </Form>
      </Container>
    </Container>
  );
}
