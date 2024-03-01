// new recipe test file made because it was interfering with the other tests in recipes.test.js

const app = require("../../app");
const Recipe = require("../../models/recipe");
const User = require("../../models/user");
const request = require("supertest");
const JWT = require("jsonwebtoken");
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
describe("create recipe tests", () => {
    beforeAll(async () => {
        const user = new User({
        email: "post-test@test.com",
        password: "12345678",
        username: "post-someone"
        });
        await user.save();
        await Recipe.deleteMany({});
        token = createToken(user.id);
});
    afterEach(async () => {
        await User.deleteMany({});
        await Recipe.deleteMany({});
});

    describe("POST, when a valid token is present and recipe input is valid", () => {
        test("responds with a 201, new recipe is present in the document", async () => {
            const currentDate = new Date();
            const response = await request(app)
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
        expect(response.status).toEqual(201);
        const recipe = await Recipe.find();
        expect(recipe.length).toEqual(1);
        expect(recipe[0].name).toEqual("test_recipe");
        });
    })

    // describe("update recipe tests", () => {
    //     test("responds with a 201, updated recipe is present in the document", async () => {
    //         const currentDate = new Date();
    //         const response = await request(app)
    //             .post("/recipes/65e200e7558fd7c8ad317019")
    //             .set("Authorization", `Bearer ${token}`)
    //             .send({
    //                 name: "test_recipe",
    //                 description: "test_description",
    //                 ownerId: token.user_id,
    //                 tags: ["test_tag_one", "test_tag_two"],
    //                 favouritedByOwner: false,
    //                 totalTime: "test_time",
    //                 recipeYield: 1,
    //                 recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    //                 recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    //                 url: "test_url",
    //                 image: "test_url",
    //                 dateAdded: currentDate
    //             });
    //     expect(response.status).toEqual(201);
    //     const recipe = await Recipe.find();
    //     expect(recipe.length).toEqual(1);
    //     expect(recipe[0].name).toEqual("test_recipe");
    //     });
    // })
})
