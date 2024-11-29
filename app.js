const express = require("express");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
