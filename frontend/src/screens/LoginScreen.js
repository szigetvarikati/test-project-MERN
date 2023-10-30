import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function LoginScreen() {
  return (
    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-5 text-center">
                <div class="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-white-50" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>

                  <div class="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" class="text-white">
                      <i class="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="#!" class="text-white">
                      <i class="fab fa-twitter fa-lg mx-4 px-2"></i>
                    </a>
                    <a href="#!" class="text-white">
                      <i class="fab fa-google fa-lg"></i>
                    </a>
                  </div>
                </div>

                <div>
                  <p class="mb-0">
                    Don't have an account?{' '}
                    <a href="#!" class="text-white-50 fw-bold">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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

export default LoginScreen;
