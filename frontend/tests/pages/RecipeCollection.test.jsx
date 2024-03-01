import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { RecipeCollection } from "../../src/pages/RecipeCollection/RecipeCollection";
import { getRecipes } from "../../src/services/getRecipes";
import { useNavigate } from "react-router-dom";
import { useFetchRecipes } from "../../src/hooks/useFetchRecipe";

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

vi.mock("../../src/hooks/useFetchRecipe")

const mockRecipes = [
  { _id: "12345", title: "Test Recipe 1", duration: "45" },
  { _id: "23456", title: "Test Recipe 2", duration: "35" },
];

describe("Recipe Collection", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test.skip("renders all elements and recipes from db", async () => {
    window.localStorage.setItem("token", "testToken");
    getRecipes.mockResolvedValue({ recipes: mockRecipes, token: "newToken" });

    render(<RecipeCollection />);

    expect(screen.getByRole("heading", { level: 1 })).toBeVisible();
    expect(screen.getByTestId("searchBarDescription")).toBeVisible();
    expect(screen.getByPlaceholderText("Enter your recipe URL")).toBeVisible();
    expect(screen.getByText("Generate Recipe")).toBeVisible();
    expect(screen.getByText("Enter Manually")).toBeVisible();
    expect(screen.getByRole("heading", { level: 2 })).toBeVisible();

    await waitFor(() => {
      
      expect(screen.getByText("Test Recipe 1, 45 mins")).toBeVisible();
      // expect(screen.getByText("45 mins")).toBeVisible();
      expect(screen.getByText("Test Recipe 2, 35 mins")).toBeVisible();
      // expect(await screen.getByText("35 mins")).toBeInTheDocument();
    });
  });

  //Token handling for FETCH handled in useFetchRecipes hook
  test('renders collection and recipes from db', async () => {
    useFetchRecipes.mockReturnValue({
      recipes: [
        { _id: "12345", title: "Recipe 1", duration: "45" },
        { _id: "23456", title: "Recipe 2", duration: "60" },
      ],
      loading: false,
      error: null,
    });

    render(< RecipeCollection />);

    expect(screen.getByText("Recipe 1, 45 mins")).toBeVisible();
    expect(screen.getByText("Recipe 2, 60 mins")).toBeVisible();
  })

  test("Generate recipe btn navigates to recipe page", async () => {
    window.localStorage.setItem("token", "testToken");
    useFetchRecipes.mockReturnValue({
      recipes: [],
      loading: false,
      error: null,
    });
    
    render(<RecipeCollection />)
    const navigateMock = useNavigate();
    await userEvent.type(screen.getByPlaceholderText('Enter your recipe URL'), 'test url')
    await userEvent.click(screen.getByText('Generate Recipe'))
    expect(navigateMock).toHaveBeenCalledWith('/recipe')
  });

  test("Enter Manually btn navigates to recipe page", async () => {
    window.localStorage.setItem("token", "testToken");
    useFetchRecipes.mockReturnValue({
      recipes: [],
      loading: false,
      error: null,
    });

    render(<RecipeCollection />);
    const navigateMock = useNavigate();
    await userEvent.click(screen.getByText("Enter Manually"));
    expect(navigateMock).toHaveBeenCalledWith("/recipe");
  });

  test("It navigates to login if no token is present", async () => {
    useFetchRecipes.mockReturnValue({
      recipes: [],
      loading: false,
      error: null,
    });

    render(<RecipeCollection />);
    const navigateMock = useNavigate();
    await userEvent.click(screen.getByText('Generate Recipe'))
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});

