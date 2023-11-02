import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function LoginScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        setErrorMessage('Helytelen felhasználónév vagy jelszó!');
        setLoginFailed(true);
        localStorage.removeItem('username');
      }
    } catch {
      setErrorMessage('Hoppá! Valami baj van... Próbálja meg újra!');
      setLoginFailed(true);
      localStorage.removeItem('username');
    }
  };

  return (
    <Container className="py-5">
      <Container className="bg-dark text-white col-md-8 col-lg-6 text-center p-5 ">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h2 className="fw-bold mb-2 text-uppercase">Bejelentkezés</h2>
        <p class="text-white-50 mb-4">Kérem adja meg a felhasználónevét és a jelszavát!</p>
        <Form
          onSubmit={handleSubmit}
          className="row d-flex justify-content-center align-items-center"
        >
          <Form.Group className="mb-3 my-max-width" controlId="username">
            <Form.Control
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label>Felhasználónév</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 my-max-width" controlId="password">
            <Form.Control
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label>Jelszó</Form.Label>
          </Form.Group>
          {loginFailed && <div className="text-danger">{errorMessage}</div>}
          <div className="mb-3">
            <Button type="submit" className="my-custom-button">
              Belépés
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
