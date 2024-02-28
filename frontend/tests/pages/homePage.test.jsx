import { render, screen} from "@testing-library/react";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { HomePage } from "../../src/pages/Home/HomePage";
import { expect } from "vitest";
import * as recipeScraper from "../../src/services/recipeScraper";
import { vi } from 'vitest'

//Mock useNavigate to test useNavigate logic in isolation
const mockUseNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockUseNavigate,
  }
}); 

const url = "some url"
const token = "test token"



describe("Home Page: When a user", () => {
  test("welcomes you to the site", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    const searchbar = screen.getByPlaceholderText("Paste your URL here");
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    const enterMaunallyBtn = screen.getByText("Enter Manually");
    const paragraph = screen.getByText("A place to store all your favourite recipes, from ones you find online to creating your own.")

    expect(heading.textContent).toEqual("Welcome to RecipEasy!");
    expect(searchbar).toBeInTheDocument();
    expect(generateRecipeBtn).toBeInTheDocument();
    expect(enterMaunallyBtn).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument()
  });

  test("Text entered into searchbar appears on screen.", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const user = userEvent.setup()
    const searchbar = screen.getByPlaceholderText("Paste your URL here");
    await user.type(searchbar, "Hello, world!");
    expect(searchbar.value).toBe("Hello, world!");
  })

  test("When a user generates a recipe, the page scrape function is called", async () => {
    // When button is clicked, our mocked function is called
    // Assert the function was called
    const scrapeRecipeSpy = vi.spyOn(recipeScraper, 'scrapeRecipe')
  
    render(
      <BrowserRouter>
        <HomePage token={token}/>
      </BrowserRouter>
    );
   
    const user = userEvent.setup()
    const searchbar = screen.getByPlaceholderText("Paste your URL here")
    const generateRecipeBtn = screen.getByText("Generate Recipe");
    await user.type(searchbar, url)
    await user.click(generateRecipeBtn);
    expect(scrapeRecipeSpy).toHaveBeenCalledOnce(); 
    expect(scrapeRecipeSpy).toHaveBeenLastCalledWith(url, token)
    expect(mockUseNavigate).toHaveBeenCalledWith('/signup')
  })

  test.todo("When a user is logged in and clicks on the 'Generate recipe' button, they are redirected to CreateRecipe page")
  
  test.todo("When a user isn't logged in and clicks on the 'Generate recipe' button, they are prompted to 'Sign Up'")

  test.todo("When a user is logged in and clicks on the 'Enter Manually' button, they are redirected to CreateRecipe page")
  
  test.todo("When a user isn't logged in and clicks on the 'Enter Manually' button, they are prompted to 'Sign Up'")
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
