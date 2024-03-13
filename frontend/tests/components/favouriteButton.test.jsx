import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FavouriteButton } from "../../src/components/RecipePage/FavouriteButton";
import * as recipeServices from "../../src/services/recipes";
import { vi, beforeEach } from "vitest";



describe("When a user clicks the button:", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
  });

  test("unfavourited becomes favourited", async () => {
    const user = userEvent.setup();
    vi.spyOn(recipeServices, "toggleFavourite").mockResolvedValue();
    render(<FavouriteButton />);

    const favouriteBtn = screen.getByRole("button", {
      name: "favourite-button",
    });
    expect(screen.getByLabelText("reg-heart-icon")).toBeVisible();
    await user.click(favouriteBtn);
    expect(screen.getByLabelText("heart-icon")).toBeVisible();
  });

  test("favourited becomes unfavourited", async () => {
    const user = userEvent.setup();
    vi.spyOn(recipeServices, "toggleFavourite").mockResolvedValue();
    render(<FavouriteButton />);

    const favouriteBtn = screen.getByRole("button", {
      name: "favourite-button",
    });

    await user.dblClick(favouriteBtn);
    const regHeartIcon = screen.getByLabelText("reg-heart-icon");
    expect(regHeartIcon).toBeVisible();
  });

  test("heart icon doesn't toggle if there is an error", async () => {
    const user = userEvent.setup();
    vi.spyOn(recipeServices, "toggleFavourite").mockRejectedValue();
    render(<FavouriteButton />);

    const favouriteBtn = screen.getByRole("button", {
      name: "favourite-button",
    });

    await user.click(favouriteBtn);
    expect(screen.queryByLabelText("heart-icon")).not.toBeInTheDocument();
    expect(screen.getByLabelText("reg-heart-icon")).toBeVisible();
  });

  test("errors are logged to the console", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, "error");
    const error = new Error("Toggle favourite failed");

    vi.spyOn(recipeServices, "toggleFavourite").mockRejectedValue(error);

    render(<FavouriteButton />);

    const favouriteBtn = screen.getByRole("button", {
      name: "favourite-button",
    });

    await user.click(favouriteBtn);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to toggle Favourite button",
      error
    );
  });
});
