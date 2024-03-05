import createFetchMock from "vitest-fetch-mock";
import * as recipeService from "../../src/services/recipes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("recipe service", () => {
  describe("Scrape recipe GET request", () => {
    //Test that when you send a request with a url and a token, you get back a new token and some data
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
});
