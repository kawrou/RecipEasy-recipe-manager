import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../../src/components/Navbar";

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
});