const { validationResult } = require("express-validator");

const loginValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.errors);
  }
  next();
};
const registerValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.errors);
  }
  next();
};
module.exports = { loginValidation, registerValidation };
