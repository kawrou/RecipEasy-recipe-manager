import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { HomePage } from "../../src/pages/Home/HomePage";
import { expect } from "vitest";
import * as scrapeRecipe from "../../src/services/recipe";
import { vi } from "vitest";

//Mock useNavigate to test useNavigate logic in isolation
//https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate & vitest env suggestion
const mockUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  };
});

//Mock setting token in window.localStorage
const mockGetItem = vi.fn();
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: mockGetItem,
  },
  writable: true,
});

// Reusable bits of code
const url = "some url";
const token = "test token";

const clickGenerateRecipe = async () => {
  const user = userEvent.setup();
  const searchbar = screen.getByPlaceholderText("Enter your recipe URL");
  const generateRecipeBtn = screen.getByText("Generate Recipe");
  await user.type(searchbar, url);
  await user.click(generateRecipeBtn);
};

const clickEnterManually = async () => {
  const user = userEvent.setup();
  const enterManuallyBtn = screen.getByText("Enter Manually");
  await user.click(enterManuallyBtn);
};

describe("Home Page renders:", () => {
  beforeEach(() => {
    // window.localStorage.removeItem("token");
    vi.resetAllMocks();
  });

  test("the correct elements", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const heading = screen.getByRole("heading");
    const searchbar = screen.getByPlaceholderText("Enter your recipe URL");
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    const enterMaunallyBtn = screen.getByText("Enter Manually");
    const paragraph = screen.getByText(
      "A place to store all your favourite recipes, from ones you find online to creating your own."
    );

    expect(heading.textContent).toEqual("RecipEasy");
    expect(searchbar).toBeInTheDocument();
    expect(generateRecipeBtn).toBeInTheDocument();
    expect(enterMaunallyBtn).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
  test.todo("Handles when a user has no recipes saved")
}); 
describe("When a user:", () => {
  test("enters a url, it appears on the screen", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const searchbar = screen.getByPlaceholderText("Enter your recipe URL");
    await user.type(searchbar, "Hello, world!");
    expect(searchbar.value).toBe("Hello, world!");
  });

  test("clicks generate a recipe, scrapeRecipe is called", async () => {
    const scrapeRecipeSpy = vi.spyOn(scrapeRecipe, "scrapeRecipe");
    mockGetItem.mockReturnValueOnce(token);
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await clickGenerateRecipe();
    expect(scrapeRecipeSpy).toHaveBeenCalledOnce();
    // expect(scrapeRecipeSpy).toHaveBeenLastCalledWith(url, token)
    expect(scrapeRecipeSpy).toHaveBeenCalledWith(url);
    expect(mockUseNavigate).toHaveBeenCalledWith("/recipes");
  });

  test("clicks 'Generate recipe', they are redirected to login page if not logged in", async () => {
    const scrapeRecipeSpy = vi.spyOn(scrapeRecipe, "scrapeRecipe");
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await clickGenerateRecipe();
    expect(scrapeRecipeSpy).not.toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  });

  test("clicks 'Enter Manually', they are redirected to CreateRecipe page if logged in", async () => {
    mockGetItem.mockReturnValueOnce(token);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await clickEnterManually();
    expect(mockUseNavigate).toHaveBeenCalledWith("/recipes");
  });

  test("clicks on the 'Enter Manually', they are redirected to login page if not logged in", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await clickEnterManually();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
  });
});
