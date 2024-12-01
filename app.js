const express = require("express");
const routes = require("./routes/routes");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", routes);

module.exports = app

