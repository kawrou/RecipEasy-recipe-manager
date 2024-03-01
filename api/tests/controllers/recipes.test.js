const axios = require("axios");
const puppeteer = require("puppeteer");
const  RecipesController = require("../../controllers/recipes");

const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Recipe = require("../../models/recipe.js")
const User = require("../../models/user");


jest.mock("axios");
jest.mock("puppeteer");

describe("RecipesController", () => {
    it("should fetch recipe data successfully", async () => {
    const mockAxiosResponse = {
    data: "<html><body>Mock HTML content</body></html>",
    };

    axios.get.mockResolvedValueOnce(mockAxiosResponse);
    puppeteer.launch.mockResolvedValueOnce({
    newPage: jest.fn().mockResolvedValueOnce({
        goto: jest.fn().mockResolvedValueOnce(),
        $$eval: jest.fn().mockImplementation((selector, callback) => callback([])),
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

describe("GET - all recipes - when token is present", () => {
    test.todo("reponse code is 200", async () => {

    })
    it.todo("returns all recipes by userID", async () => {

    })
    it.todo("returns a new token", async () => {

    })
})

describe("GET - all recipes - when token is missing", () => {
    test.todo("response code is 401", async () => {

    })
    it("returns no posts", async () => {

    })
    it.todo("does not return a new token", async () => {
        
    })
})