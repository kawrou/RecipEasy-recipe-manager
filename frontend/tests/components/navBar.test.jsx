import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Navbar from "../../src/components/Navbar";

describe("Navbar", () => {
    test("Navbar is visible with Home, Login, Signup buttons", () => {
        render(<Navbar />);
    
        await userEvent.click(screen.getByText('Home'))
        await screen.findByRole('heading')

        expect(screen.getByRole('heading')).toHaveTextContent('Welcome to Acebook!')
    });
});