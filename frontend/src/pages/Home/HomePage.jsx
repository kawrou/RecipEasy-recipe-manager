import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import RecipeScraper from "../../components/RecipeScraper";



export const HomePage = () => {
  //Will need this for setting token later
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate(); 
  const[url, setUrl] = useState ("")


  const handleSubmit = async (e)=> {
    e.preventDefault()
    if (token && url) {
      // Needs refactoring!
      // Not yet getting token back from FETCH
      scrapeRecipe(url, token) 
      setToken(window.localStorage.getItem("token"))
      navigate('/recipes')
    } else if (token) {
      navigate('/recipes')
    } 
    else {
      navigate('/login')
    }
  }

  return(
    <div className="home items-center">
      {/* Delete the placeholder logo when we have a logo */}
      <div className="border-2 rounded w-40 h-40">placeholder logo</div> 
      <h1 className="text-5xl font-bold py-5">RecipEasy</h1>
      <p className="py-5"> A place to store all your favourite recipes, from ones you find online to creating your own.</p>
      <RecipeScraper />
      </div>
  );
};

export default HomePage;
