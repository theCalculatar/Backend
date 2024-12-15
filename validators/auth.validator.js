const { body } = require("express-validator");

const hasEmail = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should be included")
    .isEmail()
    .withMessage("invalid email!");

const hasPassword = () =>
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password length shoud be 5 or more length");

const hasName = () =>
  body("name").trim().notEmpty().withMessage("Name should be included");

const hasSurname = () =>
  body("surname").trim().notEmpty().withMessage("Surname should be included");
module.exports = { hasEmail, hasPassword, hasName, hasSurname };
