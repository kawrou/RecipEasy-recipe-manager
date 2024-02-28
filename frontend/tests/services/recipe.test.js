import createFetchMock from "vitest-fetch-mock";
import { scrapeRecipe } from '../../src/services/recipe';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("recipe service", () => {
    describe("Scrape recipe GET request", () => {
        test("successful request returns data", async () => {
            const mockUrl = `${BACKEND_URL}/recipes/scrape-recipe`;


            fetch.mockResponseOnce(JSON.stringify({ recipeData: [], token: "newToken" }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });


            const result = await scrapeRecipe(mockUrl);


            expect(result.recipeData).toEqual([]);
            expect(result.token).toEqual("newToken");


            const fetchArguments = fetch.mock.lastCall;
            const url = fetchArguments[0];
            const options = fetchArguments[1];

            expect(url).toEqual(`${BACKEND_URL}/recipes/scrape-recipe?url=${encodeURIComponent(mockUrl)}`);
        });

        test("failed request throws an error", async () => {
            const mockUrl = `${BACKEND_URL}/recipes/scrape-recipe`;

            fetch.mockResponseOnce(JSON.stringify({ error: "Failed to fetch recipe" }), {
                status: 500, 
                headers: { 'Content-Type': 'application/json' },
            });
            await expect(scrapeRecipe(mockUrl)).rejects.toThrow("Unable to make GET request for fetch recipe");
        });
    });
});
