import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { HomePage } from "../../src/pages/Home/HomePage";
import { vi, expect, describe, test, beforeEach } from "vitest";
import { checkToken } from "../../src/services/authentication";
import RecipeScraper from "../../src/components/RecipeScraper";

// MOCKS
// Mock useNavigate to test useNavigate logic in isolation
// https://stackoverflow.com/questions/66284286/react-jest-mock-usenavigate & vitest env suggestion
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

const checkTokenMock = vi.fn();
const handleUrlChangeMock = vi.fn();
const handleScrapeRecipeMock = vi.fn();
const handleEnterManuallyMock = vi.fn();

// REUSABLE BITS OF CODE
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

// TESTS
describe("Home Page renders:", () => {
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

  test("url input correctly", () => {
    render(<HomePage url={"test-url"} />);
    const searchbar = screen.getByRole("textbox");
    expect(searchbar.value).toBe("test-url");
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
});
