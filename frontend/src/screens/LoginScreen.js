import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginScreen() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <Container className="py-5">
      <Container className="bg-dark text-white col-md-8 col-lg-6 text-center p-5">
        <Helmet>
          <title>Login</title>
        </Helmet>
        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <p class="text-white-50 mb-4">Please enter your login and password!</p>
        <Form className="row d-flex justify-content-center align-items-center">
          <Form.Group className="mb-3" controlId="username">
            <Form.Control type="username" required />
            <Form.Label>Username</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" required />
            <Form.Label>Password</Form.Label>
          </Form.Group>
          <Link
            to={`/signup?redirect=${redirect}`}
            className="text-white-50 small mb-5 pb-lg-2"
          >
            Forgot password
          </Link>
          <div className="mb-3">
            <Button type="submit" className="my-custom-button">
              Login
            </Button>
          </div>
          <div className="mb-3 p-2">
            Don't have an account?{' '}
            <Link
              to={`/signup?redirect=${redirect}`}
              className="text-white-50 fw-bold"
            >
              Sign up
            </Link>
          </div>
        </Form>
      </Container>
    </Container>
    /*<div className="login">
      <div>Login To Your Account</div>
      <div class="login-form">
        <form action="#" autoComplete="off">
          <div class="">
            <div class="">
              <input
                type="text"
                id="username"
                class=""
                name="username"
                //value={user.name}
                //onChange={}
                placeholder="Your username"
              />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <div class="flex relative ">
              <input
                type="password"
                id="sign-in-email"
                class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="password"
                //value={user.password}
                //onChange={handleChange}
                placeholder="Your password"
              />
            </div>
          </div>
          <div class="flex w-full">
            <button
              type="submit"
              class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg  "
              // onClick={login}
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div class="flex items-center justify-center mt-6">
        <Link
          to="/Register"
          class="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
        >
          <span class="ml-2">You don&#x27;t have an account?</span>
        </Link>
      </div>
    </div>*/
  );
}
