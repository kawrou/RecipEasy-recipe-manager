import { render, screen } from "@testing-library/react";
import { vi, expect, describe, test, beforeEach } from "vitest";
import { MyRecipesPage } from "../../../src/pages/MyRecipes/MyRecipesPage";
import { useFetchRecipes } from "../../../src/hooks/useFetchRecipe";

// MOCKS
// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock, Link: vi.fn() };
});

// Mocking useFetchRecipe
vi.mock("../../../src/hooks/useFetchRecipe");

// Mocking RecipeCard
vi.mock(
  "../../../src/components/Recipe/RecipeCard",
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

describe("My Recipes Page", () => {
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
