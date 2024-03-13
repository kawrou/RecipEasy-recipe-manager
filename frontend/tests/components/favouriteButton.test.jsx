// import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FavouriteButton } from "../../src/components/RecipePage/FavouriteButton";
import * as recipeServices from "../../src/services/recipes";
import { vi, beforeEach } from "vitest";

// It should also send a Request to update the database on the fav status
// The test would need to mock 'toggleFavourite' and test on success and error
// localStorage gets in the way of tests. Cleared localStorage beforeEach()

describe("When a user clicks the button:", () => {
  beforeEach(() => {
    //I think this can be removed if FavouriteBtn is able to be refactored to use tokens and props.
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

    await user.click(favouriteBtn);
    await user.click(favouriteBtn);
    const regHeartIcon = screen.getByLabelText("reg-heart-icon");
    expect(regHeartIcon).toBeVisible();
  });
  

  test.skip("clicking favourite button toggles favourite status and changes the image", async () => {
    const { getByAltText } = render(<FavouriteButton />);
    const button = getByAltText("Unfavourite");

    fireEvent.click(button);

    // Wait for the state change to reflect in the button's alt attribute
    await waitFor(() => {
      expect(button.alt).toBe("Favourite");
    });

    fireEvent.click(button);

    // Wait for the state change to reflect in the button's alt attribute
    await waitFor(() => {
      expect(button.alt).toBe("Unfavourite");
    });
  });

  test.skip("favourite button changes image when favourited", () => {
    const { getByAltText } = render(<FavouriteButton />);
    const button = getByAltText("Unfavourite");

    fireEvent.click(button);
    expect(button.src).toContain("favourited.svg"); // Check if image changes to favourited
  });
});
