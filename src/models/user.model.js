// const pool = require("../config/database");
const bcrypt = require("bcrypt");
const { default: CustomError } = require("../errors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//Get users
const getUser = async (email) => {
  try {
    // const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
    //   email,
    // ]);
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    // return user.rows[0] || null;
    return user;
  } catch (error) {
    throw new CustomError("Server error", 500);
  }
};

//Add new user
const addUser = async (name, surname, email, password, role) => {
  const user = await getUser(email); // throws if any db errors

  if (user != null) {
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // const registeredUser = await pool.query(
    //   'INSERT INTO "user" (name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [name, surname, email, hashedPassword, role || "respondent"]
    // );
    const registeredUser = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword,
        role: role || "responded",
      },
    });
    // return registeredUser.rows[0];
    return registeredUser;
  } catch (error) {
    console.log("error");
    throw new CustomError("Server error", 500);
  }
};

//login user
const verifyDetails = async (email, password) => {
  const user = await getUser(email); // throws if any db errors

  if (user == null) {
    throw new CustomError("Invalid user details", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    return user;
  } else {
    throw new CustomError("Invalid user details", 401);
  }
};

module.exports = { addUser, verifyDetails };
