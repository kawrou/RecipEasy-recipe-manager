import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, vi } from "vitest";
import Navbar from "../../src/components/Navbar";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { HomePage } from "../../src/pages/Home/HomePage";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { expect } from "vitest";

const user = userEvent.setup();

// const initialRoutingState = {
//   initialEntries: ["/"], // Set initial URL to '/'
// };

const onLogoutMock = vi.fn();

const onLoginMock = vi.fn();
const setTokenMock = vi.fn();

describe("Navbar", () => {
  describe("When a user is not logged in and on the Home Page:", () => {
    beforeEach(() => {
      vi.resetAllMocks();
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

    // beforeEach(() => {
    //   render(
    //     <BrowserRouter
    //       isLoggedIn={false}
    //       onLogout={onLogoutMock}
    //       initialEntries={["/"]}
    //     >
    //       <Navbar />
    //     </BrowserRouter>
    //   );
    // });
    // afterEach(() => {
    //   cleanup();
    // });

    // test.skip("Navbar is visible with Home, Login, Signup buttons that redirect to their routes", async () => {
    //   // render(
    //   //   <BrowserRouter>
    //   //     <Navbar />
    //   //   </BrowserRouter>
    //   // );

    //   const loginLink = screen.getByText("Log In");
    //   expect(loginLink.getAttribute("href")).toEqual("/login");

    //   const signupLink = screen.getByText("Sign Up");
    //   expect(signupLink.getAttribute("href")).toEqual("/signup");

    //   const homeLink = screen.getByText("Home");
    //   expect(homeLink.getAttribute("href")).toEqual("/");
    // });

    test("'logo' navigates to home page", async () => {
      const logoEl = screen.getByAltText("Recipeasy Homepage Logo Link");
      await user.click(logoEl);

      expect(window.location.pathname).toBe("/");
      expect(logoEl).toBeVisible();
    });

    test("'Log In' button navigates to login page", async () => {
      const logInBtnEl = screen.getByRole("link", { name: "Log in" });
      await user.click(logInBtnEl);

      // expect(window.location.pathname).toBe("/login");

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
		test.todo("'logo' navigates to Home Page")
		test.todo("'My Recipes' button navigates to My Recipes page")
		test.todo("'Log Out' button is visible and navigates to Home Page", async () => {
			const logOutBtnEl = screen.getByRole("link", {name: "Log Out"});
			await user.click(logOutBtnEl); 

			const headingEl = screen.getByRole("heading", {name: "Recipeasy"});
			expect(headingEl).toBeVisible();
		})
		test.todo("'Sign Up' isn't rendered")
	})

	describe("When a user is on the Sign Up page:", () => {
		test.todo("Navbar elements aren't rendered")
	})
	describe("When a user is on the Log In page:", () => {
		test.todo("Navbar elements aren't rendered")
	})
	describe("When a user is on their My Recipes page:", () => {
		test.todo("'logo' navigates to Home Page")
		test.todo("'Home' button navigates to Home Page")
		test.todo("'My Recipes' button navigates to My Recipes page")
		test.todo("'Log Out' button is visible and navigates to Home Page")
	})
});
