import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { vi } from "vitest";
import { expect } from "vitest";
import * as scrapeRecipe from "../../src/services/recipe";
import RecipeScraper from "../../src/components/RecipeScraper";

describe("Unit Test: RecipeScraper", () => {
  it("Renders elements", () => {
    render(<RecipeScraper />);

    const searchbar = screen.getByPlaceholderText("Enter your recipe URL");
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    const enterMaunallyBtn = screen.getByText("Enter Manually");

    expect(searchbar).toBeInTheDocument();
    expect(generateRecipeBtn).toBeInTheDocument();
    expect(enterMaunallyBtn).toBeInTheDocument();
  });

  test("Renders URL address string upon input", async () => {
    render(<RecipeScraper />);

    const searchbar = screen.getByPlaceholderText("Enter your recipe URL");
    await userEvent.type(searchbar, "test-url");
    expect(searchbar.value).toBe("test-url");
  });

  test("scrapeRecipe func called when 'Generate Recipe' clicked", async () => {
    const scrapeRecipeSpy = vi.spyOn(scrapeRecipe, "scrapeRecipe");

    render(<RecipeScraper url="test-url" token={"test-token"} />);

    const generateRecipeBtn = screen.getByText("Generate Recipe");
    await userEvent.click(generateRecipeBtn);

    expect(scrapeRecipeSpy).toHaveBeenCalledOnce();
    expect(scrapeRecipeSpy).toHaveBeenCalledWith("test-url");
  });

  test("scrapeRecipe func not called when empty URL", async () => {
    const scrapeRecipeSpy = vi.spyOn(scrapeRecipe, "scrapeRecipe");

    render(<RecipeScraper />);

    const generateRecipeBtn = screen.getByText("Generate Recipe");
    await userEvent.click(generateRecipeBtn);

    expect(scrapeRecipeSpy).not.toHaveBeenCalled();
  });
});
