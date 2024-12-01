const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const { addUser, verifyDetails } = require("../models/user.model");

const register = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  try {
    await addUser(name, surname, email, password, role);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(error.code).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await verifyDetails(email, password);

    const token = jwt.sign(
      { userID: user.userid, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(error.code).json(error);
  }
};

module.exports = { register, login };
