import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

import Navbar from "../../src/components/Navbar";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { HomePage } from "../../src/pages/Home/HomePage";
import { LoginPage } from "../../src/pages/Login/LoginPage";

describe("Navbar", () => {
    test("Navbar is visible with Home, Login, Signup buttons that redirect to their routes", async () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
    
        const loginLink = screen.getByText("Log In");
        expect(loginLink.getAttribute("href")).toEqual("/login");

        const signupLink = screen.getByText("Sign Up");
        expect(signupLink.getAttribute("href")).toEqual("/signup");

        const homeLink = screen.getByText("Home");
        expect(homeLink.getAttribute("href")).toEqual("/");
    });

    test('redirect to home page', async () => {
        render(
            <BrowserRouter>
                <Navbar />
                <HomePage />
            </BrowserRouter>
        );

        userEvent.click(screen.getByText("Home"));
        
        // Using await before expect to wait for the expectation to resolve
        await expect(screen.getByText("Recipeasy")).to.exist;

    });

    test('redirect to login page', async () => {
        render(
            <BrowserRouter>
                <Navbar />
                <LoginPage />
            </BrowserRouter>
        );

        userEvent.click(screen.getByText("Log In"));
        
        // Using await before expect to wait for the expectation to resolve
        await expect(screen.getByText("Login")).to.exist;
    });

    test('redirect to signup page', async () => {
        render(
            <BrowserRouter>
                <Navbar />
                <SignupPage />
            </BrowserRouter>
        );

        userEvent.click(screen.getByText("Sign Up"));
        
        // Using await before expect to wait for the expectation to resolve
        await expect(screen.getAllByText("Create an account")).to.exist;
    });

    // Update test once recipe collection page is done so that the user is redirected from their recipes page to the home page
    test('logout button works and user is redirected to homepage', async () => {
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