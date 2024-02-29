import { render, screen , waitFor} from "@testing-library/react";
import { vi } from "vitest";
import { UserEvent } from "@testing-library/user-event";
import { RecipeCollection } from "../../src/pages/RecipeCollection/RecipeCollection";
import { getRecipes } from "../../src/services/getRecipes";
import { useNavigate } from "react-router-dom";

// Mocking the getRecipes service
vi.mock("../../src/services/getRecipes", () => {
  const getRecipesMock = vi.fn();
  return { getRecipes: getRecipesMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Recipe Collection", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });
  const mockRecipes = [
    { _id: "12345", title: "Test Recipe 1", duration: "45" },
    { _id: "23456", title: "Test Recipe 2", duration: "35" },
  ];

  test("renders all elements and recipes from db", async () => {
    window.localStorage.setItem("token", "testToken");
    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });

    render(<RecipeCollection />);

    expect(screen.getByRole('heading', { level: 1})).toBeVisible();
    expect(screen.getByTestId('searchBarDescription')).toBeVisible();
    expect(screen.getByPlaceholderText('Enter your recipe URL')).toBeVisible();
    expect(screen.getByText('Generate Recipe')).toBeVisible();
    expect(screen.getByText("Enter Manually")).toBeVisible();
    expect(screen.getByRole('heading', { level: 2})).toBeVisible();  
    
    await waitFor(()=>{
      expect(screen.getByText("Test Recipe 1, 45 mins")).toBeVisible();
      // expect(screen.getByText("45 mins")).toBeVisible();
      expect(screen.getByText("Test Recipe 2, 35 mins")).toBeVisible();
      // expect(await screen.getByText("35 mins")).toBeInTheDocument();
    }); 
  });

  test.todo(
    "'Generate Recipe' button is clicked, navigates to the 'Recipe Page'"
  );
  test.todo(
    "'Enter Manually' button is clicked, navigates to the 'Recipe Page'"
  );
});













describe.skip("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test.skip("It displays recipes from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockRecipes = [{ _id: "12345", message: "Test Recipe 1" }];

    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });

    render(<RecipeCollection />);

    const recipe = await screen.findByRole("article");
    expect(recipe.textContent).toEqual("Test Recipe 1");
  });

  test.skip("It navigates to login if no token is present", async () => {
    render(<RecipeCollection />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});

// RENDER:
// should have a NavBar at the top
// Should have a h1 with "Add a recipe"
// Should have a <p> tag with "Enter a url for your favourite recipe"
// Should have an h2 tag with "My Recipes"

// BEHAVIOUR:
// Should be able to loop through a collection of saved recipes on the backend
// Display these recipes with card components in a grid using flex

// should navigate to Recipe page when 'Generate Recipe' is clicked
// should navigate to Recipe page when 'Enter Manually' is clicked
