const app = require("../../app");
const Recipe = require("../../models/recipe");
const User = require("../../models/user");
const request = require("supertest");
const JWT = require("jsonwebtoken");
require("../mongodb_helper");

const secret = process.env.JWT_SECRET;
let recipe;

const createToken = (userId) => {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
};

let token;
let decodedToken;
describe("/recipes", () => {
  beforeAll(async () => {
    // add user
    const user = new User({
      email: "post-test@test.com",
      password: "12345678",
      username: "post-someone",
    });
    await user.save();
    await Recipe.deleteMany({});
    userid = user.id;
    token = createToken(user.id);
    decodedToken = JWT.decode(token, process.env.JWT_SECRET);
    // add recipe
    const currentDate = new Date();
    await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test_recipe",
        description: "test_description",
        ownerId: token.user_id,
        tags: ["test_tag_one", "test_tag_two"],
        favouritedByOwner: false,
        totalTime: 20,
        recipeYield: 1,
        recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
        recipeInstructions: ["test_instruction_one", "test_instruction_two"],
        url: "test_url",
        image: "test_url",
        dateAdded: currentDate,
      });

    recipe = await Recipe.find();
  });
  afterEach(async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
  });

  describe("POST, when a valid token is present and recipe input is valid", () => {
    test("new recipe is present in the document", async () => {
      expect(recipe.length).toEqual(1);
      expect(recipe[0].name).toEqual("test_recipe");

      const currentDate = new Date();
      const updateResponse = await request(app)
        .patch(`/recipes/${recipe[0]._id.toString()}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test_update",
          description: "test_description",
          ownerId: token.user_id,
          tags: ["test_tag_one", "test_tag_two"],
          favouritedByOwner: false,
          totalTime: 20,
          recipeYield: 1,
          recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
          recipeInstructions: ["test_instruction_one", "test_instruction_two"],
          url: "test_url",
          image: "test_url",
          dateAdded: currentDate,
        });
      expect(updateResponse.status).toEqual(200);
      const updateRecipe = await Recipe.find();
      expect(updateRecipe.length).toEqual(1);
      expect(updateRecipe[0].name).toEqual("test_update");
    });
  });
});

describe("/recipes/:recipe_id", () => {
  const dateAdded = new Date("2024-03-04");
  const user = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "Password1!",
  });
  const recipe = new Recipe({
    name: "Easy blueberry muffins",
    description:
      "Follow this easy blueberry muffins recipe for a fun weekend bake. You're just a few simple steps away from bite-sized blueberry treats",
    ownerId: "65e1ed2534ba17d5e7b48f68",
    tags: ["Baking", "Blueberry"],
    favouritedByOwner: false,
    totalTime: 40,
    recipeYield: 4,
    recipeIngredient: [
      "100g unsalted butter softened, plus 1 tbsp, melted, for greasing",
      "140g golden caster sugar",
      "2 large eggs",
      "140g natural yogurt",
      "1 tsp vanilla extract",
      "2 tbsp milk",
      "250g plain flour",
      "2 tsp baking powder",
      "1 tsp bicarbonate of soda",
      "125g pack blueberries (or use frozen)",
    ],
    recipeInstructions: [
      "Heat oven to 200C/180C fan/gas 6 and line a 12-hole muffin tin with paper cases. Beat the butter and caster sugar together until pale and fluffy. Add the eggs and beat in for 1 min, then mix in the yogurt, vanilla extract and milk. Combine the flour, baking powder and bicarb in a bowl with ¼ tsp fine salt, then tip this into the wet ingredients and stir in. Finally, fold in the blueberries and divide the mixture between the muffin cases.",
      "Bake for 5 mins, then reduce oven to 180C/160C fan/gas 4 and bake for 15-18 mins more until risen and golden, and a cocktail stick inserted into the centre comes out clean.",
      "Cool in the tin for 10 mins, then carefully lift out onto a wire rack to finish cooling. Will keep for 3-4 days in an airtight container – after a day or two, pop them in the microwave for 10-15 secs on high to freshen up.",
    ],
    url: "https://www.bbcgoodfood.com/recipes/blueberry-muffin",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/blueberry-muffin-ee95fd4.jpg?resize=768,574",
    dateAdded: dateAdded,
  });

  beforeAll(async () => {
    await user.save();
    await recipe.save();
    token = createToken(user.id);
    console.log("token ----------------------", token);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns recipe data for that id", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      const recipeData = response.body.recipeData;

      expect(recipeData.name).toEqual("Easy blueberry muffins");
      expect(recipeData.description).toEqual(
        "Follow this easy blueberry muffins recipe for a fun weekend bake. You're just a few simple steps away from bite-sized blueberry treats"
      );
      expect(recipeData.ownerId).toEqual("65e1ed2534ba17d5e7b48f68");
      expect(recipeData.tags).toEqual(["Baking", "Blueberry"]);
      expect(recipeData.favouritedByOwner).toEqual(false);
      expect(recipeData.totalTime).toEqual(40);
      expect(recipeData.recipeYield).toEqual(4);
      expect(recipeData.recipeIngredient).toEqual([
        "100g unsalted butter softened, plus 1 tbsp, melted, for greasing",
        "140g golden caster sugar",
        "2 large eggs",
        "140g natural yogurt",
        "1 tsp vanilla extract",
        "2 tbsp milk",
        "250g plain flour",
        "2 tsp baking powder",
        "1 tsp bicarbonate of soda",
        "125g pack blueberries (or use frozen)",
      ]);
      expect(recipeData.recipeInstructions).toEqual([
        "Heat oven to 200C/180C fan/gas 6 and line a 12-hole muffin tin with paper cases. Beat the butter and caster sugar together until pale and fluffy. Add the eggs and beat in for 1 min, then mix in the yogurt, vanilla extract and milk. Combine the flour, baking powder and bicarb in a bowl with ¼ tsp fine salt, then tip this into the wet ingredients and stir in. Finally, fold in the blueberries and divide the mixture between the muffin cases.",
        "Bake for 5 mins, then reduce oven to 180C/160C fan/gas 4 and bake for 15-18 mins more until risen and golden, and a cocktail stick inserted into the centre comes out clean.",
        "Cool in the tin for 10 mins, then carefully lift out onto a wire rack to finish cooling. Will keep for 3-4 days in an airtight container – after a day or two, pop them in the microwave for 10-15 secs on high to freshen up.",
      ]);
      expect(recipeData.url).toEqual(
        "https://www.bbcgoodfood.com/recipes/blueberry-muffin"
      );
      expect(recipeData.image).toEqual(
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/blueberry-muffin-ee95fd4.jpg?resize=768,574"
      );
      expect(recipeData.dateAdded).toEqual("2024-03-04T00:00:00.000Z");
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.status).toEqual(401);
    });

    test("returns no recipe data", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.body.recipeData).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });
});
