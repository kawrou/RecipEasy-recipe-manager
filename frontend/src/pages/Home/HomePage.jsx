import RecipeScraper from "../../components/RecipeScraper";

export const HomePage = ({
  handleScrapeRecipe,
  token,
  url,
  handleUrlChange,
  setRecipeData,
}) => {
  return (
    <div className="flex flex-col justify-center items-center flex-auto">
      <div className="flex justify-center items-center">
        <div className=" basis-2/5 ">
          {/* Delete the placeholder logo when we have a logo */}
          <div className="flex flex-auto flex-col items-center content-start pr-5 px-20 max-w-[500px]">
            <img
              src="../../../src/assets/recipeasyLogo.svg"
              className="w-56 py-4"
            />
            <h1 className="font-kanit font-extrabold text-primary-500 italic text-6xl pb-4">
              Recipeasy
            </h1>
            <h2 className="font-kanit font-medium text-primary-500 text-xl pb-4">
              Your Hassle-Free Recipe Organiser
            </h2>
            <p
              aria-label="Page Instructions"
              className="font-poppins py-5 font-extralight text-sm text-gray-600"
            >
              Simply paste the URL of your favourite recipe page, or manually
              input your cherished recipes, and watch as Recipeasy effortlessly
              generates neatly organised recipes for you to store and access
              anytime, anywhere.
            </p>
            <RecipeScraper
              token={token}
              url={url}
              handleUrlChange={handleUrlChange}
              handleScrapeRecipe={handleScrapeRecipe}
              setRecipeData={setRecipeData}
            />
          </div>
        </div>
        <div>
          <img src="../../../src/assets/homepageImage.svg" className="p-20" />
        </div>
      </div>
      <div className="text-xs justify-self-end">
        <a
          href="https://www.vecteezy.com/free-vector/cooking"
          className="text-gray-200"
        >
          Cooking Vectors by Vecteezy
        </a>
      </div>
    </div>
  );
};

export default HomePage;
