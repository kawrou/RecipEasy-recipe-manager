import { render, screen } from "@testing-library/react";
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

// describe("RENDERS", () => {
//   it("displays the correct elements", () => {
//     window.localStorage.setItem("token", "testToken");

//     render(<RecipeCollection />);

//     const h1 = screen.getByRole("heading", { level: 1 });
//     const paragraph = screen.getByTestId("searchBarDescription");
//     const searchBar = screen.getByPlaceholderText("Enter your recipe URL");
//     const generateRecipeBtn = screen.getByText("Generate Recipe");
//     const enterMaunallyBtn = screen.getByText("Enter Manually");
//     const h2 = screen.getByRole("heading", { level: 2 });

//     expect(h1).toBeInTheDocument();
//     expect(paragraph).toBeInTheDocument();
//     expect(searchBar).toBeInTheDocument();
//     expect(generateRecipeBtn).toBeInTheDocument();
//     expect(enterMaunallyBtn).toBeInTheDocument();
//     expect(h2).toBeInTheDocument();
//   });
// });

describe("BEHAVIOUR", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });
  const mockRecipes = [
    { _id: "12345", title: "Test Recipe 1", duration: "45" },
    { _id: "23456", title: "Test Recipe 2", duration: "35" },
  ];

  test("displays all the recipes a user has saved", async () => {
    window.localStorage.setItem("token", "testToken");
    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });

    render(<RecipeCollection />);

    expect(await screen.getByText("Test Recipe 1")).toBeVisible();
    // expect(await screen.getByText("45 mins")).toBeInTheDocument();
    // expect(await screen.getByText("Test Recipe 2")).toBeInTheDocument();
    // expect(await screen.getByText("35 mins")).toBeInTheDocument();
  });

  test.todo(
    "navigates to the 'Recipe Page' when 'Generate Recipe' button is clicked"
  );
  test.todo(
    "navigates to the 'Recipe Page' when 'Enter Manually' button is clicked"
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
