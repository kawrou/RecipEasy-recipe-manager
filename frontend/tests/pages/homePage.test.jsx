import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { HomePage } from "../../src/pages/Home/HomePage";
import { expect } from "vitest";
import * as recipeService from "../../src/services/recipes";
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
  const searchbar = screen.getByRole("textbox");
  const generateRecipeBtn = screen.getByRole("button", { name: "Generate" });
  await user.type(searchbar, url);
  await user.click(generateRecipeBtn);
};

const clickEnterManually = async () => {
  const user = userEvent.setup();
  const enterManuallyBtn = screen.getByRole("button", { name: "Manually" });
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
    const heading = screen.getByRole("heading", { level: 1 });
    const searchbar = screen.getByRole("textbox");
    const generateRecipeBtn = screen.getByRole("button", { name: "Generate" });
    const enterMaunallyBtn = screen.getByRole("button", { name: "Manually" });
    const pTagPageDescription = screen.getByLabelText("Page Instructions", {
      selector: "p",
    });

    expect(heading.textContent).toEqual("Recipeasy");
    expect(searchbar).toBeVisible();
    expect(generateRecipeBtn).toBeVisible();
    expect(enterMaunallyBtn).toBeVisible();
    expect(pTagPageDescription).toHaveTextContent(
      "Simply paste the URL of your favourite recipe page, " +
        "or manually input your cherished recipes, and watch as " +
        "Recipeasy effortlessly generates neatly organised recipes " +
        "for you to store and access anytime, anywhere."
    );
  });
});
describe("When a user is logged in and:", () => {
  test("enters a url, it appears on the screen", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    const searchbar = screen.getByRole("textbox");
    await user.type(searchbar, "Hello, world!");
    expect(searchbar.value).toBe("Hello, world!");
  });

  test("clicks generate a recipe, scrapeRecipe is called", async () => {
    // const scrapeRecipeSpy = vi.spyOn(recipeService, "scrapeRecipe");
    const handleUrlChangeMock = vi.fn();
    const handleScrapeRecipeMock = vi.fn();
    mockGetItem.mockReturnValueOnce(token);
    render(
      <BrowserRouter>
        <HomePage
          url={url}
          handleUrlChange={handleUrlChangeMock}
          handleScrapeRecipe={handleScrapeRecipeMock}
        />
      </BrowserRouter>
    );

    await clickGenerateRecipe();
    expect(handleScrapeRecipeMock).toHaveBeenCalledOnce();
    expect(mockUseNavigate).toHaveBeenCalledWith("/recipes/create");
  });

  //TODO: Test written, but code hasn't been implemented yet.
  test.todo(
    "clicks 'Enter Manually', they are redirected to the create recipe page",
    async () => {
      mockGetItem.mockReturnValueOnce(token);
      const handleUrlChangeMock = vi.fn();
      const handleScrapeRecipeMock = vi.fn();
      const handleEnterManuallyMock = vi.fn();
      render(
        <BrowserRouter>
          <HomePage
            url={url}
            handleUrlChange={handleUrlChangeMock}
            handleScrapeRecipe={handleScrapeRecipeMock}
            handleEnterManually={handleEnterManuallyMock}
          />
        </BrowserRouter>
      );

      await clickEnterManually();
      expect(handleEnterManuallyMock).toHaveBeenCalledOnce();
      expect(mockUseNavigate).toHaveBeenCalledWith("/recipes/create");
    }
  );
});

//TODO: Finish writing tests and implement code
describe.todo("When a user isn't logged in and", () => {
  test.todo("It navigates to login if no token is present", async () => {
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
    await userEvent.click(screen.getByText("Generate Recipe"));
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test.todo(
    "clicks 'Generate recipe', they are redirected to login page",
    async () => {
      // const scrapeRecipeSpy = vi.spyOn(scrapeRecipe, "scrapeRecipe");
      const handleUrlChangeMock = vi.fn();
      const handleScrapeRecipeMock = vi.fn();
      render(
        <BrowserRouter>
          <HomePage
            token={null}
            url={url}
            handleUrlChange={handleUrlChangeMock}
            handleScrapeRecipe={handleScrapeRecipeMock}
          />
        </BrowserRouter>
      );

      await clickGenerateRecipe();
      // expect(scrapeRecipeSpy).not.toHaveBeenCalled();
      expect(handleScrapeRecipeMock).not.toHaveBeenCalled();
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    }
  );

  test.todo(
    "clicks on the 'Enter Manually', they are redirected to login page",
    async () => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );

      await clickEnterManually();
      expect(mockUseNavigate).toHaveBeenCalledWith("/login");
    }
  );
});
