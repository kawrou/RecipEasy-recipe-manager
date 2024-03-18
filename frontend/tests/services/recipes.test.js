import createFetchMock from "vitest-fetch-mock";
import * as recipeService from "../../src/services/recipes";
import { vi, describe, test, expect } from "vitest";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

const mockToken = "test token";
const mockUrl = "www.testurl.com";
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
];

const updateRecipeData = [
  1234,
  "testName",
  "testDesription",
  ["testTag"],
  40,
  1,
  ["testIngredient"],
  ["testInstructions"],
  "testUrl",
  "testImageUrl",
];

const expectedPayload = {
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
  dateAdded: expect.any(String),
};

const responseDataMock = {
  _id: 1234,
  name: recipeData[0],
  description: recipeData[1],
  ownerId: "test user",
  tags: recipeData[2],
  favouritedByOwner: false,
  totalTime: recipeData[3],
  recipeYield: recipeData[4],
  recipeIngredient: recipeData[5],
  recipeInstructions: recipeData[6],
  url: recipeData[7],
  image: recipeData[8],
  dateAdded: new Date().toISOString(),
};

//TODO: Think about edgecases that may be worth testing for:
// Invalid URL (recipeID), invalid / missing token, empty response body?, network errors, response time-out

describe("recipe service", () => {
  describe("scrapeRecipe - GET req", () => {
    //Test that when you send a request with a url and a token, you get back a new token and some data
    test("request sent with correct URL, method, header, and body", async () => {
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
        headers: { Authorization: `Bearer ${mockToken}` },
      });
    });
    test("successful request returns data", async () => {
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
      fetch.mockResponseOnce(JSON.stringify({ token: "newToken" }), {
        status: 201,
      });

      await recipeService.createRecipe(mockToken, ...recipeData);

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
      const requestBody = JSON.parse(options.body);

      expect(url).toEqual(`${BACKEND_URL}/recipes/`);
      expect(options.method).toEqual("POST");
      expect(options.headers).toEqual({
        Authorization: `Bearer ${mockToken}`,
        "Content-Type": "application/json",
      });
      expect(requestBody).toEqual(expectedPayload);
    });

    test("successful request returns data and a token", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          message: "Recipe created successfully",
          recipe: responseDataMock,
          token: "newToken",
        }),
        {
          status: 201,
        }
      );

      const result = await recipeService.createRecipe(mockToken, ...recipeData);
      expect(result.recipe).toEqual(responseDataMock);
      expect(result.token).toEqual("newToken");
    });

    test("failed request throws an error", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );

      await expect(
        recipeService.createRecipe(mockToken, ...recipeData)
      ).rejects.toThrow("Error saving new recipe");
    });
  });
  describe("updateRecipe - PATCH req", () => {
    test("request sent with correct URL, method, header, and body", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          message: "Recipe updated successfully",
          token: "newToken",
        }),
        { response: 200 }
      );

      await recipeService.updateRecipe(mockToken, ...updateRecipeData);

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];
      const requestBody = JSON.parse(options.body);

      expect(url).toEqual(`${BACKEND_URL}/recipes/1234`);
      expect(options.method).toEqual("PATCH");
      expect(options.headers).toEqual({
        Authorization: `Bearer ${mockToken}`,
        "Content-Type": "application/json",
      });
      expect(requestBody).toEqual(expectedPayload);
    });
    test("successful request responds with a token", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          message: "Recipe updated successfully",
          token: "newToken",
        }),
        { response: 200 }
      );

      const result = await recipeService.updateRecipe(
        mockToken,
        ...updateRecipeData
      );
      expect(result.message).toEqual("Recipe updated successfully");
      expect(result.token).toEqual("newToken");
    });
    test("failed request throws an error", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
      await expect(
        recipeService.updateRecipe(mockToken, ...updateRecipeData)
      ).rejects.toThrow("Error updating recipe");
    });
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
