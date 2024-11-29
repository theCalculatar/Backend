const pool = require("../config/database");
const bcrypt = require("bcrypt");
const { default: CustomError } = require("../errors");

//Get users
const getUser = async (email) => {
  try {
    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    return user.rows[0] || null;
  } catch (error) {
    throw new CustomError("Server error", 500);
  }
};

const addUser = async (name, surname, email, password, role) => {
  const user = await getUser(email); // throws if any db errors

  if (user != null) {
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const registeredUser = await pool.query(
      'INSERT INTO "user" (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, surname, email, hashedPassword, role || "respondent"]
    );
    return registeredUser.rows[0];
  } catch (error) {
    console.log("error");
    throw new CustomError("Server error", 500);
  }
};

const verifyDetails = async (email, password) => {
  const user = await getUser(email); // throws if any db errors

  if (user == null) {
    throw new CustomError("Invalid user details", 401);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (bcrypt.compare(hashedPassword, user.password)) {
    return user;
  } else {
    throw new CustomError("Invalid user details", 401);
  }
};

module.exports = { addUser, verifyDetails };
