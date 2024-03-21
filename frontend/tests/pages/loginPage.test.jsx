import { render, screen, waitFor } from "@testing-library/react";
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
//If login isn't valid(email & password), validation error message is handled gracefully (All the permutations)

//Navigation (integration test?):
//If a user clicks on home page link, they should be redirected to the homepage
//If a user clicks on the title, they should be redirected to the homepage
//Can retest if login actually navigates to homepage or not

//Validation logic:
//Ca

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

const navigateMock = useNavigate();

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
      // const navigateMock = useNavigate();

      await completeLoginForm();

      expect(navigateMock).toHaveBeenCalledWith("/");
    });

    test("doens't navigate if email cannot be found", async () => {
      // const navigateMock = useNavigate();

      render(<LoginPage />);

      login.mockRejectedValue(new Error("Email not found"));

      await completeLoginForm();

      expect(navigateMock).not.toHaveBeenCalled();
    });

    test("doesn't navigate if email is incorrect", async () => {
      // const navigateMock = useNavigate();

      render(<LoginPage />);

      login.mockRejectedValue(new Error("Password is incorrect"));

      await completeLoginForm();

      expect(navigateMock).not.toHaveBeenCalled();
    });

    test.each([
      ["Email not found"],
      ["Password is incorrect"],
      ["Login failed. Please try again"],
    ])("error messages is handled correctly: '%s'", async (errorMessage) => {
      render(<LoginPage />);

      login.mockRejectedValue(new Error(errorMessage));

      await completeLoginForm();

      const errMsg = screen.getByText(errorMessage);

      expect(errMsg).toBeVisible();
    });
  });

  describe("Form validation msg should appear", () => {
    beforeEach(() => {
      
      render(<LoginPage />);
    });
    const user = userEvent.setup();

    const typeEmailInput = async (value) => {
      const emailInputEl = screen.getByLabelText("Your email");
      await user.type(emailInputEl, value);
    };

    const typePasswordInput = async (value) => {
      const pwInputEl = screen.getByLabelText("Password");
      await user.type(pwInputEl, value);
    };

    test.todo("If a user's email doesn't have an '@'", async () => {
      await typeEmailInput("test");

      await waitFor(() => {
        const emailValidationMsg = screen.getByText(
          "Email is invalid. Please include an @."
        );

        expect(emailValidationMsg).toBeVisible();
      });
    });

    test.todo(
      "If a user's email doesn't have a domain extentension",
      async () => {
        await typeEmailInput("test@");

        await waitFor(() => {
          const emailValidationMsg = screen.getByText(
            "Email is invalid. Please include a domain name in your email."
          );

          expect(emailValidationMsg).toBeVisible();
        });
      }
    );

    test.todo(
      "If a user's email is invalid, it shouldn't navigate",
      async () => {}
    );

    test.todo(
      "If a user's password doesn't have a capital letter",
      async () => {
        await typePasswordInput("password");

        await waitFor(() => {
          const passwordValidationMsg = screen.getByText(
            "Password must contain a capital letter."
          );

          expect(passwordValidationMsg).toBeVisible();
        });
      }
    );

    test.todo.each([
      ["a"],
      ["aa"],
      ["aaa"],
      ["aaaa"],
      ["aaaaa"],
      ["aaaaaa"],
      ["aaaaaaa"],
    ])("If a user's password isn't 8 chars long: '%s'", async (input) => {
      await typePasswordInput(input);

      await waitFor(() => {
        const passwordValidationMsg = screen.getByText(
          "Password must be atleast 8 characters long."
        );

        expect(passwordValidationMsg).toBeVisible();
      });
    });

    test.todo(
      "If a user's password doens't contain special characters",
      async () => {
        await typePasswordInput("password");

        await waitFor(() => {
          const passwordValidationMsg = screen.getByText(
            "Password must contain atleast one special character."
          );

          expect(passwordValidationMsg).toBeVisible();
        });
      }
    );

    test.todo("If a user's password doens't contain a number", async () => {
      await typePasswordInput("password");

      await waitFor(() => {
        const passwordValidationMsg = screen.getByText(
          "Password must contain atleast one number."
        );

        expect(passwordValidationMsg).toBeVisible();
      });
    });

    test.todo("If a user's password is invalid, it shouldn't navigate");
  });
});
