const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  isEmail,
  isPassword,
  hasName,
  hasSurname,
} = require("../validators/auth.validator");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/auth.middleware");

const router = express.Router();

//Register
router.use("/register", isEmail(), isPassword(), hasName(), hasSurname());
router.use("/register", registerValidation);
router.post("/register", register);

//Login
router.use("/login", isEmail(), isPassword());
router.use("/login", loginValidation);
router.post("/login", login);

module.exports = router;
