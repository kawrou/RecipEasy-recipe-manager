import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./HomePage.css";
import RecipeScraper from "../../components/RecipeScraper";

export const HomePage = () => {
  //Will need this for setting token later
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  // COMMENT CAN BE DELETED AFTER REVIEW
  // WHY URL STATE IS HANDLED BY PARENT COMPONENT
  // Current implementation has the parent component handle the navigation
  // This means the url <input> of RecipeScraper component has to be handled
  // by parent component instead.
  // The actual FETCH request is handled by the RecipeScraper component.

  // handleSubmit is passed as prop to RecipeScraper so that when the form is
  // submitted, the parent component will know to navigate to the correct page
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token && url) {
      navigate("/recipes");
    } else if (token) {
      navigate("/recipes");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home items-center">
      {/* Delete the placeholder logo when we have a logo */}
      <div className="border-2 rounded w-40 h-40">placeholder logo</div>
      <h1 className="text-5xl font-bold py-5">RecipEasy</h1>
      <p className="py-5">
        A place to store all your favourite recipes, from ones you find online
        to creating your own.
      </p>
      <RecipeScraper
        token={token}
        url={url}
        setUrl={setUrl}
        handleUrlChange={handleUrlChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default HomePage;
