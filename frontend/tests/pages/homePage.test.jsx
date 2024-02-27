import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";
import { expect } from "vitest";

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toEqual("Welcome to RecipEasy!");
    const searchbar = screen.getByPlaceholderText("Paste your URL here");
    expect(searchbar).toBeInTheDocument();
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    expect(generateRecipeBtn).toBeInTheDocument();
    const enterMaunallyBtn = screen.getByText("Enter Manually");
    expect(enterMaunallyBtn).toBeInTheDocument();
    const paragraph = screen.getByText("A place to store all your favourite recipes, from ones you find online to creating your own.")
    expect(paragraph).toBeInTheDocument()
  });

  // test("Displays a signup link", async () => {
  //   render(
  //     <BrowserRouter>
  //       <HomePage />
  //     </BrowserRouter>
  //   );

  //   const signupLink = screen.getByText("Sign Up");
  //   expect(signupLink.getAttribute("href")).toEqual("/signup");
  // });

  // test("Displays a login link", async () => {
  //   render(
  //     <BrowserRouter>
  //       <HomePage />
  //     </BrowserRouter>
  //   );

  //   const loginLink = screen.getByText("Log In");
  //   expect(loginLink.getAttribute("href")).toEqual("/login");
  // });
});
