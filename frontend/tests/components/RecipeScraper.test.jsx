import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi, describe, it, test, beforeEach } from "vitest";
import { expect } from "vitest";
import * as recipeService from "../../src/services/recipes.js";
import RecipeScraper from "../../src/components/RecipeScraper";
import * as authenticationServices from "../../src/services/authentication";
import { useNavigate } from "react-router-dom";

const handleUrlChangeMock = vi.fn();
const handleScrapeRecipeMock = vi.fn();
const setRecipeDataMock = vi.fn();
const setUrlMock = vi.fn();

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Unit Test: RecipeScraper", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe("Page elements:", () => {
    it("All rendered", () => {
      render(
        <RecipeScraper
          url={""}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );

      const scrapeBar = screen.getByRole("textbox");
      const scrapeBarText = screen.getByPlaceholderText(
        "Enter your recipe url..."
      );
      const generateRecipeBtn = screen.getByRole("button", {
        name: "Generate",
      });
      const enterMaunallyBtn = screen.getByRole("button", { name: "Manually" });

      expect(scrapeBar).toBeVisible();
      expect(scrapeBarText).toBeVisible();
      expect(generateRecipeBtn).toBeVisible();
      expect(enterMaunallyBtn).toBeVisible();
    });

    //I was confused how you would test onChange, but realized it isn't this components
    //responsiblity to handle the state. That should be tested in the parent component. \
    test("url prop is rendered correctly", () => {
      render(<RecipeScraper url={"test-url"} />);

      const searchbar = screen.getByRole("textbox");
      expect(searchbar.value).toEqual("test-url");
    });
    test("Calls onChange handler when user inputs url", async () => {
      render(
        <RecipeScraper
          url={""}
          setUrl={setUrlMock}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
          setRecipeData={setRecipeDataMock}
        />
      );

      const searchbar = screen.getByRole("textbox");
      await userEvent.type(searchbar, "test-url");
      expect(handleUrlChangeMock).toHaveBeenCalledTimes(8);
    });
  });
  describe("Generate Recipe button", () => {
    test("when token is valid, url is inputted, it navigates to create page", async () => {
      // handleClick -> checkToken -> handleScrapeRecipe -> navigate("/recipes/create")
      vi.spyOn(authenticationServices, "checkToken").mockResolvedValue(true);
      const navigateMock = useNavigate();
      render(
        <RecipeScraper
          url="test-url"
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );

      const generateRecipeBtn = screen.getByRole("button", {
        name: "Generate",
      });
      await userEvent.click(generateRecipeBtn);

      expect(handleScrapeRecipeMock).toHaveBeenCalledOnce();
      expect(navigateMock).toHaveBeenCalledWith("/recipes/create");
    });

    //TODO: Our code doesn't stop us from calling handleScrapeRecipe when URL is empty
    // Currently it navigates us to recipes/create with an empty page, 
    // just like if we clicked "Enter Manually".
    // If we don't want to handle that in our frontend code, then change the assertion
    // of this test to expect it to navigate to recipes/create
    test.todo("scrapeRecipe func not called when empty URL", async () => {
      // const scrapeRecipeSpy = vi.spyOn(recipeService, "scrapeRecipe");
      const navigateMock = useNavigate();
      render(
        <RecipeScraper
          url={""}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );
      const generateRecipeBtn = screen.getByRole("button", {
        name: "Generate",
      });
      await userEvent.click(generateRecipeBtn);

      //Option 1:
      // expect(handleScrapeRecipeMock).not.toHaveBeenCalled();
      // expect(navigateMock).not.toHaveBeenCalled();
      
      //Option 2:
      // expect(handleScrapeRecipeMock).toHaveBeenCalled();
      // expect(navigateMock).toHaveBeenCalledWith("/recipes/create")
    });
  });
  describe("Enter Manually button", () => {
    test("Enter Manually button navigates to create recipe page", async () => {
      vi.spyOn(authenticationServices, "checkToken").mockResolvedValue(true);
      const navigateMock = useNavigate();

      render(
        <RecipeScraper
          url={""}
          setUrl={setUrlMock}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
          setRecipeData={setRecipeDataMock}
        />
      );

      const enterMaunallyBtn = screen.getByRole("button", { name: "Manually" });
      await userEvent.click(enterMaunallyBtn);

      expect(handleScrapeRecipeMock).not.toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith("/recipes/create");
    });
  });
  describe("Handles errors", () => {
    //The following test would print "auth-error" to the terminal as our handleclick
    //function catches errors and prints them.
    test("If token is invalid, it navigates to login page", async () => {
      const tokenValidationError = new Error ("auth-error");
      tokenValidationError.response= {status: 401}
      vi.spyOn(authenticationServices, "checkToken").mockRejectedValue(tokenValidationError);
      const navigateMock = useNavigate(); 

      render(
        <RecipeScraper
          url={'test-url'}
          setUrl={setUrlMock}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
          setRecipeData={setRecipeDataMock}
        />
      )
      const generateRecipeBtn = screen.getByRole("button", {name: "Generate"}); 
      await userEvent.click(generateRecipeBtn)
      
      expect(handleScrapeRecipeMock).not.toHaveBeenCalled(); 
      expect(navigateMock).toHaveBeenCalledWith("/login")
    })
  })
});
