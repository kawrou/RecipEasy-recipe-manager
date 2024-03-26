import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { login } from "../../../src/services/authentication";
import { validateLoginForm } from "../../../src/validators/validation";
import { LoginPage } from "../../../src/pages/Login/LoginPage";

//Validation logic:
//Can be delegated to separate module

// Mocking React Router's useNavigate function and NavLink component
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Mock useNavigate to return a function
  return {
    useNavigate: useNavigateMock,
    NavLink: () => null, // Mock NavLink component
  };
});

const onLoginMock = vi.fn();
const setTokenMock = vi.fn();

// Mocking the login service
vi.mock("../../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

vi.mock("../../../src/validators/validation", () => {
  const validateLoginFormMock = vi.fn();
  return { validateLoginForm: validateLoginFormMock };
});

// Reusable function for filling out login form
const user = userEvent.setup();
const navigateMock = useNavigate();

const completeLoginForm = async () => {
  const emailInputEl = screen.getByLabelText("Your email");
  const passwordInputEl = screen.getByLabelText("Password");
  const submitButtonEl = screen.getByRole("button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl, "button");
};

const typeEmailInput = async (value) => {
  const emailInputEl = screen.getByLabelText("Your email");
  await user.type(emailInputEl, value);
};

const typePasswordInput = async (value) => {
  const pwInputEl = screen.getByLabelText("Password");
  await user.type(pwInputEl, value);
};

describe("Login Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  describe("When a user clicks login button", () => {
    beforeEach(() => {
      render(<LoginPage onLogin={onLoginMock} setToken={setTokenMock} />);
    });

    test("a login request is made", async () => {
      validateLoginForm.mockReturnValue(null);

      await completeLoginForm();

      expect(login).toHaveBeenCalledWith("test@email.com", "1234");
    });

    it("navigates to home page on successful login", async () => {
      validateLoginForm.mockReturnValue(null);
      login.mockResolvedValue("secrettoken123");

      await completeLoginForm();

      expect(navigateMock).toHaveBeenCalledWith("/");
    });

    it("doens't navigate if error logging in", async () => {
      validateLoginForm.mockReturnValue(null);

      login.mockRejectedValue(new Error("Login failed. Please try again"));

      await completeLoginForm();

      expect(navigateMock).not.toHaveBeenCalled();
    });

    test("error messages is handled correctly", async () => {
      validateLoginForm.mockReturnValue(null);
      login.mockRejectedValue(new Error("Login failed. Please try again"));

      await completeLoginForm();

      const errMsg = screen.getByText("Login failed. Please try again");

      expect(errMsg).toBeVisible();
    });
  });

  describe("When email and/or password fields are empty:", () => {
    beforeEach(() => {
      render(<LoginPage />);
    });

    it("should display email validation error message", async () => {
      validateLoginForm.mockReturnValue({
        email: "Email address field was empty. Please enter an email address",
      });

      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const emailValidationMsg = screen.getByText(
        "Email address field was empty. Please enter an email address."
      );

      expect(emailValidationMsg).toBeVisible();
    });

    it("should display password validation error message", async () => {
      validateLoginForm.mockReturnValue({
        password: "Password field was empty. Please enter your password",
      });

      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const passwordValidationMsg = screen.getByText(
        "Password field was empty. Please enter your password."
      );

      expect(passwordValidationMsg).toBeVisible();
    });

    it("shouldn't navigate upon invalid email", async () => {
      validateLoginForm.mockReturnValue({
        email: "Email address field was empty. Please enter an email address",
      });

      const submitButtonEl = screen.getByRole("button");
      await user.click(submitButtonEl);

      expect(login).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });

    it("shouldn't navigate upon invalid password", async () => {
      validateLoginForm.mockReturnValue({
        password: "Password field was empty. Please enter your password",
      });

      const submitButtonEl = screen.getByRole("button");
      await user.click(submitButtonEl);

      expect(login).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });

    //TODO: Delete after confirming that these features aren't necessary.
    //Maybe shouldn't have this feature.
    //Instead just check that it isn't an empty field
    // test("should display email validation error message", async () => {
    //   validateForm.mockReturnValue({
    //     email: "Email is invalid. Please include an @",
    //   });

    //   await typeEmailInput("test");

    //   const emailValidationMsg = screen.getByText(
    //     "Email is invalid. Please include an @."
    //   );

    //   expect(emailValidationMsg).toBeVisible();

    // await waitFor(() => {
    //   const emailValidationMsg = screen.getByText(
    //     "Email is invalid. Please include an @."
    //   );

    //   expect(emailValidationMsg).toBeVisible();
    // });
    // });

    //Maybe shouldn't have this feature.
    //Instead just check that it isn't an empty field
    // test("should display password validation error message", async () => {
    //   validateForm.mockReturnValue({
    //     password: "Password must contain a capital letter",
    //   });

    //   await typePasswordInput("password");

    //   await waitFor(() => {
    //     const passwordValidationMsg = screen.getByText(
    //       "Password must contain a capital letter."
    //     );

    //     expect(passwordValidationMsg).toBeVisible();
    //   });
    // });

    // test("shouldn't navigate upon invalid email", async () => {
    //   validateForm.mockReturnValue({ email: "invalid" });

    //   await typeEmailInput("test");
    //   const submitButtonEl = screen.getByRole("button");
    //   await user.click(submitButtonEl);

    //   expect(login).not.toHaveBeenCalled();
    //   expect(navigateMock).not.toHaveBeenCalled();
    // });

    // test("shouldn't navigate upon invalid password", async () => {
    //   validateForm.mockReturnValue({ email: "invalid" });

    //   await typeEmailInput("test");
    //   const submitButtonEl = screen.getByRole("button");
    //   await user.click(submitButtonEl);

    //   expect(login).not.toHaveBeenCalled();
    //   expect(navigateMock).not.toHaveBeenCalled();
    // });
  });
});
