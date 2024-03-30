import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, vi } from "vitest";
import Navbar from "../../src/components/Navbar";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { HomePage } from "../../src/pages/Home/HomePage";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { expect } from "vitest";
import { MyRecipesPage } from "../../src/pages/MyRecipes/MyRecipesPage";

const user = userEvent.setup();

vi.mock("../../src/hooks/useFetchRecipe", () => {
  const useFetchRecipesMock = vi.fn().mockReturnValue({
    recipes: [],
    loading: true,
    error: null,
    fetchRecipes: vi.fn(),
  });
  return { useFetchRecipes: useFetchRecipesMock };
});

const setTokenMock = vi.fn();

describe("Navbar", () => {
  describe("When a user is not logged in and on the Home Page:", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </MemoryRouter>
      );
    });

    test("'logo' navigates to home page", async () => {
      const logoEl = screen.getByAltText("Recipeasy Homepage Logo Link");
      await user.click(logoEl);

      expect(window.location.pathname).toBe("/");
      expect(logoEl).toBeVisible();

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });

    test("'Log In' button navigates to login page", async () => {
      const logInBtnEl = screen.getByRole("link", { name: "Log in" });
      await user.click(logInBtnEl);

      const headingEl = screen.getByRole("heading", {
        name: "Log in to your account",
      });
      expect(headingEl).toBeVisible();
    });

    test("'Sign Up' button navigates to signup page", async () => {
      const signUpBtnEl = screen.getByRole("link", { name: "Sign Up" });
      await user.click(signUpBtnEl);

      const headingEl = screen.getByRole("heading", {
        name: "Create an account",
      });
      expect(headingEl).toBeVisible();
    });
  });
  describe("When a user is logged in and on the Home Page:", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Navbar isLoggedIn={true} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/myrecipes" element={<MyRecipesPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    test("'logo' navigates to Home Page", async () => {
      const logoEl = screen.getByAltText("Recipeasy Homepage Logo Link");
      await user.click(logoEl);

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });
    test("'My Recipes' button navigates to My Recipes page", async () => {
      const myRecipesBtn = screen.getByRole("link", { name: "My Recipes" });
      await user.click(myRecipesBtn);

      const h2El = screen.getByRole("heading", { level: 2 });
      expect(h2El).toBeVisible();
    });
    test("'Log Out' button is visible and navigates to Home Page", async () => {
      const logOutBtnEl = screen.getByRole("link", { name: "Log Out" });
      await user.click(logOutBtnEl);

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });
    test("'Sign Up' isn't rendered", () => {
      const signUpBtnEl = screen.queryByRole("link", { name: "Sign Up" });
      expect(signUpBtnEl).not.toBeInTheDocument();
    });
  });

  describe("When a user is on the Sign Up page:", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/signup"]}>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    test("Navbar elements aren't rendered", () => {
      const logoEl = screen.queryByAltText("Recipeasy Homepage Logo Link");
      const logInLinkEl = screen.queryByRole("link", { name: "Log in" });
      const signUpLinkEl = screen.queryByRole("link", { name: "Sign Up" });

      expect(logoEl).not.toBeInTheDocument();
      expect(logInLinkEl).not.toBeInTheDocument();
      expect(signUpLinkEl).not.toBeInTheDocument();
    });
  });

  describe("When a user is on the Log In page:", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      );
    });
    test("Navbar elements aren't rendered", () => {
      const logoEl = screen.queryByAltText("Recipeasy Homepage Logo Link");
      const logInLinkEl = screen.queryByRole("link", { name: "Log in" });
      const signUpLinkEl = screen.queryByRole("link", { name: "Sign Up" });

      expect(logoEl).not.toBeInTheDocument();
      expect(logInLinkEl).not.toBeInTheDocument();
      expect(signUpLinkEl).not.toBeInTheDocument();
    });
  });

  describe("When a user is on their My Recipes page:", () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={["/myrecipes"]}>
          <Navbar isLoggedIn={true} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/myrecipes"
              element={
                <MyRecipesPage token={"testToken"} setToken={setTokenMock} />
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      );
    });

    test("'logo' navigates to Home Page", async () => {
      const logoEl = screen.getByAltText("Recipeasy Homepage Logo Link");
      await user.click(logoEl);

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });

    test("'Home' button navigates to Home Page", async () => {
      const homeLinkEl = screen.getByRole("link", { name: "Home" });
      await user.click(homeLinkEl);

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });

    test("'My Recipes' button navigates to My Recipes page", async () => {
      const myRecipesLinkEl = screen.getByRole("link", { name: "My Recipes" });
      await user.click(myRecipesLinkEl);

      const headingEl = screen.getByRole("heading", { name: "logo ecipeasy" });
      expect(headingEl).toBeVisible();
    });

    test("'Log Out' button is visible and navigates to Home Page", async () => {
      const logOutLinkEl = screen.getByRole("link", { name: "Log Out" });
      await user.click(logOutLinkEl);

      const headingEl = screen.getByRole("heading", { name: "Recipeasy" });
      expect(headingEl).toBeVisible();
    });
  });
});
