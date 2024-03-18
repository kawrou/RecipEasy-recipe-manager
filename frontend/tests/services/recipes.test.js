import createFetchMock from "vitest-fetch-mock";
import * as recipeService from "../../src/services/recipes";
import { vi, describe, test, expect } from "vitest";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

const mockDate = new Date().toISOString();
const recipeData = [
  "testName",
  "testDesription",
  ["testTag"],
  40,
  1,
  ["testIngredient"],
  ["testInstructions"],
  "testUrl",
  "testImageUrl",
  mockDate
];

const recipeObj = {
  name: recipeData[0],
  description: recipeData[1],
  tags: recipeData[2],
  favouritedByOwner: false, 
  totalTime: recipeData[3],
  recipeYield: recipeData[4],
  recipeIngredient: recipeData[5],
  recipeInstructions: recipeData[6],
  url: recipeData[7],
  image: recipeData[8],
  dateAdded: mockDate,
}

//TODO: Think about edgecases that may be worth testing for:
// Invalid URL (recipeID), invalid / missing token, empty response body?, network errors, response time-out

describe("recipe service", () => {
  describe("scrapeRecipe - GET req", () => {
    //Test that when you send a request with a url and a token, you get back a new token and some data
    test("request sent with correct URL, method, header, and body", async () => {
      //TODO: Need to change this line of code
      const mockUrl = `${BACKEND_URL}/recipes/scrape-recipe`;
      const mockToken = "test token";
      fetch.mockResponseOnce(
        JSON.stringify({ recipeData: [], token: "newToken" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

      await recipeService.scrapeRecipe(mockUrl, mockToken);

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(
        `${BACKEND_URL}/recipes/scrape-recipe?url=${encodeURIComponent(
          mockUrl
        )}`
      );
      expect(options).toEqual({
        method: "GET",
        headers: { Authorization: "Bearer test token" },
      });
    });
    test("successful request returns data", async () => {
      const mockUrl = `${BACKEND_URL}/recipes/scrape-recipe`;
      const mockToken = "test token";
      fetch.mockResponseOnce(
        JSON.stringify({ recipeData: [], token: "newToken" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await recipeService.scrapeRecipe(mockUrl, mockToken);

      expect(result.recipeData).toEqual([]);
      expect(result.token).toEqual("newToken");
    });

    test("failed request throws an error", async () => {
      const mockUrl = `${BACKEND_URL}/recipes/scrape-recipe`;

      fetch.mockResponseOnce(
        JSON.stringify({ error: "Failed to fetch recipe" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
      await expect(recipeService.scrapeRecipe(mockUrl)).rejects.toThrow(
        "Unable to make GET request for fetch recipe"
      );
    });
  });
  describe("createRecipe - POST req", () => {
    //Will need to send a mocked Recipe and mock the response recipe which is a Mongo object?
    test("request sent with correct URL, method, header, and body", async () => {
      const mockToken = "test token";

      fetch.mockResponseOnce(JSON.stringify({ token: "newToken" }), {
        status: 201,
      });

      await recipeService.createRecipe(mockToken, ...recipeData);

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
      console.log(options);
      expect(url).toEqual(`${BACKEND_URL}/recipes/`);
      expect(options).toEqual({
        method: "POST",
        headers: {
          Authorization: "Bearer test token",
          "Content-Type": "application/json",
          body: JSON.stringify(recipeObj),
        },
      });
    });
    test.todo("successful request responds with 201 and a token");
    test.todo("failed request throws an error");
  });
  describe("updateRecipe - PATCH req", () => {
    test.todo("request sent with correct URL, method, header, and body");
    test.todo("successful request responds with 200 and a token");
    test.todo("failed request throws an error");
  });
  describe("getRecipeById - GET req", () => {
    test.todo("request sent with correct URL, method, header, and body");
    test.todo("succesful request responds with 200, token and data");
    test.todo("failed request throws an error");
  });
  describe("toggleFavourite - PATCH req", () => {
    test.todo("request sent with correct URL, method, header, and body");
    test.todo("succesful request responds with 200 and a token");
    test.todo("failed request throws an error");
  });
  describe("getAllRecipes - GET req", () => {
    test.todo("request sent with correct URL, method, header, and body");
    test.todo("succesful request responds with 200, token and data");
    test.todo("failed request throws an error");
  });
});
