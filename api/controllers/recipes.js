const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
// const tokenChecker = require("../middleware/tokenChecker");

const fetchRecipeData = async (req, res) => {
    const url = req.query.url;
    console.log("Fetching URL:", url);

    try {
      const response = await axios.get(url);
      const html = response.data;
      console.log(response)

      const $ = cheerio.load(html);

      const jsonLD = $('script[type="application/ld+json"]');
      let recipeData;

      jsonLD.each((index, element) => {
        const scriptContent = $(element).html();
        try {
          const jsonData = JSON.parse(scriptContent);

          if (jsonData["@graph"]) {
            const recipeObjects = jsonData["@graph"].filter((obj) => obj["@type"] === "Recipe");
            recipeData = recipeObjects;
          } else if (jsonData["@type"] === "Recipe") {
            recipeData = jsonData;
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });

      if (!recipeData || recipeData.length === 0) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);

        const jsonLdData = await page.$$eval(
          'script[type="application/ld+json"]',
          (scripts) => {
            let jsonData;

            scripts.forEach((script) => {
              try {
                const parsedData = JSON.parse(script.textContent);

                if (parsedData["@graph"]) {
                  const recipeObjects = parsedData["@graph"].filter((obj) => obj["@type"] === "Recipe");
                  jsonData = recipeObjects;
                } else if (parsedData["@type"] === "Recipe") {
                  jsonData = parsedData;
                }
              } catch (error) {
                console.error("Error parsing JSON-LD data:", error);
              }
            });
            return jsonData;
          }
        );

        recipeData = jsonLdData;

        await browser.close();
      }

      console.log("Recipe Data:", recipeData);
      res.status(200).json({ recipe_data: recipeData });
    } catch (error) {
      console.log(Object.keys(error))
      // console.error("Error fetching URL:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


const RecipesController = {
  fetchRecipeData: fetchRecipeData,
};

module.exports = RecipesController;