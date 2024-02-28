import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import { scrapeRecipe } from "../../services/recipeScraper";



export const HomePage = ({token}) => {
  const navigate = useNavigate(); 
  const[url, setUrl] = useState ("")

  const handleClick = (e)=> {
    e.preventDefault()
    scrapeRecipe(url, token)
    navigate('/signup')
  }

  return(
    <div className="home">
      <h1>Welcome to RecipEasy!</h1>
      <p> A place to store all your favourite recipes, from ones you find online to creating your own.</p>
      <input type="text" placeholder="Paste your URL here" onChange={e => setUrl(e.target.value)} value={url}/> 
      <button type="submit" onClick={handleClick}>Generate Recipe</button>
      <button type="submit">Enter Manually</button>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
};
