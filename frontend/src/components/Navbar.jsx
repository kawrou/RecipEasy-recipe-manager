import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const { pathname } = useLocation();

  const isRootPath = () => {
    return pathname === "/";
  };

  const isLoginPath = () => {
    return pathname === "/login"
  }

  const isSignUpPath = () => {
    return pathname === "/signup"
  }

  //If the current path (page) is /login or /signup then the navbar isn't rendered
  if (isLoginPath() || isSignUpPath()) {
    return null;
  }


  return (
    <div className="relative flex justify-center items-center h-16 bg-white ">
      {/* Clickable logo link to Home Page */}
      <NavLink className="absolute left-4" to="/" >
        <img src="../../../src/assets/recipeasyLogo.svg" className="w-14" alt="Recipeasy Homepage Logo Link"/>
      </NavLink>

      {/* Home Page link is rendered on pages that aren't the Home Page  */}
      <div className="flex font-kanit text-lg items-center gap-5">
        {!isRootPath() && (
          <NavLink
            className="font-bold text-center text-secondary-500 hover:text-blue-900"
            to="/"
          >
            Home
          </NavLink>
        )}

        {/* Conditionally render "My Recipes" link if user is logged in */}
        {isLoggedIn && (
          <NavLink
            className="font-bold text-center text-primary-500 hover:text-rose-500"
            to="/myrecipes"
          >
            My Recipes
          </NavLink>
        )}
      </div>

      <div className="absolute right-4 flex font-kanit items-center w-auto gap-2 ">
        {/* Right-aligned Login, Logout, and Signup Links */}
        {/* Conditionally renders the text content of the (Log in / Log out) button */}
        {isLoggedIn ? (
          <NavLink
            onClick={onLogout}
            className="text-lg px-4 py-2 border rounded-lg text-white bg-secondary-500 border-blue-600 hover:text-secondary-500 hover:bg-white"
            to="/"
          >
            Log Out
          </NavLink>
        ) : (
          <NavLink
            className="text-lg px-4 py-2 border rounded-lg text-white bg-secondary-500 border-blue-600 hover:text-secondary-500 hover:bg-white "
            to="/login"
            aria-label="Log in"
          >
            Log In
          </NavLink>
        )}

        {/* Conditionally render Sign Up link */}
        {!isLoggedIn && (
          <NavLink
            className="text-lg px-4 py-2 border rounded-lg text-primary-500 border-primary-500 hover:text-white hover:bg-primary-500"
            to="/signup"
            aria-label="Sign Up"
          >
            Sign Up
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
