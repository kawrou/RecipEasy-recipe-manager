import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../services/authentication";

export const LoginPage = ({ onLogin, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      console.log(token);
      onLogin(true);
      setToken(token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      alert("Please try again");
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <section class="font-poppins">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="flex items-center mb-6 text-5xl font-kanit font-bold italic text-primary-500">
            <img
              class="w-16 mb-1.5 -mr-0.5"
              src="../../../src/assets/recipeasyLogo.svg"
              alt="logo"
            />
            ecipeasy
          </div>
          <div class="w-full bg-white rounded-lg shadow shadow-tertiary-500 border  md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-secondary-500 md:text-2xl">
                Log in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm text-left font-light text-gray-600"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="outline-none focus:ring-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="name@company.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm text-left font-light text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••••••••••"
                    class="outline-none focus:ring-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {/* <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div> */}
                <button
                  type="submit"
                  class="w-full text-white bg-secondary-500 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-kanit font-bold text-lg rounded-lg px-5 py-2.5 text-center"
                >
                  Log in
                </button>
                <p class="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-500 hover:text-rose-400"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
