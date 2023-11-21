import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function RegistrationScreen() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    const email = event.currentTarget.email.value;
    const firstName = event.currentTarget.firstName.value;
    const lastName = event.currentTarget.lastName.value;

    const registrationData = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      password: password,
      isAdmin: false,
    };

    setLoginFailed(false);
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log('Error', error));
    navigate('/login');
  };

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isPasswordConfirmationSuccessfull(password, passwordConfirm) {
    return passwordConfirm === password;
  }

  return (
    <Container className="py-5">
      <Container className="bg-dark text-white col-md-8 col-lg-6 text-center p-5 ">
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <h2 className="fw-bold mb-2 text-uppercase">Regisztráció</h2>
        <p class="text-white-50 mb-4">Kérem töltse ki az alábbi adatokat</p>
        <Form
          onSubmit={handleSubmit}
          className="row d-flex justify-content-center align-items-center"
        >
          <Form.Group className="mb-3 my-max-width" controlId="lastname">
            <Form.Control
              type="text"
              name="lastName"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Label>Családnév</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 my-max-width" controlId="firstname">
            <Form.Control
              type="text"
              name="firstName"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Label>Keresztnév</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 my-max-width" controlId="email">
            <Form.Control
              type="text"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!isEmailValid(email)}
            />
            <Form.Control.Feedback type="invalid">
              Kérem adjon meg egy érvényes e-mail címet!
            </Form.Control.Feedback>
            <Form.Label>E-mail cím *</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 my-max-width" controlId="username">
            <Form.Control
              type="text"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Label>Felhasználónév *</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3 my-max-width" controlId="password">
            <Form.Control
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label>Jelszó *</Form.Label>
          </Form.Group>
          <Form.Group
            className="mb-3 my-max-width"
            controlId="password-confirm"
          >
            <Form.Control
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              required
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              isInvalid={
                !isPasswordConfirmationSuccessfull(password, passwordConfirm)
              }
            />
            <Form.Control.Feedback type="invalid">
              A jelszó nem egyezik!
            </Form.Control.Feedback>
            <Form.Label>Jelszó megerősítése *</Form.Label>
          </Form.Group>
          {loginFailed && <div className="text-danger">{errorMessage}</div>}
          <div className="mb-3">
            <Button type="submit" className="my-custom-button">
              Regisztráció
            </Button>
          </div>
        </Form>
        <Link to="/login">Már regisztáltam, belépek</Link>
      </Container>
    </Container>
  );
}
