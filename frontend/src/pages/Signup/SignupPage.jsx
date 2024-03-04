import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

// Match one or more alphanumeric characters, dots, underscores, or hyphens for the username part.
// Match the "@" symbol.
// Match one or more alphanumeric characters, dots, or hyphens for the domain name.
// Match a period (dot), which separates the domain name and top-level domain (TLD).
// Match the TLD, consisting of 2 to 4 alphabetical characters.
const isValidEmail = (email) => {
  const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  return (
    emailTest
  )
};

// At least one lowercase letter
// At least one uppercase letter
// At least one number
// At least one special character
// Length must be in the range 8-15
const isValidPassword = (password) => {
  const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password);
  return (
    passwordTest
  );
};

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    // validate email - if not valid add an error message to errors object
    if (!isValidEmail(email)) {
      errors.email = 'Enter a valid email address.'
    }

    // validate password
    if (!isValidPassword(password)) {
      errors.password = 'Password must be between 8 and 15 characters long with atleast 1 uppercase, 1 number, and 1 special character.'
    }

    // if there are errors stop signup submission
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await signup(email, password, username);
      console.log("redirecting...:");
      navigate("/login");
    } catch (err) {
      // catch if username or email is not unique and show error
      setFormErrors({ ...formErrors, username: 'Username and Email must be unique.' })
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setFormErrors({ ...formErrors, email: '' }); // clear errors when the user starts typing
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setFormErrors({ ...formErrors, password: '' });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setFormErrors({ ...formErrors, username: '' });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <div className="border-2 rounded w-40 h-40">placeholder logo</div>
                Recipeasy    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="text" name="email" id="email" value={email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" onChange={handleEmailChange} />
                            {formErrors.email && <div className="text-red-500">{formErrors.email}</div>}
                        </div>

                        <div>
                            <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" value={password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handlePasswordChange} />
                            {formErrors.password && <div className="text-red-500">{formErrors.password}</div>}
                        </div>

                        <div>
                            <label htmlFor="username"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="username" id="username" value={username} placeholder="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleUsernameChange} />
                            {formErrors.username && <div className="text-red-500">{formErrors.username}</div>}
                        </div>
                        <button type="submit" role="submit-button" value="Submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Create an account</button>
                        
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};
