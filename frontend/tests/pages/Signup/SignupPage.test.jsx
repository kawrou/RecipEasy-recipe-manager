import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../src/services/authentication";
import { SignupPage } from "../../../src/pages/Signup/SignupPage";

// Note: 
// As 'react-router-dom' is mocked either for unit testing or TDDing purposes
// it makes it difficult to test the functionality of the NavLink component as it won't render
// A better approach might be an intergration style of test that won't require mocking 'react-router-dom'

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  // Wrap our navigateMock inside a wrapper. Actually it is a little unecessary.
  const useNavigateMock = () => navigateMock; 
  const navLinkMock = vi.fn();
  const LinkMock = vi.fn();
  return {
    useNavigate: useNavigateMock,
    NavLink: navLinkMock,
    Link: LinkMock,
  };
});

// Mocking the signup service
vi.mock("../../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
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

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith("test@email.com", "Password1!", "Test");
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    //Need to do this to access the mocked useNavigate from above
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  test("error message shown when invalid password and email is input", async () => {
    render(<SignupPage />);
    // incorrect signup
    const user = userEvent.setup();

    const emailInputEl = screen.getByLabelText("Your email");
    const passwordInputEl = screen.getByLabelText("Password");
    const usernameInputEl = screen.getByLabelText("Username");
    const submitButtonEl = screen.getByRole("submit-button");

    await user.type(emailInputEl, "incorrectemail");
    await user.type(passwordInputEl, "incorrectpassword");
    await user.type(usernameInputEl, "incorrect");
    await user.click(submitButtonEl);

    await expect(screen.getByText("Enter a valid email address.")).toBeVisible();
    await expect(
      screen.getByText(
        "Password must be between 8 and 15 characters long with atleast 1 uppercase, 1 number, and 1 special character."
      )
    ).toBeVisible();
  });
});
