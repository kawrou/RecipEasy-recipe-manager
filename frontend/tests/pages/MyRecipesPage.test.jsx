import { render, screen} from "@testing-library/react";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { RecipeCollection } from "../../src/pages/MyRecipes/MyRecipesPage";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../src/hooks/useFetchRecipe";

// MOCKS
// Mocking the getRecipes service
vi.mock("../../src/services/recipes", () => {
  const getRecipesMock = vi.fn();
  return { getRecipes: getRecipesMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

vi.mock("../../src/hooks/useFetchRecipe");

const testToken = "testToken";
const setTokenMock = vi.fn();
const handleScrapeRecipeMock = vi.fn();

describe("Recipe collection", () => {
  describe("When a user is logged in:", () => {
    beforeEach(() => {
      window.localStorage.setItem("token", testToken);
    });

    afterEach(() => {
      window.localStorage.removeItem("token");
    });

    test("renders collection and recipes from db", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [
          { _id: "12345", title: "Recipe 1", duration: "45" },
          { _id: "23456", title: "Recipe 2", duration: "60" },
        ],
        loading: false,
        error: null,
      });

      render(<RecipeCollection token={testToken} setToken={setTokenMock} />);
      //Renders the elements
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Add a recipe"
      );
      expect(screen.getByLabelText("Scrape Input Description")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getByRole("button", { name: "Generate" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Manually" })).toBeVisible();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "My Recipes"
      );

      //This assertion might break onces the recipe card component is finished
      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      expect(screen.getByText("Recipe 1, 45 mins")).toBeVisible();
      expect(screen.getByText("Recipe 2, 60 mins")).toBeVisible();
    });

    test("renders a message when recipes is undefined", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: undefined,
        loading: false,
        error: null,
      });

      render(<RecipeCollection token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Add a recipe"
      );
      expect(screen.getByLabelText("Scrape Input Description")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getByRole("button", { name: "Generate" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Manually" })).toBeVisible();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "My Recipes"
      );

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      expect(screen.getByLabelText("Empty Recipes")).toHaveTextContent(
        "No recipes found"
      );
    });

    test("renders a message when recipes is an empty array", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(<RecipeCollection token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Add a recipe"
      );
      expect(screen.getByLabelText("Scrape Input Description")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getByRole("button", { name: "Generate" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Manually" })).toBeVisible();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "My Recipes"
      );

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      expect(screen.getByLabelText("Empty Recipes")).toHaveTextContent(
        "No recipes found"
      );
    });

    test("renders a loading message when loading is true", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: true,
        error: null,
      });

      render(<RecipeCollection token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Add a recipe"
      );
      expect(screen.getByLabelText("Scrape Input Description")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getByRole("button", { name: "Generate" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Manually" })).toBeVisible();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "My Recipes"
      );

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      expect(screen.getByLabelText("Loading message")).toHaveTextContent(
        "Loading ..."
      );
    });

    // TODO: Test might be false positive
    test("generate recipe btn navigates to recipe page", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <RecipeCollection
          token={testToken}
          setToken={setTokenMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );
      const navigateMock = useNavigate();
      await userEvent.type(screen.getByRole("textbox"), "test url");
      await userEvent.click(screen.getByRole("button", { name: "Generate" }));
      expect(handleScrapeRecipeMock).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalledWith("/recipes/create");
    });

    test("enter Manually btn navigates to recipe page", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <RecipeCollection
          token={testToken}
          setToken={setTokenMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );
      const navigateMock = useNavigate();
      await userEvent.click(screen.getByRole("button", { name: "Manually" }));
      expect(navigateMock).toHaveBeenCalledWith("/recipes/create");
    });
  });
  describe("When a user isn't logged in:", () => {
    test("It navigates to login if no token is present", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <RecipeCollection
          token={null}
          setToken={setTokenMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      );
      const navigateMock = useNavigate();
      await userEvent.click(screen.getByText("Generate Recipe"));
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });

  describe("When there is an error:", () => {
    test("navigates to /login when error is true", async () => {
      const navigateMock = useNavigate();
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: { message: "some error message" },
      });

      render(<RecipeCollection token={testToken} setToken={setTokenMock} />);

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      // expect(screen.getByText("Error: some error message")).toBeVisible();
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });
});
