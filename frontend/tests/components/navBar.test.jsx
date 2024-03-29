import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
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

    // Update test once recipe collection page is done so that the user is redirected from their recipes page to the home page
    test.skip("logout button works and user is redirected to homepage", async () => {
      render(
        <BrowserRouter>
          <Navbar isLoggedIn={true} onLogout={() => {}} />
          <LoginPage />
        </BrowserRouter>
      );

      userEvent.click(screen.getByText("Log Out"));

      await waitFor(() => {
        expect(screen.getByText("Home")).toBeInTheDocument();
      });
    });
  });
});
