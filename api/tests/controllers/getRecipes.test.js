const request = require("supertest");
const JWT = require("jsonwebtoken");

const mongoose = require("mongoose");

const app = require("../../app");
const Recipe = require("../../models/recipe.js");
// const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

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

describe("Get Recipes tests", () => {
  //   beforeAll(async () => {
  //     const user = new User({
  //       email: "test@test.com",
  //       password: "12345678",
  //       username: "post-someone",
  //     });
  //     await user.save();
  //     await Recipe.deleteMany({});
  // const ownerId = "65e33479eb3dc95c1961d868";
  //   });
  const ownerId = new mongoose.Types.ObjectId();
  token = createToken(ownerId);
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
  beforeAll(async () => {
    await recipe1.save();
    await recipe2.save();
  });

  afterEach(async () => {
    await Recipe.deleteMany({});
  });

  describe("GET - all recipes - when token is present", () => {
    test.only("reponse code is 200", async () => {
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
  });

  describe.skip("GET - all recipes - when token is missing", () => {
    test.todo("response code is 401");
    it.todo("returns no posts");
    it.todo("does not return a new token");
  });
});
