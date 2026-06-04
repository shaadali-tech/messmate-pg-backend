const Mess = require("./models/Mess");
const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();
const messRoutes = require("./routes/messRoutes");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/messes", messRoutes);
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected");
    return sequelize.sync(); // Creates table if not present
  })
  .then(() => {
    console.log("✅ Models synced to database");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB error:", err.message);
  });
