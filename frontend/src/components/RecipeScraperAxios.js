import axios from "axios";
import cheerio from "cheerio";
import puppeteer from "puppeteer";

const fetchRecipeData = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const jsonLD = $('script[type="application/ld+json"]');
    let recipeData = [];

    jsonLD.each((index, element) => {
      const scriptContent = $(element).html();
      try {
        const jsonData = JSON.parse(scriptContent);

        if (jsonData["@graph"]) {
          const recipeObjects = jsonData["@graph"].filter(
            (obj) => obj["@type"] === "Recipe"
          );
          recipeData.push(...recipeObjects);
        } else if (jsonData["@type"] === "Recipe") {
          recipeData.push(jsonData);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

    if (recipeData.length === 0) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const jsonLdData = await page.$$eval(
        'script[type="application/ld+json"]',
        (scripts) => {
          const jsonData = [];

          scripts.forEach((script) => {
            try {
              const parsedData = JSON.parse(script.textContent);

              if (parsedData["@graph"]) {
                const recipeObjects = parsedData["@graph"].filter(
                  (obj) => obj["@type"] === "Recipe"
                );
                jsonData.push(...recipeObjects);
              } else if (parsedData["@type"] === "Recipe") {
                jsonData.push(parsedData);
              }

              // if (parsedData["@type"] === "Recipe") {
              //   jsonData.push(parsedData);
              // }
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

    return recipeData;
  } catch (error) {
    console.error("Error fetching URL:", error);
    return null;
  }
};

// Example usage:
const url = "https://www.mob.co.uk/recipes/jalepeno-coconut-chicken-thighs"; // Replace with the desired URL
fetchRecipeData(url)
  .then((recipeData) => {
    console.log("Recipe Data:", recipeData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
