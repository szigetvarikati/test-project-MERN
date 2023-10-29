import { Link } from 'react-router-dom';

function LoginScreen() {
  return (
    <div className="login">
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
    </div>
  );
}

export default LoginScreen;