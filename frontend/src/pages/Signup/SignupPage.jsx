import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../../services/authentication";

// [a-zA-Z0-9._-]+: Match one or more alphanumeric characters, dots, underscores, or hyphens for the username part.
// @: Match the "@" symbol.
// [a-zA-Z0-9.-]+: Match one or more alphanumeric characters, dots, or hyphens for the domain name.
// \.: Match a period (dot), which separates the domain name and top-level domain (TLD).
// [a-zA-Z]{2,4}: Match the TLD, consisting of 2 to 4 alphabetical characters.
const isValidEmail = (email) => {
  const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
  return (
    emailTest
  )
};

// At least one lowercase alphabet i.e. [a-z]
// At least one uppercase alphabet i.e. [A-Z]
// At least one Numeric digit i.e. [0-9]
// At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
// Also, the total length must be in the range [8-15]
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
      errors.email = 'Enter a valid email address'
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
      console.error(err);
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          placeholder="Username"
          id="username"
          type="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
