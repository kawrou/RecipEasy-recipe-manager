const axios = require("axios");
const puppeteer = require("puppeteer");
const RecipesController = require("../../controllers/recipes.js");

// Need this for getRecipesByUserId test below, but commented out for now
// as there are some conflicts with the 'scape' tests. 

// const request = require("supertest");
// const JWT = require("jsonwebtoken");
// const mongoose = require("mongoose")
// const app = require("../../app");
// const Recipe = require("../../models/recipe.js");
// require("../mongodb_helper");
// const secret = process.env.JWT_SECRET;

// const createToken = (userId) => {
//   return JWT.sign(
//     {
//       user_id: userId,
//       // Backdate this token of 5 minutes
//       iat: Math.floor(Date.now() / 1000) - 5 * 60,
//       // Set the JWT token to expire in 10 minutes
//       exp: Math.floor(Date.now() / 1000) + 10 * 60,
//     },
//     secret
//   );
// };

// let token;

jest.mock("axios");
jest.mock("puppeteer");

// Test doesn't seem to be working
describe("RecipesController", () => {
  it("should fetch recipe data successfully", async () => {
    const mockAxiosResponse = {
      data: "<html><body>Mock HTML content</body></html>",
    };

    axios.get.mockResolvedValueOnce(mockAxiosResponse);
    puppeteer.launch.mockResolvedValueOnce({
      newPage: jest.fn().mockResolvedValueOnce({
        goto: jest.fn().mockResolvedValueOnce(),
        $$eval: jest
          .fn()
          .mockImplementation((selector, callback) => callback([])),
      }),
      close: jest.fn().mockResolvedValueOnce(),
    });

    const req = { query: { url: "https://example.com" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await RecipesController.fetchRecipeData(req, res);

    expect(axios.get).toHaveBeenCalledWith("https://example.com");
    // console.log(res.status)
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle network failure", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const req = { query: { url: "https://example.com" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await RecipesController.fetchRecipeData(req, res);

    expect(axios.get).toHaveBeenCalledWith("https://example.com");
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

//I think the below test can't work with the above test.
//I've written it here for now but placed it as skip so it won't run.
//I've created another test file that tests the route getRecipesByUserId.
//If it can't be run together, can delete the below tests. 
//Check out getRecipes.test.js to see test results.
describe.skip("Get Recipes tests", () => {
  const ownerId = new mongoose.Types.ObjectId();
  const currentDate = new Date();
  const recipe1 = new Recipe({
    name: "test_recipe",
    description: "test_description",
    ownerId: ownerId,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: "test_time",
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });
  const recipe2 = new Recipe({
    name: "test_recipe2",
    description: "test_description",
    ownerId: ownerId,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: "test_time",
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });

  const ownerId2 = new mongoose.Types.ObjectId();
  const recipe3 = new Recipe({
    name: "test_recipe3",
    description: "test_description",
    ownerId: ownerId2,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: "test_time",
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });

  beforeAll(async () => {
    await recipe1.save();
    await recipe2.save();
    await recipe3.save();
    token = createToken(ownerId);
  });

  afterAll(async () => {
    await Recipe.deleteMany({});
  });

  describe("GET - all recipes - when token is present", () => {
    test("reponse code is 200, returns a new token, recipes match userID and returned recipes are correct", async () => {
      const response = await request(app)
        .get(`/recipes/${ownerId}`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody = response.body;
      const newDecodedToken = JWT.decode(
        responseBody.token,
        process.env.JWT_SECRET
      );
      const oldDecodedToken = JWT.decode(token, process.env.JWT_SECRET);

      // Returns a token
      expect(newDecodedToken.iat > oldDecodedToken.iat).toEqual(true);

      // Response code is 200
      expect(response.status).toEqual(200);

      // Returned data is correct
      expect(responseBody).toHaveProperty("recipes");
      expect(responseBody.recipes.length).toBe(2);

      expect(responseBody.recipes[0]).toEqual(
        // In the test, we are comparing JSON data to a MongoDB object
        // Problem - comparing a date object, MongoDB's ObjectID to strings
        // .toObject is a Mongoose method and it can take the "transform" function.
        // Transform allows you to adjust how you want things to transform.
        // In this case, we are transforming objects to strings.
        // Transform takes two args which are 'doc' (the original document) &
        // 'ret'(return) which is what .toObject will return after the conversion.
        // In the below code, I'm changing the specific fields to strings.
        recipe1.toObject({
          transform: (doc, ret) => {
            ret.dateAdded = ret.dateAdded.toISOString();
            ret._id = ret._id.toString();
            ret.ownerId = ret.ownerId.toString();
          },
        })
      );
      expect(responseBody.recipes[1]).toEqual(
        recipe2.toObject({
          transform: (doc, ret) => {
            ret.dateAdded = ret.dateAdded.toISOString();
            ret._id = ret._id.toString();
            ret.ownerId = ret.ownerId.toString();
          },
        })
      );
    });
    test("Doesn't return the wrong recipe for the userID", async () => {
      const response = await request(app)
        .get(`/recipes/${ownerId}`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody = response.body;

      //Returned recipes are only for user1(ownerId)
      expect(responseBody.recipes[0].ownerId).toEqual(ownerId.toString());
      expect(responseBody.recipes[1].ownerId).toEqual(ownerId.toString());
      //Returned recipes don't belong to user2(ownerId2)
      expect(responseBody.recipes[0].ownerId).not.toEqual(ownerId2.toString());
      expect(responseBody.recipes[1].ownerId).not.toEqual(ownerId2.toString());
    });
  });

  describe("GET - all recipes - when token is missing", () => {
    test("response code is 401, returns no posts, and doesn't return a new token", async () => {
      const response = await request(app).get(`/recipes/${ownerId}`);

      expect(response.status).toEqual(401);
      expect(response.body.recipes).toEqual(undefined);
      expect(response.body.token).toEqual(undefined);
    });
  });
});
