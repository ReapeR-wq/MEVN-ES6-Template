import {body} from "express-validator";

const usernameLength = {
    min: 6,
    max: 30
}

const passwordLength = {
    min: 8,
    max: 40
}

export let registerModelValidation = [
    body("username")
        .toLowerCase()
        .exists()
        .withMessage("Username is required.")
        .bail()
        .isLength(usernameLength)
        .withMessage(`Username must have between ${usernameLength.min} and ${usernameLength.max} symbols.`),
    body("email")
        .toLowerCase()
        .exists()
        .withMessage("E-Mail is required.")
        .bail()
        .isEmail()
        .withMessage("Invalid E-Mail."),
    body("password")
        .exists()
        .withMessage("Password is required.")
        .bail()
        .isLength(passwordLength)
        .withMessage(`Password must be from ${passwordLength.min} to ${passwordLength.max} symbols long.`)
        .bail()
        .matches(/[a-z]+/)
        .withMessage("Password must contain small letter")
        .matches(/[A-Z]+/)
        .withMessage("Password must contain capital letter")
        .matches(/[0-9]+/)
        .withMessage("Password must contain digit")
        .matches(/[^a-zA-Z\d\s:]+/)
        .withMessage("Password must contain non-alphanumeric symbol."),
    body("confirmPassword")
        .exists()
        .withMessage("Confirm password is required.")
        .bail()
        .custom((val, {req}) => {
            if (val !== req.body.password) {
                throw new Error("Passwords do NOT match.");
            } else {
                return val;
            }
        })
]

export let loginModelValidation = [
    body("username")
        .exists()
        .withMessage("Username is required."),
    body("password")
        .exists()
        .withMessage("Password is required.")
]

export default {
    registerModelValidation,
    loginModelValidation
}
