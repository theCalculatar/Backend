const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const { addUser } = require("../models/user");

const register = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  try {
    await addUser(name, surname, email, password, role);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { userID, password: hashedPassword, role } = user.rows[0];

    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userID, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
