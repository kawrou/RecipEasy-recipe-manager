import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import { expect } from "vitest";
import * as recipeService from "../../src/services/recipes.js";
import RecipeScraper from "../../src/components/RecipeScraper";
import { useNavigate } from "react-router-dom";

const handleUrlChangeMock = vi.fn();
const handleScrapeRecipeMock = vi.fn();

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Unit Test: RecipeScraper", () => {
  it("Renders elements", () => {
    render(
      <RecipeScraper
        url={null}
        handleUrlChange={handleUrlChangeMock}
        handleScrapeRecipe={handleScrapeRecipeMock}
      />
    );

    const searchbar = screen.getByRole("textbox");
    const generateRecipeBtn = screen.getByRole("button", { name: "Generate" });
    const enterMaunallyBtn = screen.getByRole("button", { name: "Manually" });

    expect(searchbar).toBeInTheDocument();
    expect(generateRecipeBtn).toBeInTheDocument();
    expect(enterMaunallyBtn).toBeInTheDocument();
  });

  //TODO: I think this test isn't correct
  test("Renders URL address string upon input", async () => {
    render(
      <RecipeScraper
        url={null}
        handleUrlChange={handleUrlChangeMock}
        handleScrapeRecipe={handleScrapeRecipeMock}
      />
    );

    const searchbar = screen.getByRole("textbox");
    await userEvent.type(searchbar, "test-url");
    expect(searchbar.value).toBe("test-url");
  });

  test("handleScrapeRecipe func called when 'Generate Recipe' clicked", async () => {
    const navigateMock = useNavigate();
    render(
      <RecipeScraper
        url="test-url"
        handleUrlChange={handleUrlChangeMock}
        handleScrapeRecipe={handleScrapeRecipeMock}
      />
    );

    const generateRecipeBtn = screen.getByRole("button", { name: "Generate" });
    await userEvent.click(generateRecipeBtn);

    expect(handleScrapeRecipeMock).toHaveBeenCalledOnce();
    expect(navigateMock).toHaveBeenCalled();
  });

  test("scrapeRecipe func not called when empty URL", async () => {
    const scrapeRecipeSpy = vi.spyOn(recipeService, "scrapeRecipe");

    render(
      <RecipeScraper
        url={null}
        handleUrlChange={handleUrlChangeMock}
        handleScrapeRecipe={handleScrapeRecipeMock}
      />
    );
    const generateRecipeBtn = screen.getByRole("button", { name: "Generate" });
    await userEvent.click(generateRecipeBtn);

    expect(scrapeRecipeSpy).not.toHaveBeenCalled();
  });

  // TODO: Enter Manually button not yet implemented
  test.todo("What happens when Enter Manually button is clicked?");
});
