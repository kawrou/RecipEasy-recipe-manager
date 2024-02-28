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
      <form>
      <div>
      <input type="text" placeholder="Paste your URL here" onChange={e => setUrl(e.target.value)} value={url}/>
      </div> 
      <div className="flex items-center justify-center">
      <button type="submit" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleClick}>Generate Recipe</button>
      <button type="submit" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={handleClick}>Enter Manually</button>
    </div>
    </form>
    </div>
    
  );
};
