import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { RecipePage } from "./pages/RecipePage/RecipePage";
import { RecipeCollection } from "./pages/RecipeCollection/RecipeCollection";
import Navbar from "./components/Navbar";

// docs: https://reactrouter.com/en/main/start/overview

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/recipes/create" element={<RecipePage newRecipe={true} />} />
        <Route path="/recipes/:recipe_id" element={<RecipePage newRecipe={false} />} />
        <Route path="/recipecollection" element={<RecipeCollection/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
