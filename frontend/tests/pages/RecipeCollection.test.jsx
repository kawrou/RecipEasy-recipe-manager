import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { RecipeCollection } from "../../src/pages/RecipeCollection/RecipeCollection";
import { getRecipes } from "../../src/services/getRecipes";
import { useNavigate } from "react-router-dom";

// Mocking the getRecipes service
vi.mock("../../src/services/posts", () => {
  const getRecipesMock = vi.fn();
  return { getRecipes: getRecipesMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe.skip("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays recipes from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockRecipes = [{ _id: "12345", message: "Test Recipe 1" }];

    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });

    render(<RecipeCollection />);

    const recipe = await screen.findByRole("article");
    expect(recipe.textContent).toEqual("Test Recipe 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<RecipeCollection />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
