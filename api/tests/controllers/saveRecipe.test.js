// new recipe test file made because it was interfering with the other tests in recipes.test.js

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
describe("create recipe tests", () => {
    beforeAll(async () => {
        // add user
        const user = new User({
        email: "post-test@test.com",
        password: "12345678",
        username: "post-someone"
        });
        await user.save();
        await Recipe.deleteMany({});
        userid = user.id
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
                totalTime: "test_time",
                recipeYield: 1,
                recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
                recipeInstructions: ["test_instruction_one", "test_instruction_two"],
                url: "test_url",
                image: "test_url",
                dateAdded: currentDate
            });
        
        recipe = await Recipe.find();
});
    afterEach(async () => {
        await User.deleteMany({});
        await Recipe.deleteMany({})
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
                totalTime: "test_time",
                recipeYield: 1,
                recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
                recipeInstructions: ["test_instruction_one", "test_instruction_two"],
                url: "test_url",
                image: "test_url",
                dateAdded: currentDate
            });
            expect(updateResponse.status).toEqual(200);
            const updateRecipe = await Recipe.find();
            expect(updateRecipe.length).toEqual(1);
            expect(updateRecipe[0].name).toEqual("test_update");
        });
    })
})
