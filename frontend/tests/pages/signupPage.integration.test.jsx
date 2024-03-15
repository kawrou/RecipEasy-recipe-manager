import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import { MemoryRouter, useNavigate, Route, Routes } from "react-router-dom";
import * as authentication from "../../src/services/authentication";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { LoginPage } from "../../src/pages/Login/LoginPage";

vi.spyOn(authentication, "signup").mockResolvedValue({ status: 201 });

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
  test("navigates to /login on successful signup", async () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </MemoryRouter>
    );

    await completeSignupForm();
    screen.debug();
    expect(screen.getByRole('heading', {name: 'Log in to your account'})).toBeVisible();
    
  });
  test.todo("navigates to /signup on unsuccessful signup", async () => {});
  test.todo("navigates to home page when logo is clicked", async () => {});
  test.todo("navigates to login page when link is clicked", async () => {});
  test.todo("navigates to home page when link is clicked", async () => {});
});
