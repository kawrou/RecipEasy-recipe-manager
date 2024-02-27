import { Link } from "react-router-dom";

import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home">
      <h1>Welcome to RecipEasy!</h1>
      <p> A place to store all your favourite recipes, from ones you find online to creating your own.</p>
      <input type="text" placeholder="Paste your URL here"/> 
      <button type="submit">Generate Recipe</button>
      <button type="submit">Enter Manually</button>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
