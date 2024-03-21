import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../src/services/authentication";
import { LoginPage } from "../../src/pages/Login/LoginPage";

//The login page should have a form.
//The form contains a title, two input fields, and a button for handling the form
//It also has a link to go to the sign up page
//And 2 links to go back to home page

//Login action:
//If login is successful, user gets sent to another page
//If login is unsuccesful, user doesn't get sent to another page
//If login is unsuccesful, an error message lets the user know something is wrong
//If login isn't valid(email & password), user doesn't get sent to another page
//If login isn't valid(email & password), validation error message is handled gracefully

//Navigation (integration test?):
//If a user clicks on home page link, they should be redirected to the homepage
//If a user clicks on the title, they should be redirected to the homepage
//Can retest if login actually navigates to homepage or not

//Input data into fields -> click button -> result
//Result: Either succeed or fail

// Mocking React Router's useNavigate function and NavLink component
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Mock useNavigate to return a function
  return {
    useNavigate: useNavigateMock,
    NavLink: () => null, // Mock NavLink component -> Does this actually work?
  };
});

const onLoginMock = vi.fn();
const setTokenMock = vi.fn();

// Mocking the login service
vi.mock("../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

// Reusable function for filling out login form
const completeLoginForm = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Your email");
  const passwordInputEl = screen.getByLabelText("Password");
  const submitButtonEl = screen.getByRole("button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.type(submitButtonEl, "button");
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe("Login interactions:", () => {
    test("allows a user to login", async () => {
      render(<LoginPage />);

      await completeLoginForm();

      expect(login).toHaveBeenCalledWith("test@email.com", "1234");
    });

    test("navigates to home page on successful login", async () => {
      render(<LoginPage onLogin={onLoginMock} setToken={setTokenMock} />);

      login.mockResolvedValue("secrettoken123");
      const navigateMock = useNavigate();

      await completeLoginForm();

      expect(navigateMock).toHaveBeenCalledWith("/");
    });

    test("doens't navigate on unsuccesful login", async () => {
      render(<LoginPage />);

      login.mockRejectedValue(new Error("Error logging in"));
      const navigateMock = useNavigate();

      await completeLoginForm();

      expect(navigateMock).not.toHaveBeenCalled();
    });

    test.todo("error message handled gracefully on unsuccessful login")
  });
  describe("Form validation", () => {
    test.todo("If a user's email is invalid, an error message should appear")
    test.todo("If a user's email is invalid, it shouldn't navigate")
    test.todo("If a user's password is invalid, an error message should appear")
    test.todo("If a user's password is invalid, it shouldn't navigate")
  })
});
