const Recipe = require("../../models/recipe");

require("../mongodb_helper");
const mongoose = require("mongoose");

describe("Recipe model", () => {
  const date = new Date("2024-01-31T13:51:02.009+00:00");
  let recipe;

  beforeEach(async () => {
    await Recipe.deleteMany({});
    recipe = new Recipe({
      name: "Jalapeño & Coconut Chicken Thighs",
      description:
        "This is sort of what you'd get if a coconut chutney and a chicken traybake had a baby. It's deceptively simple to make and incredibly delicious.",
      tags: [],
      ownerId: "65ba5046a9d4c1867a4cd305",
      favouritedByOwner: false,
      totalTime: "PT45M",
      recipeYield: 4,
      recipeIngredient: [
        "2 tablespoons olive oil",
        "1  large onion (finely chopped )",
        "1 pound ground beef",
        "1 tablespoon dried oregano",
        "28 ounces crushed tomatoes",
        "3 cloves garlic (chopped)",
        "2 tablespoons tomato paste ((UK tomato puree))",
        "1  good sized handful fresh parsley (chopped)",
        "Salt and pepper (to taste)",
        "½ pound spaghetti",
        "Grated Pecorino Romano or Parmesan cheese for serving (optional)",
      ],
      recipeInstructions: [
        "Preheat the oven to 180°C.",
        "Blend up the four jalapeños along with your fresh coriander (saving a tbsp for garnish), garlic, ginger, shallots, ground coriander, ground cumin, 1 tsp salt, the juice of a lime, and half a tin of coconut milk until it forms a chunky paste.",
      ],
      image:
        "https://files.mob-cdn.co.uk/recipes/2023/11/Jalapeno-Coconut-Chicken-Thighs.jpg",
      dateAdded: date,
    });
  });

  it("has a name", () => {
    expect(recipe.name).toEqual("Jalapeño & Coconut Chicken Thighs");
  });

  it("has a description", () => {
    expect(recipe.description).toEqual(
      "This is sort of what you'd get if a coconut chutney and a chicken traybake had a baby. It's deceptively simple to make and incredibly delicious."
    );
  });

  it("has an ownerId", () => {
    expect(recipe.ownerId).toEqual(
      new mongoose.Types.ObjectId("65ba5046a9d4c1867a4cd305")
    );
  });

  it("has a favouritedByOwner field", () => {
    expect(recipe.favouritedByOwner).toEqual(false);
  });

  it("has a total time", () => {
    expect(recipe.totalTime).toEqual("PT45M");
  });

  it("has a recipe yield", () => {
    expect(recipe.recipeYield).toEqual(4);
  });

  it("has an ingredients list", () => {
    expect(recipe.recipeIngredient).toEqual([
      "2 tablespoons olive oil",
      "1  large onion (finely chopped )",
      "1 pound ground beef",
      "1 tablespoon dried oregano",
      "28 ounces crushed tomatoes",
      "3 cloves garlic (chopped)",
      "2 tablespoons tomato paste ((UK tomato puree))",
      "1  good sized handful fresh parsley (chopped)",
      "Salt and pepper (to taste)",
      "½ pound spaghetti",
      "Grated Pecorino Romano or Parmesan cheese for serving (optional)",
    ]);
  });

  it("has instructions", () => {
    expect(recipe.recipeInstructions).toEqual([
      "Preheat the oven to 180°C.",
      "Blend up the four jalapeños along with your fresh coriander (saving a tbsp for garnish), garlic, ginger, shallots, ground coriander, ground cumin, 1 tsp salt, the juice of a lime, and half a tin of coconut milk until it forms a chunky paste.",
    ]);
  });

  it("has an image", () => {
    expect(recipe.image).toEqual(
      "https://files.mob-cdn.co.uk/recipes/2023/11/Jalapeno-Coconut-Chicken-Thighs.jpg"
    );
  });

  it("has a date added", () => {
    expect(recipe.dateAdded).toEqual(date);
  });

  it("can list all recipes", async () => {
    const recipes = await Recipe.find();
    expect(recipes).toEqual([]);
  });

  it("can save a recipe", async () => {
    await recipe.save();

    const recipes = await Recipe.find();
    expect(recipes[0].totalTime).toEqual("PT45M");
  });
});
