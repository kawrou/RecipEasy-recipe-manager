import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { expect } from "vitest";
import * as recipeService from "../../src/services/recipes.js";
import RecipeScraper from "../../src/components/RecipeScraper";

describe("Unit Test: RecipeScraper", () => {
  it("Renders elements", () => {
    render(
      <MemoryRouter>
        <RecipeScraper />
      </MemoryRouter>
    );

    const searchbar = screen.getByPlaceholderText("Enter your recipe url...");
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    const enterMaunallyBtn = screen.getByText("Enter Manually");

    expect(searchbar).toBeInTheDocument();
    expect(generateRecipeBtn).toBeInTheDocument();
    expect(enterMaunallyBtn).toBeInTheDocument();
  });

  test("Renders URL address string upon input", async () => {
    render(
      <MemoryRouter>
        <RecipeScraper />
      </MemoryRouter>
    );

    const searchbar = screen.getByPlaceholderText("Enter your recipe url...");
    await userEvent.type(searchbar, "test-url");
    expect(searchbar.value).toBe("test-url");
  });

  test.todo("scrapeRecipe func called when 'Generate Recipe' clicked", async () => {
    const scrapeRecipeSpy = vi.spyOn(recipeService, "scrapeRecipe");

    render(
      <MemoryRouter>
        <RecipeScraper url="test-url" token={"test-token"}/>
      </MemoryRouter>
    );

    const generateRecipeBtn = screen.getByText("Generate Recipe");
    await userEvent.click(generateRecipeBtn);

    expect(scrapeRecipeSpy).toHaveBeenCalledOnce();
    expect(scrapeRecipeSpy).toHaveBeenCalledWith("test-url");
  });

    test("scrapeRecipe func not called when empty URL", async () => {
      const scrapeRecipeSpy = vi.spyOn(recipeService, "scrapeRecipe");
  
      render(
        <MemoryRouter>
          <RecipeScraper />
        </MemoryRouter>
      );
  
      const generateRecipeBtn = screen.getByText("Generate Recipe");
      await userEvent.click(generateRecipeBtn);
  
      expect(scrapeRecipeSpy).not.toHaveBeenCalled();
    });
  });
