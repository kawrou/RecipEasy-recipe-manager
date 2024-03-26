import { expect } from "vitest";
import { validateLoginForm } from "../../src/validators/validation";


describe("Login form validation", () => {
    test("If email string is empty, return a validation object with appropriate validation message", () => {
        const result = validateLoginForm("", "testPassword")

        expect(result).toEqual({email: "Email address field was empty. Please enter an email address"})
    })

    test("If password string is empty, return a validation object with appropriate validation message", () => {
        const result = validateLoginForm("test@test.com", "")

        expect(result).toEqual({password: "Password field was empty. Please enter your password"})
    })
})
//If email string is empty, return a validation object containing the string "Email address field was empty. Please enter an email address"

//If password string is empty, return a validation object containing the string "Password field was empty. Please enter your password"


//If email string doesn't contain an @, return "Email is invalid. Please include an @"
// {email: ""}

//IF email string doesn't have a domain name after @, return "Email is invalid. Please include a domain name in your email"

//If 