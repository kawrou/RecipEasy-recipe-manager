import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import { scrapeRecipe } from "../../services/recipeScraper";



export const HomePage = () => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate(); 
  const[url, setUrl] = useState ("")

  const handleClick = (e)=> {
    e.preventDefault()
    if (token && url) {
      scrapeRecipe(url, token) // setting token from scraping, not yet implemented
      navigate('/recipes')
    } else if (token) {
      navigate('/recipes')
    } 
    else {
      navigate('/login')
    }
     }

  return(
    <div className="home">
      <h1 className="text-5xl font-bold underline">RecipEasy</h1>
      <p> A place to store all your favourite recipes, from ones you find online to creating your own.</p>
      <input type="text" placeholder="Paste your URL here" onChange={e => setUrl(e.target.value)} value={url}/> 
      <button type="submit" onClick={handleClick}>Generate Recipe</button>
      <button type="submit" onClick={handleClick}>Enter Manually</button>
    </div>
  );
};
