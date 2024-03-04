import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(email, password);
      window.localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.error(err);
      navigate("/login");
      alert("Please try again")
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
    <div className="home items-center">
      {/* Delete the placeholder logo when we have a logo */}
      <div className="border-2 rounded w-40 h-40">placeholder logo</div> 
      <h2 className="text-5xl font-bold py-5">Login</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4"></div>
        <input className="border-2 rounded w-min"
          id="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <div className="mb-4"></div>
        <input className="border-2 rounded w-min"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <div className="mb-4"></div>
        <button type="submit" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 mr-2">
          Submit 
        </button>
        <br />
        <div className="mb-4"></div>
        <NavLink to="/signup" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-500 border-gray-500 hover:border-transparent hover:text-blue-500 hover:bg-white">
        Sign Up
        </NavLink>
      </form>
      </div>
    </>
  );
};
