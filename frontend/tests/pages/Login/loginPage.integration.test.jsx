import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";

import { MemoryRouter, Routes, Route } from "react-router-dom";
import { login } from "../../../src/services/authentication";
import { LoginPage } from "../../../src/pages/Login/LoginPage";
import HomePage from "../../../src/pages/Home/HomePage";
import { SignupPage } from "../../../src/pages/Signup/SignupPage";

const onLoginMock = vi.fn();
const setTokenMock = vi.fn();

// Mocking the login service
vi.mock("../../../src/services/authentication", () => {
  const loginMock = vi.fn();
  return { login: loginMock };
});

const user = userEvent.setup();

// Reusable function for filling out login form
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
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage onLogin={onLoginMock} setToken={setTokenMock} />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </MemoryRouter>
    );
  });
  describe("Login interactions:", () => {
    test("navigates to home page on successful login", async () => {
      login.mockResolvedValue("secrettoken123");

      await completeLoginForm();

      const heading = screen.getByRole("heading", { name: "Recipeasy" });
      expect(heading).toBeVisible();
    });

    test("doens't navigate if email cannot be found", async () => {
      login.mockRejectedValue(new Error("Email not found"));

      await completeLoginForm();

      const errorMsg = screen.getByText("Email not found");
      expect(errorMsg).toBeVisible();

      const heading = screen.queryByRole("heading", { name: "Recipeasy" });
      expect(heading).not.toBeInTheDocument();
    });

    test("doesn't navigate if email is incorrect", async () => {
      login.mockRejectedValue(new Error("Password is incorrect"));

      await completeLoginForm();

      const errorMsg = screen.getByText("Password is incorrect");
      expect(errorMsg).toBeVisible();

      const heading = screen.queryByRole("heading", { name: "Recipeasy" });
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe("Form validation msg should appear and doesn't navigate to HomePage", () => {
    test("when email field is empty on submit", async () => {
      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const emailValidationMsg = screen.getByText("Email address is required.");

      expect(emailValidationMsg).toBeVisible();

      const heading = screen.queryByRole("heading", { name: "Recipeasy" });
      expect(heading).not.toBeInTheDocument();
    });

    test("when password field is empty on submit", async () => {
      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const passwordValidationMsg = screen.getByText("Password is required.");

      expect(passwordValidationMsg).toBeVisible();

      const heading = screen.queryByRole("heading", { name: "Recipeasy" });
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe("When email/password fields are initially empty,then entered:", () => {
    test("email validation message should disappear", async () => {
      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const emailValidationMsg = screen.getByText("Email address is required.");

      expect(emailValidationMsg).toBeVisible();

      await typeEmailInput("test@test.com");
      await user.click(submitButtonEl);

      await expect(emailValidationMsg).not.toBeVisible();
    });
    test("password validation message should disapear", async () => {
      const submitButtonEl = screen.getByRole("button");

      await user.click(submitButtonEl);

      const passwordValidationMsg = screen.getByText("Password is required.");

      expect(passwordValidationMsg).toBeVisible();

      await typePasswordInput("testPassword");
      await user.click(submitButtonEl);

      await expect(passwordValidationMsg).not.toBeVisible();
    });
    test("validation messages should disappear and navigate to Home Page", async () => {
      login.mockResolvedValue("secrettoken123");

      const submitButtonEl = screen.getByRole("button");
      await user.click(submitButtonEl);

      await typeEmailInput("test@test.com");
      await typePasswordInput("testPassword");
      await user.click(submitButtonEl);

      const heading = screen.queryByRole("heading", { name: "Recipeasy" });
      expect(heading).toBeVisible();
    });
  });

  describe("Navigation buttons", () => {
    test("When a user clicks on the logo, it should navigate to home page", async () => {
      const logoLinkEl = screen.getByRole("link", { name: "logo ecipeasy" });
      await user.click(logoLinkEl);

      const heading = screen.getByRole("heading", { name: "Recipeasy" });
      expect(heading).toBeVisible();
    });
    test("When a user clicks on the 'Back to homepage' button, it should navigate to home page", async () => {
      const homepageLinkEl = screen.getByRole("link", {
        name: "← Back to homepage",
      });
      await user.click(homepageLinkEl);

      const heading = screen.getByRole("heading", { name: "Recipeasy" });
      expect(heading).toBeVisible();
    });
    test("When a user clicks on the 'Sign up' button, it should navigate to SignUp page", async () => {
      const signUpBtnEl = screen.getByRole("link", { name: "Sign up" });
      await user.click(signUpBtnEl);

      const logoLinkEl = screen.getByRole("link", { name: "logo ecipeasy" });
      expect(logoLinkEl).toBeVisible();
    });
  });
});

//TODO: Maybe these could be used for SignupPage instead. 
// All these tests aren't applicable anymore
//This is an integration test
//   test("If a user's email doesn't have an '@'", async () => {
//     validateForm.mockReturnValue({
//       email: "Email is invalid. Please include an @",
//     });

//     await typeEmailInput("test");

//     const emailValidationMsg = screen.getByText(
//       "Email is invalid. Please include an @."
//     );

//     expect(emailValidationMsg).toBeVisible();

//     // await waitFor(() => {
//     //   const emailValidationMsg = screen.getByText(
//     //     "Email is invalid. Please include an @."
//     //   );

//     //   expect(emailValidationMsg).toBeVisible();
//     // });
//   });
//   //This is an integration test
//   test("If a user's email doesn't have a domain extentension", async () => {
//     validateForm.mockReturnValue({
//       email: "Email is invalid. Please include a domain name in your email",
//     });

//     await typeEmailInput("test@");

//     const emailValidationMsg = screen.getByText(
//       "Email is invalid. Please include a domain name in your email."
//     );

//     expect(emailValidationMsg).toBeVisible();

//     // await waitFor(() => {
//     //   const emailValidationMsg = screen.getByText(
//     //     "Email is invalid. Please include a domain name in your email."
//     //   );

//     //   expect(emailValidationMsg).toBeVisible();
//     // });
//   });

//   test("If a user's email is invalid, it shouldn't navigate", async () => {
//     validateForm.mockReturnValue({ email: "invalid" });

//     await typeEmailInput("test");
//     const submitButtonEl = screen.getByRole("button");
//     await user.click(submitButtonEl);

//     expect(login).not.toHaveBeenCalled();
//     expect(navigateMock).not.toHaveBeenCalled();
//   });

//   //This is an integration test
//   test("If a user's password doesn't have a capital letter", async () => {
//     validateForm.mockReturnValue({
//       password: "Password must contain a capital letter",
//     });

//     await typePasswordInput("password");

//     await waitFor(() => {
//       const passwordValidationMsg = screen.getByText(
//         "Password must contain a capital letter."
//       );

//       expect(passwordValidationMsg).toBeVisible();
//     });
//   });

//   //This is an integration test
//   test.each([
//     ["a"],
//     ["aa"],
//     ["aaa"],
//     ["aaaa"],
//     ["aaaaa"],
//     ["aaaaaa"],
//     ["aaaaaaa"],
//   ])("If a user's password isn't 8 chars long: '%s'", async (input) => {
//     validateForm.mockReturnValue({
//       password: "Password must be atleast 8 characters long",
//     });

//     await typePasswordInput(input);

//     await waitFor(() => {
//       const passwordValidationMsg = screen.getByText(
//         "Password must be atleast 8 characters long."
//       );

//       expect(passwordValidationMsg).toBeVisible();
//     });
//   });

//   //this is an integration test
//   test("If a user's password doens't contain special characters", async () => {
//     validateForm.mockReturnValue({
//       password: "Password must contain atleast one special character",
//     });

//     await typePasswordInput("password");

//     await waitFor(() => {
//       const passwordValidationMsg = screen.getByText(
//         "Password must contain atleast one special character."
//       );

//       expect(passwordValidationMsg).toBeVisible();
//     });
//   });

//   //this is an integration test
//   test("If a user's password doens't contain a number", async () => {
//     validateForm.mockReturnValue({
//       password: "Password must contain atleast one number",
//     });

//     await typePasswordInput("password");

//     await waitFor(() => {
//       const passwordValidationMsg = screen.getByText(
//         "Password must contain atleast one number."
//       );

//       expect(passwordValidationMsg).toBeVisible();
//     });
//   });

//   test("If a user's password is invalid, it shouldn't navigate", async () => {
//     validateForm.mockReturnValue({ email: "invalid" });

//     await typeEmailInput("test");
//     const submitButtonEl = screen.getByRole("button");
//     await user.click(submitButtonEl);

//     expect(login).not.toHaveBeenCalled();
//     expect(navigateMock).not.toHaveBeenCalled();
//   });
