const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const {
  hasName,
  hasSurname,
  hasEmail,
  hasPassword,
} = require("../validators/auth.validator");
const {
  loginValidation,
  registerValidation,
} = require("../middlewares/auth.middleware");

const router = express.Router();

//Register
router.use("/register", hasEmail(), hasPassword(), hasName(), hasSurname());
router.use("/register", registerValidation);
router.post("/register", register);

//Login
router.use("/login", hasEmail(), hasPassword());
router.use("/login", loginValidation);
router.post("/login", login);

module.exports = router;
