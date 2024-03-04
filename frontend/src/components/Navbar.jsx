import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <nav className="w-screen justify-between flex-wrap bg-white p-6">
      {/* ... (other code) */}
      <div className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className="text-lg lg:items-center lg:flex-grow">
          <NavLink className="inline-block text-center lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500" to="/">
            Home
          </NavLink>
          {/* Conditionally render "My Recipes" link */}
          {isLoggedIn && (
            <NavLink className="inline-block text-center lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-500" to="/myrecipes">
              My Recipes
            </NavLink>
          )}
        </div>

        <div className="lg:flex lg:items-center lg:w-auto">
          {/* Right-aligned Login, Logout, and Signup Links */}
          {isLoggedIn ? (
            <button
            onClick={onLogout}  
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-red-600 border-red-600 hover:text-red-500 hover:bg-white mt-4 lg:mt-0 ml-auto"
          >
            Log Out
          </button>
          ) : (
            <NavLink
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-600 border-blue-600 hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-auto"
              to="/login"
            >
              Log In
            </NavLink>
          )}

          {/* Conditionally render Sign Up link */}
          {!isLoggedIn && (
            <NavLink
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-500 border-gray-500 hover:border-transparent hover:text-blue-500 hover:bg-white ml-2"
              to="/signup"
            >
              Sign Up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
