import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (
    
    <div className="home">
      <h1 className="text-5xl font-bold underline">Welcome to Acebook!</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
