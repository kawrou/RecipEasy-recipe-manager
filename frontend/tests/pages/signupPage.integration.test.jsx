import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, vi } from "vitest";
import { MemoryRouter, useNavigate, Route, Routes } from "react-router-dom";
import * as authentication from "../../src/services/authentication";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import HomePage from "../../src/pages/Home/HomePage";

const signupSpy = vi.spyOn(authentication, "signup");

const completeSignupForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Your email");
  const passwordInputEl = screen.getByLabelText("Password");
  const usernameInputEl = screen.getByLabelText("Username");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "Password1!");
  await user.type(usernameInputEl, "Test");
  await user.click(submitButtonEl);
};

describe("SignUp page integration test:", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("navigates to /login on successful signup", async () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await completeSignupForm();

    const heading = screen.getByRole("heading", {
      name: "Log in to your account",
    });
    const emailInput = screen.getByRole("textbox", { name: "Your email" });
    expect(heading).toBeVisible();
    expect(emailInput).toBeVisible();
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    signupSpy.mockRejectedValue({ status: 400 });
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    await completeSignupForm();

    const emailInputEl = screen.getByLabelText("Your email");
    const passwordInputEl = screen.getByLabelText("Password");
    const usernameInputEl = screen.getByLabelText("Username");
    const submitButtonEl = screen.getByRole("submit-button");

    expect(emailInputEl).toBeVisible();
    expect(passwordInputEl).toBeVisible();
    expect(usernameInputEl).toBeVisible();
    expect(submitButtonEl).toBeVisible();
  });

  test("navigates to home page when logo is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    const logo = screen.getByRole("link", { name: "logo ecipeasy" });
    await user.click(logo);

    const heading = screen.getByRole("heading", { name: "Recipeasy" });
    expect(heading).toBeVisible();
  });

  test("navigates to login page when link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    const loginLinkEl = screen.getByRole("link", { name: "Login here" });
    await user.click(loginLinkEl);

    const heading = screen.getByRole("heading", {
      name: "Log in to your account",
    });
    const emailInput = screen.getByRole("textbox", { name: "Your email" });

    expect(heading).toBeVisible();
    expect(emailInput).toBeVisible();
  });
	
  test("navigates to home page when link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    const homepageLinkEl = screen.getByRole("link", {
      name: "← Back to homepage",
    });
    await user.click(homepageLinkEl);

    const heading = screen.getByRole("heading", { name: "Recipeasy" });
    expect(heading).toBeVisible();
  });
});
