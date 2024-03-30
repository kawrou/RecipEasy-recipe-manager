import { render, screen } from "@testing-library/react";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { MyRecipesPage } from "../../src/pages/MyRecipes/MyRecipesPage";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../src/hooks/useFetchRecipe";
import RecipeCard from "../../src/components/Recipe/RecipeCard";

// MOCKS
// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock, Link: vi.fn() };
});

// Mocking useFetchRecipe
vi.mock("../../src/hooks/useFetchRecipe");

// Mocking RecipeCard
vi.mock(
  "../../src/components/Recipe/RecipeCard",
  () => (
    console.log("MyRecipesPage- Unit Tesst: RecipeCard mock called"),
    {
      default: ({ recipe }) => (
        <div>
          <h2>{recipe.title}</h2>
          <p data-testid="recipe duration">{recipe.duration}</p>
        </div>
      ),
    }
  )
);

// Other Mocks
const testToken = "testToken";
const setTokenMock = vi.fn();
const handleScrapeRecipeMock = vi.fn();

describe("Recipe collection", () => {
  describe("When a user is logged in:", () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });
    
    test("renders collection and recipes from db", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [
          { _id: "12345", title: "Recipe 1", duration: "45" },
          { _id: "23456", title: "Recipe 2", duration: "60" },
        ],
        loading: false,
        error: null,
        fetchRecipes: vi.fn(),
      });

      render(<MyRecipesPage token={testToken} setToken={setTokenMock} />);

      //Renders the elements
      const h1El = screen.getByRole("heading", {
        level: 1,
        name: "logo ecipeasy",
      });
      const h2El = screen.getByRole("heading", {
        level: 2,
        name: "My Recipes",
      });

      expect(h1El).toHaveTextContent("ecipeasy");
      expect(h1El).toBeVisible();
      expect(h2El).toBeVisible();

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);

      const recipeTitles = screen.getAllByRole("heading", { level: 2 });
      const recipeDurations = screen.getAllByTestId("recipe duration");

      expect(recipeTitles[1]).toHaveTextContent("Recipe 1");
      expect(recipeTitles[2]).toHaveTextContent("Recipe 2");
      expect(recipeDurations[0]).toHaveTextContent("45");
      expect(recipeDurations[1]).toHaveTextContent("60");
    });

    test("renders a message when recipes is undefined", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: undefined,
        loading: false,
        error: null,
        fetchRecipes: vi.fn(),
      });

      render(<MyRecipesPage token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "ecipeasy"
      );

      expect(screen.getByLabelText("Empty Recipes")).toHaveTextContent(
        "No recipes found"
      );
    });

    test("renders a message when recipes is an empty array", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
        fetchRecipes: vi.fn(),
      });

      render(<MyRecipesPage token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "ecipeasy"
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
        fetchRecipes: vi.fn(),
      });

      render(<MyRecipesPage token={testToken} setToken={setTokenMock} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "ecipeasy"
      );
      // expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      expect(screen.getByLabelText("Loading message")).toHaveTextContent(
        "Loading ..."
      );
    });
  });

  describe.skip("Navigation", () => {
    // TODO: Test might be false positive
    // The following are more like integration tests as they involve other pages
    // More of an integration test
    test("generate recipe btn navigates to recipe page", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <MyRecipesPage
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

    //More of an integration test
    test("enter Manually btn navigates to recipe page", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <MyRecipesPage
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

  //More of an integration test
  describe.skip("When a user isn't logged in:", () => {
    test("It navigates to login if no token is present", async () => {
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: null,
      });

      render(
        <MyRecipesPage
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

  //More of an integration test
  describe.skip("When there is an error:", () => {
    test("navigates to /login when error is true", async () => {
      const navigateMock = useNavigate();
      useFetchRecipes.mockReturnValue({
        recipes: [],
        loading: false,
        error: { message: "some error message" },
      });

      render(<MyRecipesPage token={testToken} setToken={setTokenMock} />);

      expect(useFetchRecipes).toHaveBeenCalledWith(testToken, setTokenMock);
      // expect(screen.getByText("Error: some error message")).toBeVisible();
      expect(navigateMock).toHaveBeenCalledWith("/login");
    });
  });
});
