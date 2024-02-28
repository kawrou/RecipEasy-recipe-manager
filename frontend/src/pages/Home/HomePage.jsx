import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import { scrapeRecipe } from "../../services/recipeScraper";



export const HomePage = () => {
  //Will need this for setting token later
  const [token, setToken] = useState("");
  const navigate = useNavigate(); 
  const[url, setUrl] = useState ("")


  const handleSubmit = (e)=> {
    e.preventDefault()
    if (token && url) {
      // Needs refactoring!
      // Not yet getting token back from FETCH
      scrapeRecipe(url, token) 
      setToken(window.localStorage.getIem("token"))
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
      <form className="py-4 w-full" onSubmit={handleSubmit}>
        <input className="border-2 rounded w-full" type="text" placeholder="Paste your URL here" onChange={e => setUrl(e.target.value)} value={url}/>
        <div className="flex items-center justify-center py-8">
          <button type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Generate Recipe</button>
          <button type="submit" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Enter Manually</button>
        </div>
      </form>
    </div>
  );
};
