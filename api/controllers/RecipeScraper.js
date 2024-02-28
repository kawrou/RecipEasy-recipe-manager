const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const fetchRecipeData = async (req, res) => {
  const url = req.query.url;
  console.log(url)
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const jsonLD = $('script[type="application/ld+json"]');
    // let recipeData = [];
    let recipeData;

    jsonLD.each((index, element) => {
      const scriptContent = $(element).html();
      try {
        const jsonData = JSON.parse(scriptContent);

        if (jsonData["@graph"]) {
          const recipeObjects = jsonData["@graph"].filter(
            (obj) => obj["@type"] === "Recipe"
          );
          // recipeData.push(...recipeObjects);
          recipeData = recipeObjects;
        } else if (jsonData["@type"] === "Recipe") {
          // recipeData.push(jsonData);
          recipeData = jsonData;
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
          // const jsonData = [];
          let jsonData;

          scripts.forEach((script) => {
            try {
              const parsedData = JSON.parse(script.textContent);

              if (parsedData["@graph"]) {
                const recipeObjects = parsedData["@graph"].filter(
                  (obj) => obj["@type"] === "Recipe"
                );
                // jsonData.push(...recipeObjects);
                jsonData = recipeObjects;
              } else if (parsedData["@type"] === "Recipe") {
                // jsonData.push(parsedData);
                jsonData = parsedData;
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
    console.log(recipeData)
    // return recipeData;
    res.status(200).json({recipe_data:  recipeData});
    // add user id/token once everything is set up
  } catch (error) {
    console.error("Error fetching URL:", error);
    return null;
  }
};

// Example usage:
// const url = "https://www.mob.co.uk/recipes/jalepeno-coconut-chicken-thighs"; // Replace with the desired URL
// fetchRecipeData(url)
//   .then((recipeData) => {
//     console.log("Recipe Data:", recipeData);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = fetchRecipeData;


